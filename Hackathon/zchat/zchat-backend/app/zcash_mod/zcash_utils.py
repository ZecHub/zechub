import requests
from fastapi import Depends, FastAPI, HTTPException, status, Query
from ..zcash_mod import ZCASH_RPC_URL, ZCASH_RPC_USER,ZCASH_RPC_PASSWORD
    
def validate_zcash_address(address: str):
    try:
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "validateaddress",
            "method": "z_validateaddress",
            "params": [address]
        }
        
        # Make the request to the Zcash node
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        # Parse response
        validation_data = response.json()
        if not validation_data['result']['isvalid']:
            raise HTTPException(status_code=500, detail="Invalid wallet address")
        return validation_data['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))