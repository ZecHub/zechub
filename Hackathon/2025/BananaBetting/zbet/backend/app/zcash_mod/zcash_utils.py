import requests
from fastapi import Depends, FastAPI, HTTPException, status, Query
from ..zcash_mod import ZCASH_RPC_URL, ZCASH_RPC_USER, ZCASH_RPC_PASSWORD, DISABLE_ZCASH_NODE
    
def validate_zcash_address(address: str):
    """
    Validate a Zcash address format.
    In development mode (DISABLE_ZCASH_NODE=True), uses basic format validation.
    In production mode, uses actual Zcash node validation.
    """
    
    # Development mode - basic format validation
    if DISABLE_ZCASH_NODE:
        # Basic Zcash address format validation
        if not address or len(address) < 10:
            raise HTTPException(status_code=400, detail="Address is too short")
        
        # Check for common Zcash address prefixes
        valid_prefixes = ['z', 't', 'u']  # shielded, transparent, unified
        if not any(address.startswith(prefix) for prefix in valid_prefixes):
            raise HTTPException(status_code=400, detail="Invalid address format. Must start with 'z', 't', or 'u'")
        
        # Basic length checks for different address types
        if address.startswith('z') and len(address) not in [95, 78]:  # Sapling addresses
            raise HTTPException(status_code=400, detail="Invalid shielded address length")
        elif address.startswith('t') and len(address) not in [34, 35]:  # Transparent addresses  
            raise HTTPException(status_code=400, detail="Invalid transparent address length")
        elif address.startswith('u') and len(address) < 50:  # Unified addresses (variable length)
            raise HTTPException(status_code=400, detail="Invalid unified address length")
        
        # Return mock validation result for development
        return {
            "isvalid": True,
            "address": address,
            "type": "mock_validation"
        }
    
    # Production mode - actual Zcash node validation
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
            raise HTTPException(status_code=400, detail="Invalid wallet address")
        return validation_data['result']
    
    except HTTPException:
        # Re-raise HTTP exceptions (including our custom validation errors)
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Address validation failed: {str(e)}")