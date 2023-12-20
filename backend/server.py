from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import PlainTextResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
import json
import asyncio
from collections import deque

# Load environment variables
load_dotenv()

# Create FastAPI app instance
app = FastAPI()

origins = ["http://localhost:8000",
           "http://127.0.0.1:8000",
           "http://localhost:5173",
           "http://127.0.0.1:5173",
           "http://localhost:5173",
           "http://127.0.0.1:8000",
           "*"
           ]  # Replace with your React app's URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Environment variables
MERAKI_VALIDATOR = os.getenv("MERAKI_VALIDATOR")
MERAKI_SECRET = os.getenv("MERAKI_SECRET")

# Configure logging
logging.basicConfig(level=logging.INFO)

# Data storage with a cap of 10 items
data_storage = deque(maxlen=10)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/meraki/scanning")
async def get_meraki_scanning():
    logging.info('sent validator: ' + MERAKI_VALIDATOR)
    return PlainTextResponse(MERAKI_VALIDATOR)

@app.post("/meraki/scanning")
async def post_meraki_scanning(request: Request):
    data = await request.json()

    if data.get("secret") != MERAKI_SECRET:
        raise HTTPException(status_code=401, detail="Invalid secret")

    if data.get("version") != "3.0" or data.get("type") != "Bluetooth":
        raise HTTPException(status_code=400, detail="Unsupported API version or radio type")

    observations = data.get("data", {}).get("observations", [])
    logging.info("Received observations: " + json.dumps(observations, indent=4))

    processed_data = process_meraki_data(data)

    global data_storage
    data_storage.append(processed_data)  # Add new data to the storage

    return {"message": "Data processed successfully", "data": processed_data}

def process_meraki_data(data):
    observations = data.get("data", {}).get("observations", [])
    ble_devices = []

    for observation in observations:
        if 'bleBeacons' in observation:
            for beacon in observation['bleBeacons']:
                device_info = {
                    "client_mac": observation.get("clientMac"),
                    "uuid": beacon.get("uuid"),
                    "major": beacon.get("major"),
                    "minor": beacon.get("minor"),
                    "rssi": beacon.get("rssi")
                }
                ble_devices.append(device_info)

    return ble_devices

async def event_generator():
    while True:
        if data_storage:
            data = data_storage[-1]  # Send the latest item
            yield f"data: {json.dumps(data)}\n\n"
        await asyncio.sleep(1)

@app.get("/events")
async def get_events():
    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
