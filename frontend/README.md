---
runme:
  id: 01HJ4HHSED9H2R3NNGG6PKNBN3
  version: v2.0
---

# BLE Meraki Coupon Pusher

## Description

The BLE Meraki Coupon Pusher is a solution designed to integrate with Cisco Meraki's BLE (Bluetooth Low Energy) capabilities. It provides a seamless way to push coupons or notifications to devices detected by Meraki APs.



## Contacts
* Rey Diaz

## Solution Components
* Python
* FastAPI
* React
* Meraki Dashboard API

## Related Sandbox Environment
This project can be tested and demonstrated using a Cisco Meraki environment with BLE capabilities. Ensure that the Meraki APs are configured for BLE scanning and have access to the Meraki Dashboard API.

## Installation/Configuration

To set up the project, follow these steps:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```


For the frontend setup, refer to the [frontend README](frontend/README.md).

## Usage

Start the backend server:

```bash
python backend/server.py
```

Run the frontend application:

```bash
cd frontend
npm install
npm run dev
```

## Backend Overview

The backend is built using FastAPI and interacts with the Meraki Dashboard API to fetch BLE data. It processes and stores the data for frontend consumption.


## Frontend Overview

The frontend is a React application that displays the BLE data in a user-friendly interface. It includes features like device tables and notifications.

## Screenshots

N/a

### LICENSE

Provided under Cisco Sample Code License, for details see [LICENSE](LICENSE.md)

### CODE_OF_CONDUCT

Our code of conduct is available [here](CODE_OF_CONDUCT.md)

### CONTRIBUTING

See our contributing guidelines [here](CONTRIBUTING.md)

#### DISCLAIMER:
Please note: This script is meant for demo purposes only. All tools/scripts in this repo are released for use "AS IS" without any warranties of any kind, including, but not limited to their installation, use, or performance. Any use of these scripts and tools is at your own risk. There is no guarantee that they have been through thorough testing in a comparable environment and we are not responsible for any damage or data loss incurred with their use.
You are responsible for reviewing and testing any scripts you run thoroughly before use in any non-testing environment.


