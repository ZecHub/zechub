import requests
from fastapi import Depends, FastAPI, HTTPException, status, Query
from ..zcash_mod import ZCASH_RPC_URL, ZCASH_RPC_USER,ZCASH_RPC_PASSWORD

def backupwallet(destination: str):
    try:
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "backupwallet",
            "method": "backupwallet",
            "params": [destination]
        }
        
        # Make the request to the Zcash node
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        # Parse response
        validation_data = response.json()
        print(validation_data)
        return validation_data['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def z_get_new_account():
    try:
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "z_getnewaccount",
            "method": "z_getnewaccount",
            "params": []
        }
        
        # Make the request to the Zcash node
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        # Parse response
        validation_data = response.json()
        return validation_data['result']['account']
    
    except Exception as e:
        print('Here')
        raise HTTPException(status_code=500, detail=str(e))


def z_listunifiedreceivers(address: str, acc_type: str):
    try:
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "z_listunifiedreceivers",
            "method": "z_listunifiedreceivers",
            "params": [address]
        }
        
        # Make the request to the Zcash node
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        # Parse response
        validation_data = response.json()
        return validation_data['result'][acc_type]
    
    except Exception as e:
        print('Here')
        raise HTTPException(status_code=500, detail=str(e))


def get_transparent_address_balance(address: str):
    try:
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "getaddressbalance",
            "method": "getaddressbalance",
            "params": [{ "addresses": [address,] }]
        }
        
        # Make the request to the Zcash node
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        # Parse response
        validation_data = response.json()
        return validation_data['result']['balance']
    
    except Exception as e:
        print('Here')
        raise HTTPException(status_code=500, detail=str(e))

def z_getaddressforaccount(account: int, receiver_type=None, diversifier_index: int=None):
    params = [account]
    if receiver_type is not None:
        params.append(receiver_type)
    if diversifier_index is not None:
        params.append(diversifier_index)
    try:
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "z_getaddressforaccount",
            "method": "z_getaddressforaccount",
            "params": params
        }
        
        # Make the request to the Zcash node
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        # Parse response
        validation_data = response.json()
        return validation_data['result']['address']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def send_to_address(address: str, amount: float|int, comment: str=None, comment_to: str=None, subtractfeefromamount: bool=False):
    try:
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "sendtoaddress",
            "method": "sendtoaddress",
            "params": [address, amount, comment, comment_to, subtractfeefromamount]
        }
        
        # Make the request to the Zcash node
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        # Parse response
        validation_data = response.json()
        if not validation_data['result']['isvalid']:
            raise HTTPException(status_code=500, detail="Invalid wallet address")
        return validation_data['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))