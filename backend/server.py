from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    username: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/notify")
async def send_notification(user: User):
    # Logic to send a notification based on BLE data
    return {"message": f"Notification sent to {user.username}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
