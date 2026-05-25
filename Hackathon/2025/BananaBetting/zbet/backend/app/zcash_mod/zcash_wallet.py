import requests
from fastapi import Depends, FastAPI, HTTPException, status, Query
from ..zcash_mod import ZCASH_RPC_URL, ZCASH_RPC_USER, ZCASH_RPC_PASSWORD, DISABLE_ZCASH_NODE
from decimal import Decimal
import simplejson

# Mock balances for development (user_id -> balance)
_mock_user_balances = {}
_mock_pool_balance = 1000.0

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
        
        # Check for RPC errors in the response
        if validation_data.get('error'):
            error_msg = validation_data['error'].get('message', 'Unknown RPC error')
            print(f"Zcash RPC Error: {error_msg}")
            raise HTTPException(status_code=500, detail=f"Zcash RPC Error: {error_msg}")
        
        return validation_data['result']['account']
    
    except HTTPException:
        raise
    except Exception as e:
        print(f'Unexpected error: {e}')
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
    """Get transparent address balance. Uses mock data in dev mode."""
    if DISABLE_ZCASH_NODE:
        # For development, return mock balance based on address
        # Extract user_id from address if it's a user address, else return pool balance
        return _mock_user_balances.get(address, 10.0)  # Default 10 ZEC for users
    
    try:
        # First try to validate the address
        try:
            from . import zcash_utils
            zcash_utils.validate_zcash_address(address)
        except Exception as validation_error:
            print(f"Address validation failed: {validation_error}")
            raise HTTPException(status_code=400, detail=f"Invalid address format: {address}")
        
        # For transparent addresses, try multiple RPC methods
        if address.startswith('t'):
            # Method 1: Try getaddressbalance (for insight addresses)
            try:
                payload = {
                    "jsonrpc": "1.0",
                    "id": "getaddressbalance",
                    "method": "getaddressbalance",
                    "params": [{ "addresses": [address] }]
                }
                
                response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
                
                if response.status_code == 200:
                    result = response.json()
                    if result.get('result') and 'balance' in result['result']:
                        balance_zatoshis = result['result']['balance']
                        return balance_zatoshis / 100000000.0
                    elif result.get('error'):
                        print(f"getaddressbalance error: {result['error']}")
            except Exception as e:
                print(f"getaddressbalance failed: {e}")
            
            # Method 2: Try listreceivedbyaddress (for wallet addresses)
            try:
                payload = {
                    "jsonrpc": "1.0",
                    "id": "listreceivedbyaddress",
                    "method": "listreceivedbyaddress",
                    "params": [0, True, True, address]
                }
                
                response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
                
                if response.status_code == 200:
                    result = response.json()
                    if result.get('result'):
                        # Sum up all received amounts for this address
                        total = sum(float(entry.get('amount', 0)) for entry in result['result'] 
                                  if entry.get('address') == address)
                        return total
            except Exception as e:
                print(f"listreceivedbyaddress failed: {e}")
            
            # Method 3: Return 0 if address not found (this is normal for new addresses)
            print(f"Address {address} not found in wallet, returning 0 balance")
            return 0.0
            
        else:
            # For shielded addresses, return 0 for now
            # (Proper shielded balance checking would require the address to be in the wallet)
            return 0.0
    
    except HTTPException:
        raise
    except Exception as e:
        print(f'Unexpected error in get_transparent_address_balance: {e}')
        raise HTTPException(status_code=500, detail=f"Failed to get balance: {str(e)}")

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
        return validation_data['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# UNTESTED
def z_sendmany(from_address: str, recipients: list, minconf: int = 1, fee: float = None, privacy_policy: str = None):
    """
    Send ZEC to multiple addresses in a single transaction using z_sendmany RPC
    Based on official Zcash RPC documentation: https://zcash.github.io/rpc/z_sendmany.html
    
    Args:
        from_address: The address to send from (string, not account number)
        recipients: List of {"address": "zaddr", "amount": 0.01} dictionaries
        minconf: Minimum confirmations for inputs (default: 1)
        fee: Transaction fee (optional)
        privacy_policy: Privacy policy for the transaction (optional)
    
    Returns:
        Operation ID for tracking the async transaction
    """
    try:
        # Validate recipients format and check for duplicates
        amounts_array = []
        seen_addresses = set()
        
        for recipient in recipients:
            if not isinstance(recipient, dict) or "address" not in recipient or "amount" not in recipient:
                raise HTTPException(
                    status_code=400, 
                    detail="Recipients must be list of {'address': 'addr', 'amount': 0.01} objects"
                )
            
            address = recipient["address"]
            amount = recipient["amount"]
            
            # Check for duplicate addresses (Zcash limitation)
            if address in seen_addresses:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Duplicate address in recipients: {address}. Zcash doesn't allow multiple outputs to same address."
                )
            seen_addresses.add(address)

            # Convert to float with proper precision
            amount_float = round(float(amount), 8)
            amounts_array.append({"address": address, "amount": amount_float})
        
        # Build parameters according to official z_sendmany format
        # Order: fromaddress, amounts, minconf, fee, privacyPolicy
        params = [from_address, amounts_array]
        if minconf is not None:
            params.append(minconf)
        else:
            params.append(10)  # default minconf
            
        # Always include fee parameter (null for default)
        if fee is not None:
            params.append(fee)
        else:
            params.append(None)  # use default fee calculation
            
        # Add privacy policy if specified
        if privacy_policy is not None:
            params.append(privacy_policy)
        
        # RPC request payload
        payload = {
            "jsonrpc": "1.0",
            "id": "z_sendmany",
            "method": "z_sendmany",
            "params": params
        }
        
        # Debug logging
        print(f"z_sendmany payload: {payload}")
        
        # Make the request to the Zcash node using json= parameter (like zchat)
        # This lets the requests library handle JSON serialization internally
        #response = requests.post(
        #    ZCASH_RPC_URL, 
        #    json=payload,
        #    auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD)
        #)

        # Use simplejson with use_decimal=True to avoid scientific notation
        response = requests.post(
            ZCASH_RPC_URL, 
            data=simplejson.dumps(payload, use_decimal=True),
            headers={'Content-Type': 'application/json'},
            auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        # Handle Zcash node response
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Slippery bananas! Failed to connect to Zcash node")

        # Parse response
        result = response.json()
        print(f"z_sendmany response: {result}")
        
        if 'error' in result and result['error']:
            error_code = result['error'].get('code', 'unknown')
            error_message = result['error'].get('message', 'Unknown error')
            print(f"z_sendmany RPC error - Code: {error_code}, Message: {error_message}")
            raise HTTPException(status_code=400, detail=f"Spicy bananas! Transaction failed: {error_message}")
            
        if 'result' not in result:
            print(f"z_sendmany unexpected response format: {result}")
            raise HTTPException(status_code=500, detail="Mismatched bananas! Unexpected response from Zcash node")
            
        operation_id = result['result']
        print(f"z_sendmany success - Operation ID: {operation_id}")
        return operation_id
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def z_getoperationstatus(operation_ids: list = None):
    """
    Get status of z_sendmany operations
    
    Args:
        operation_ids: List of operation IDs to check, or None for all
    
    Returns:
        List of operation status objects
    """
    try:
        params = []
        if operation_ids:
            params.append(operation_ids)
        
        payload = {
            "jsonrpc": "1.0",
            "id": "z_getoperationstatus",
            "method": "z_getoperationstatus",
            "params": params
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        result = response.json()
        return result['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_operation_fee(operation_id: str) -> float:
    """
    Get the network fee for a completed operation
    
    Args:
        operation_id: The operation ID to check
    
    Returns:
        Network fee amount, or 0.0 if not available
    """
    try:
        operations = z_getoperationstatus([operation_id])
        if not operations:
            return 0.0
        
        operation = operations[0]
        if operation.get('status') == 'success' and 'result' in operation:
            # Get transaction details to find the fee
            txid = operation['result'].get('txid')
            if txid:
                # Get transaction details to extract fee
                tx_info = get_transaction(txid)
                return abs(float(tx_info.get('fee', 0.0)))
        
        return 0.0
    except:
        return 0.0


def z_getbalance_for_address(address: str, minconf: int = 1):
    """
    Get the balance for a specific shielded address.
    Uses the newer z_getbalance method with address parameter.
    
    Args:
        address: The shielded address to check
        minconf: Minimum confirmations required (default: 1)
    
    Returns:
        Balance amount for the specific address
    """
    if DISABLE_ZCASH_NODE:
        # Return mock balance for dev mode
        return _mock_user_balances.get(address, 10.0)
    
    try:
        payload = {
            "jsonrpc": "1.0",
            "id": "z_getbalance",
            "method": "z_getbalance",
            "params": [address, minconf]
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        result = response.json()
        if result.get('error'):
            print(f"z_getbalance error: {result['error']}")
            # If z_getbalance fails, try alternative method
            return z_listreceivedbyaddress_total(address, minconf)
        
        return float(result['result'])
    
    except Exception as e:
        print(f"z_getbalance_for_address failed: {e}")
        # Fallback to checking received amounts
        try:
            return z_listreceivedbyaddress_total(address, minconf)
        except:
            return 0.0


def z_listreceivedbyaddress_total(address: str, minconf: int = 1):
    """
    Calculate total received by a shielded address using z_listreceivedbyaddress.
    This is a fallback when z_getbalance doesn't work.
    """
    try:
        received_amounts = z_listreceivedbyaddress(address, minconf)
        return sum(float(tx.get('amount', 0)) for tx in received_amounts)
    except:
        return 0.0


def z_getbalance(account: int = None, minconf: int = 1, include_watchonly: bool = False):
    """
    DEPRECATED: Get the shielded balance for an account.
    Note: This method is deprecated in newer Zcash versions.
    Use z_getbalance_for_address for specific addresses instead.
    
    Args:
        account: Account number (None for all accounts)
        minconf: Minimum confirmations required (default: 1)
        include_watchonly: Include watch-only addresses
    
    Returns:
        Shielded balance amount
    """
    if DISABLE_ZCASH_NODE:
        # Return mock pool balance for dev mode
        return _mock_pool_balance
    
    try:
        # Use newer method if possible
        payload = {
            "jsonrpc": "1.0",
            "id": "z_getbalanceforaccount",
            "method": "z_getbalanceforaccount",
            "params": [account or 0, minconf]
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code == 200:
            result = response.json()
            if not result.get('error'):
                return float(result['result'])
        
        # Fallback to getbalance for transparent funds
        payload = {
            "jsonrpc": "1.0",
            "id": "getbalance",
            "method": "getbalance",
            "params": []
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code == 200:
            result = response.json()
            if not result.get('error'):
                return float(result['result'])
        
        return 0.0
    
    except Exception as e:
        print(f"z_getbalance failed: {e}")
        return 0.0


def z_listreceivedbyaddress(address: str, minconf: int = 1):
    """
    List amounts received by a specific shielded address.
    This is used to verify shielded deposits for betting.
    
    Args:
        address: The shielded address to check
        minconf: Minimum confirmations required (default: 1)
    
    Returns:
        List of received amounts and transaction details
    """
    try:
        payload = {
            "jsonrpc": "1.0",
            "id": "z_listreceivedbyaddress",
            "method": "z_listreceivedbyaddress",
            "params": [address, minconf]
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        result = response.json()
        return result['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def list_transactions(account: str = "*", count: int = 10, skip: int = 0):
    """
    List recent transactions for an account or all accounts.
    Used to find specific deposit transactions.
    
    Args:
        account: Account name or "*" for all accounts
        count: Number of transactions to return
        skip: Number of transactions to skip
    
    Returns:
        List of transaction objects
    """
    try:
        payload = {
            "jsonrpc": "1.0",
            "id": "listtransactions",
            "method": "listtransactions",
            "params": [account, count, skip]
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        result = response.json()
        return result['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_transaction(txid: str):
    """
    Get detailed information about a specific transaction.
    
    Args:
        txid: Transaction ID to look up
    
    Returns:
        Transaction details including confirmations
    """
    try:
        payload = {
            "jsonrpc": "1.0",
            "id": "gettransaction",
            "method": "gettransaction",
            "params": [txid]
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code != 200:
            print(response.json())
            raise HTTPException(status_code=500, detail="Failed to connect to Zcash node")

        result = response.json()
        return result['result']
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def verify_shielded_deposit(address: str, expected_amount: float, min_confirmations: int = 6):
    """
    Verify that a shielded deposit of the expected amount has been received at an address.
    This is the main function for confirming shielded bet deposits.
    
    Args:
        address: The shielded address to check for deposits
        expected_amount: The amount we expect to receive
        min_confirmations: Minimum confirmations required
    
    Returns:
        Dict with verification status and details
    """
    try:
        # Get transactions received with minimum confirmations
        confirmed_txs = z_listreceivedbyaddress(address, min_confirmations)
        
        # Get all transactions (including unconfirmed)
        all_txs = z_listreceivedbyaddress(address, 0)
        
        # Calculate total amounts
        confirmed_amount = sum(float(tx.get('amount', 0)) for tx in confirmed_txs)
        total_amount = sum(float(tx.get('amount', 0)) for tx in all_txs)
        
        # Check if we have enough confirmed funds
        if confirmed_amount >= expected_amount:
            return {
                "status": "confirmed",
                "confirmed_amount": confirmed_amount,
                "total_amount": total_amount,
                "confirmations": min_confirmations,
                "transactions": confirmed_txs,
                "message": f"Shielded deposit confirmed: {confirmed_amount} ZEC received"
            }
        
        # Check if we have unconfirmed funds
        elif total_amount >= expected_amount:
            pending_amount = total_amount - confirmed_amount
            return {
                "status": "pending",
                "confirmed_amount": confirmed_amount,
                "total_amount": total_amount,
                "pending_amount": pending_amount,
                "confirmations": 0,
                "transactions": all_txs,
                "message": f"Shielded deposit pending confirmation: {total_amount} ZEC received, {pending_amount} ZEC awaiting {min_confirmations} confirmations"
            }
        
        # Not enough funds received
        else:
            return {
                "status": "insufficient", 
                "confirmed_amount": confirmed_amount,
                "total_amount": total_amount,
                "expected_amount": expected_amount,
                "transactions": all_txs,
                "message": f"Insufficient shielded funds: expected {expected_amount} ZEC, received {total_amount} ZEC"
            }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "message": f"Error checking shielded deposit: {str(e)}"
        }


def get_unified_address_balance(address: str) -> float:
    """
    Get total balance for a Unified Address across all its pools.
    For Unified Addresses, we need to check the total balance in the wallet.
    """
    if DISABLE_ZCASH_NODE:
        return _mock_user_balances.get(address, 10.0)
    
    try:
        # Method 1: Try getbalance (gets total wallet balance)
        # For Unified Addresses, this often gives the most accurate total
        payload = {
            "jsonrpc": "1.0",
            "id": "getbalance",
            "method": "getbalance",
            "params": []
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code == 200:
            result = response.json()
            if result.get('result') is not None and not result.get('error'):
                balance = float(result['result'])
                print(f"Wallet total balance: {balance} ZEC")
                return balance
        
        # Method 2: Try z_getbalanceforaccount (if we know the account number)
        # For now, try account 0 which is often the default
        payload = {
            "jsonrpc": "1.0",
            "id": "z_getbalanceforaccount",
            "method": "z_getbalanceforaccount",
            "params": [0]
        }
        
        response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
        
        if response.status_code == 200:
            result = response.json()
            if result.get('result') is not None and not result.get('error'):
                balance = float(result['result'])
                print(f"Account 0 balance: {balance} ZEC")
                return balance
        
        print(f"Could not determine balance for Unified Address {address}, returning 0")
        return 0.0
        
    except Exception as e:
        print(f"Error getting unified address balance: {e}")
        return 0.0


# Helper functions for development mode balance management
def get_user_balance_by_address(address: str) -> float:
    """Get user balance by their Zcash address."""
    if DISABLE_ZCASH_NODE:
        return _mock_user_balances.get(address, 10.0)
    else:
        if address.startswith('t'):
            return get_transparent_address_balance(address)
        elif address.startswith('z'):
            # For shielded addresses, return 0 for now (addresses need to be in wallet)
            # In a full implementation, you'd check if address is in wallet first
            return 0.0
        elif address.startswith('u'):
            # Unified Address - need to check total balance across all pools
            return get_unified_address_balance(address)
        else:
            # Other address types, try transparent method
            return get_transparent_address_balance(address)

def get_combined_user_balance(transparent_address: str, shielded_address: str) -> dict:
    """
    Get combined balance for a specific user's transparent and shielded addresses.
    
    Args:
        transparent_address: User's specific transparent address (t-address)
        shielded_address: User's specific shielded address (z-address or u-address)
    
    Returns:
        Dictionary with transparent_balance, shielded_balance, and total_balance for this user only
    """
    if DISABLE_ZCASH_NODE:
        # In dev mode, return mock balances
        transparent_balance = _mock_user_balances.get(transparent_address, 0.0001)
        shielded_balance = _mock_user_balances.get(shielded_address, 0.01644)
        return {
            "transparent_balance": transparent_balance,
            "shielded_balance": shielded_balance,
            "total_balance": transparent_balance + shielded_balance
        }
    
    try:
        # Get transparent balance for the specific t-address
        transparent_balance = 0.0
        if transparent_address and transparent_address.startswith('t'):
            transparent_balance = get_transparent_address_balance(transparent_address)
        
        # Get shielded balance for the specific shielded address
        shielded_balance = 0.0
        if shielded_address:
            if shielded_address.startswith('z'):
                # For z-addresses (Sapling), use z_getbalance for the specific address
                shielded_balance = z_getbalance_for_address(shielded_address)
            elif shielded_address.startswith('u'):
                # For unified addresses, we need to check if this specific address has balance
                # Since unified addresses can contain multiple receiver types, we need to
                # check the balance associated with this specific unified address
                try:
                    # Try to get balance for this specific unified address
                    # Note: This might require the address to be in the wallet
                    payload = {
                        "jsonrpc": "1.0",
                        "id": "z_getbalance",
                        "method": "z_getbalance",
                        "params": [shielded_address, 1]  # address, minconf
                    }
                    
                    response = requests.post(ZCASH_RPC_URL, json=payload, auth=(ZCASH_RPC_USER, ZCASH_RPC_PASSWORD))
                    
                    if response.status_code == 200:
                        result = response.json()
                        if result.get('result') is not None and not result.get('error'):
                            shielded_balance = float(result['result'])
                        else:
                            print(f"z_getbalance error for unified address: {result.get('error')}")
                            # Fallback: if the specific address query fails, 
                            # this might mean the address isn't in the wallet or has no balance
                            shielded_balance = 0.0
                    else:
                        print(f"HTTP error querying unified address balance: {response.status_code}")
                        shielded_balance = 0.0
                        
                except Exception as e:
                    print(f"Error getting unified address balance: {e}")
                    shielded_balance = 0.0
        
        total_balance = transparent_balance + shielded_balance
        
        print(f"User balance - T-addr: {transparent_address} = {transparent_balance}, "
              f"Shielded-addr: {shielded_address} = {shielded_balance}, Total: {total_balance}")
        
        return {
            "transparent_balance": transparent_balance,
            "shielded_balance": shielded_balance,
            "total_balance": total_balance
        }
        
    except Exception as e:
        print(f"Error getting combined user balance: {e}")
        # Return zero balances on error
        return {
            "transparent_balance": 0.0,
            "shielded_balance": 0.0,
            "total_balance": 0.0
        }

def deduct_user_balance(address: str, amount: float) -> None:
    """Deduct amount from user's balance (dev mode only)."""
    if DISABLE_ZCASH_NODE:
        current = _mock_user_balances.get(address, 10.0)
        _mock_user_balances[address] = max(0, current - amount)

def add_user_balance(address: str, amount: float) -> None:
    """Add amount to user's balance (dev mode only)."""
    if DISABLE_ZCASH_NODE:
        current = _mock_user_balances.get(address, 10.0)
        _mock_user_balances[address] = current + amount

def get_pool_balance() -> float:
    """Get pool balance."""
    if DISABLE_ZCASH_NODE:
        return _mock_pool_balance
    else:
        # In production, would check actual pool address
        from ..config import settings
        pool_address = settings.get_pool_address()
        try:
            return get_transparent_address_balance(pool_address)
        except:
            # Try shielded if transparent fails
            return z_getbalance(0)


def shield_transparent_funds(transparent_address: str, shielded_address: str, amount: float = None, from_unified_address: str = None) -> dict:
    """
    Shield transparent funds by sending them to the user's shielded address.
    
    Args:
        transparent_address: User's transparent address containing funds to shield
        shielded_address: User's shielded address to receive the funds
        amount: Specific amount to shield, or None to shield all available funds
        from_unified_address: The unified address to use as from_address (required for z_sendmany)
    
    Returns:
        Dictionary with operation details and status
    """
    try:
        # Get current transparent balance
        transparent_balance = get_transparent_address_balance(transparent_address)
        
        if transparent_balance <= 0:
            return {
                "status": "no_funds",
                "message": "No transparent funds available to shield",
                "transparent_balance": transparent_balance
            }
        
        # Determine amount to shield
        if amount is None:
            amount_to_shield = transparent_balance
        else:
            if amount > transparent_balance:
                return {
                    "status": "insufficient_funds",
                    "message": f"Requested amount {amount} exceeds available balance {transparent_balance}",
                    "transparent_balance": transparent_balance,
                    "requested_amount": amount
                }
            amount_to_shield = amount
        
        # Minimum amount check (to account for transaction fees)
        min_shield_amount = 0.0001  # 0.0001 ZEC minimum
        if amount_to_shield < min_shield_amount:
            return {
                "status": "amount_too_small",
                "message": f"Amount {amount_to_shield} is below minimum shielding amount {min_shield_amount}",
                "transparent_balance": transparent_balance,
                "minimum_amount": min_shield_amount
            }
        
        # Prepare recipients for z_sendmany
        recipients = [
            {
                "address": shielded_address,
                "amount": amount_to_shield
            }
        ]
        
        # Use z_sendmany to send from transparent to shielded
        # Note: For unified addresses, we must use the full unified address, not the extracted transparent component
        send_from_address = from_unified_address if from_unified_address else shielded_address
        operation_id = z_sendmany(
            from_address=send_from_address,
            recipients=recipients,
            minconf=1,  # Require 1 confirmation for inputs
            fee=None,   # Use automatic fee calculation
            privacy_policy=None
        )
        
        return {
            "status": "success",
            "message": f"Shielding transaction submitted successfully",
            "operation_id": operation_id,
            "amount_shielded": amount_to_shield,
            "from_address": send_from_address,
            "to_address": shielded_address,
            "transparent_balance_before": transparent_balance
        }
        
    except HTTPException:
        raise
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to shield transparent funds: {str(e)}",
            "error": str(e)
        }


# TODO: Auto-shielding functions (for future implementation)
# - auto_shield_transparent_funds()
# - check_auto_shield_conditions() 
# When ready, implement functions to automatically move transparent funds to shielded