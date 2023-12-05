from fastapi import FastAPI, Request, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pyngrok import ngrok
import os
import logging

# Load environment variables
load_dotenv()

# Create FastAPI app instance
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # You can specify specific HTTP methods here, e.g., ["GET", "POST"]
    allow_headers=["*"],  # You can specify specific HTTP headers here
)

# Environment variables
MERAKI_VALIDATOR = os.getenv("MERAKI_VALIDATOR")
MERAKI_SECRET = os.getenv("MERAKI_SECRET")

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/meraki")
async def get_meraki():
    """
    Meraki GET request to validate the URL.
    """
    return MERAKI_VALIDATOR

@app.route("/meraki/scanning", methods=["GET", "POST"])
async def meraki_scanning(request: Request):
    if request.method == "GET":
        # Handle GET request (validate URL)
        logging.info('sent validator')
        return MERAKI_VALIDATOR  # Assuming MERAKI_VALIDATOR is a URL string

    elif request.method == "POST":
        # Handle POST request (process BLE payloads)
        data = await request.json()

        # Secret validation
        if data.get("secret") != MERAKI_SECRET:
            logging.info('sent secret')
            raise HTTPException(status_code=401, detail="Invalid secret")

        # Verify the API version and radio type
        if data.get("version") != "3.0" or data.get("type") != "Bluetooth":
            logging.info('sent')
            return Response(status_code=400, content="Unsupported API version or radio type")

        # Log observations
        observations = data.get("data", {}).get("observations", [])
        logging.info(f"Received observations: {observations}")

        # Process the data
        processed_data = process_meraki_data(data)
        return {"message": "Data processed successfully", "data": processed_data}


def process_meraki_data(data):
    """
    Process the BLE payload data.
    """
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
