from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
    
from sqlalchemy.orm import Session
from typing import Annotated, Optional

from . import auth, crud, models, schemas, cleaners, serializers, betting_utils
from .database import SessionLocal, engine
from .config import settings
from .transaction_service import TransactionService, BalanceReconciliationService

# EST timezone utility will be imported from betting_utils when needed

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000", "https://zbet-frontend.vercel.app" # React development server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Auth dependency
def authenticate_user(db: Session, zcash_address: str, password: str):
    user = crud.get_user_by_username(db, zcash_address)
    if not user:
        return False
    if not auth.verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + timedelta(minutes=300)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, auth.SECRET_KEY, algorithm=auth.ALGORITHM)
        return encoded_jwt
    

def get_current_user(db: Session = Depends(get_db), token: str = Depends(auth.oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


@app.get("/token_status/")
def check_token_status(token: str = Depends(auth.oauth2_scheme)):
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        expiration = payload.get("exp")
        current_time = datetime.now(timezone.utc).timestamp()

        if expiration < current_time:
            return {"status": "expired"}
        return {"status": "valid"}
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate token",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.post("/login/")
def login_for_access_token(db: Session = Depends(get_db),form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password", headers={"WWW-Authenticate": "Bearer"},)
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    """Get current user information"""
    return schemas.User(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        is_active=current_user.is_active,
        zcash_account=current_user.zcash_account or "",
        zcash_address=current_user.zcash_address or "",
        zcash_transparent_address=current_user.zcash_transparent_address or "",
        balance=current_user.balance or "0",
        shielded_balance=current_user.shielded_balance,
        transparent_balance=current_user.transparent_balance,
        last_balance_update=current_user.last_balance_update.isoformat() if current_user.last_balance_update else None,
        balance_version=current_user.balance_version
    )

@app.post("/register/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    cleaners.validate_email(db, email=user.email)
    cleaners.validate_username(db, username=user.username)
    cleaners.validate_password(db, password=user.password)
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    users = crud.get_some_users(db, skip=skip, limit=limit, current_user_id=current_user.id)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user




# @app.post("/users/{user_id}/items/", response_model=schemas.Item)
# def create_item_for_user(user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)):
#     return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.post("/zcash/send-to-address/")
def z_cash_send_to_address(transaction: schemas.Transaction, db: Session = Depends(get_db)):
    # Process Zcash transaction (add your Zcash-specific logic here)
    # For example: zcash_wallet.send_to_address(transaction.address, transaction.amount)
    
    return {
        "message": "Zcash transaction processed successfully",
        "address": transaction.address,
        "amount": transaction.amount
    }




import requests

API_KEY = '4e7768a1-449d-40c2-8048-c3dbe16a2170'

@app.get("/api/crypto")
def get_crypto_data(start: str, end: str):
    url = f"https://pro-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical?symbol=ZEC&convert=USD&time_start={start}&time_end={end}"
    headers = {
        "X-CMC_PRO_API_KEY": API_KEY,
        "Accept": "application/json"
    }
    response = requests.get(url, headers=headers)
    return response.json()


# NonProfit API endpoints
@app.get("/api/nonprofits", response_model=list[schemas.NonProfitResponse])
def get_nonprofits(
    skip: int = 0,
    limit: int = 100,
    active_only: bool = True,
    search: str = None,
    db: Session = Depends(get_db)
):
    """Get all nonprofits with optional filtering"""
    nonprofits = crud.get_nonprofits(db, skip=skip, limit=limit, active_only=active_only, search=search)
    return nonprofits


@app.get("/api/nonprofits/{nonprofit_id}", response_model=schemas.NonProfitResponse)
def get_nonprofit(nonprofit_id: int, db: Session = Depends(get_db)):
    """Get a single nonprofit by ID"""
    nonprofit = crud.get_nonprofit(db, nonprofit_id)
    if not nonprofit:
        raise HTTPException(status_code=404, detail="Nonprofit not found")
    return nonprofit


@app.post("/api/nonprofits", response_model=schemas.NonProfitResponse)
def create_nonprofit(
    nonprofit: schemas.NonProfitCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new nonprofit (admin only for now)"""
    # TODO: Add admin role check here when implemented
    try:
        return crud.create_nonprofit(db, nonprofit)
    except Exception as e:
        # Handle unique constraint violations
        if "UNIQUE constraint failed: nonprofits.federal_tax_id" in str(e):
            raise HTTPException(
                status_code=400, 
                detail=f"A non-profit with EIN '{nonprofit.federal_tax_id}' already exists. Each organization can only be registered once."
            )
        elif "UNIQUE constraint failed: nonprofits.zcash_transparent_address" in str(e):
            raise HTTPException(
                status_code=400, 
                detail=f"The Zcash transparent address '{nonprofit.zcash_transparent_address}' is already in use by another organization."
            )
        elif "UNIQUE constraint failed: nonprofits.zcash_shielded_address" in str(e):
            raise HTTPException(
                status_code=400, 
                detail=f"The Zcash shielded address '{nonprofit.zcash_shielded_address}' is already in use by another organization."
            )
        else:
            # Re-raise other exceptions
            raise HTTPException(status_code=500, detail=f"Failed to create non-profit: {str(e)}")


@app.put("/api/nonprofits/{nonprofit_id}", response_model=schemas.NonProfitResponse)
def update_nonprofit(
    nonprofit_id: int,
    nonprofit_update: schemas.NonProfitUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update nonprofit information (admin only for now)"""
    # TODO: Add admin role check here when implemented
    nonprofit = crud.get_nonprofit(db, nonprofit_id)
    if not nonprofit:
        raise HTTPException(status_code=404, detail="Nonprofit not found")
    
    return crud.update_nonprofit(db, nonprofit_id, nonprofit_update)


# Betting API endpoints
@app.get("/api/events", response_model=list[schemas.SportEventResponse])
def get_betting_events(
    skip: int = 0, 
    limit: int = 100, 
    status: str = None,
    db: Session = Depends(get_db)
):
    """Get all betting events with optional status filter"""
    events = crud.get_sport_events(db, skip=skip, limit=limit, status=status)
    
    # Convert events to response format using model's to_dict method
    response_events = []
    for event in events:
        event_data = event.to_dict(db)
        response_events.append(schemas.SportEventResponse(**event_data))
    
    return response_events


@app.get("/api/events/{event_id}", response_model=schemas.SportEventResponse)
def get_betting_event(event_id: int, db: Session = Depends(get_db)):
    """Get a single betting event by ID"""
    event = crud.get_sport_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Convert to response format using model's to_dict method
    event_data = event.to_dict(db)
    return schemas.SportEventResponse(**event_data)


@app.post("/api/events", response_model=schemas.SportEventResponse)
def create_betting_event(
    event_request: schemas.CreateEventRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Create a new betting event"""
    try:
        # Validate the event data
        event_data = event_request.event_data
        
        # Basic validation
        if not event_data.title.strip():
            raise HTTPException(status_code=400, detail="Event title is required")
        if not event_data.description.strip():
            raise HTTPException(status_code=400, detail="Event description is required")
        
        # Validate datetime strings and ensure they're in the future
        # All times are handled in EST timezone
        try:
            event_start_time = datetime.fromisoformat(event_data.event_start_time)
            event_end_time = datetime.fromisoformat(event_data.event_end_time)
            settlement_time = datetime.fromisoformat(event_data.settlement_time)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid datetime format")
        
        # Get current time in EST for comparison
        now = betting_utils.get_est_now()
        if event_start_time <= now:
            raise HTTPException(status_code=400, detail="Event start time must be in the future")
        if event_end_time <= event_start_time:
            raise HTTPException(status_code=400, detail="Event end time must be after event start time")
        if settlement_time <= event_end_time:
            raise HTTPException(status_code=400, detail="Settlement time must be after event end time")
        
        # Validate category
        try:
            models.EventCategory(event_data.category)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid category: {event_data.category}")
        
        # Validate betting system type
        try:
            models.BettingSystemType(event_data.betting_system_type)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid betting system type: {event_data.betting_system_type}")
        
        # Validate nonprofit exists
        if event_data.nonprofit_id:
            nonprofit = crud.get_nonprofit(db, event_data.nonprofit_id)
            if not nonprofit:
                raise HTTPException(status_code=400, detail="Nonprofit not found")
            if not nonprofit.is_active:
                raise HTTPException(status_code=400, detail="Nonprofit is not active")
        
        # Create the sport event
        sport_event = crud.create_sport_event(db, event_data, current_user.id)
        
        # Handle pari-mutuel specific data
        if event_data.betting_system_type == "pari_mutuel":
            if not event_request.pari_mutuel_data:
                raise HTTPException(status_code=400, detail="Pari-mutuel data is required for pari-mutuel events")
            
            pari_data = event_request.pari_mutuel_data
            
            # Validate pari-mutuel data
            if len(pari_data.betting_pools) < 2:
                raise HTTPException(status_code=400, detail="At least 2 betting pools are required")
            
            # Validate betting pools
            outcome_names = []
            for pool in pari_data.betting_pools:
                if not pool.outcome_name.strip():
                    raise HTTPException(status_code=400, detail="Pool outcome name is required")
                if not pool.outcome_description.strip():
                    raise HTTPException(status_code=400, detail="Pool outcome description is required")
                
                outcome_name = pool.outcome_name.lower().strip()
                if outcome_name in outcome_names:
                    raise HTTPException(status_code=400, detail="Outcome names must be unique")
                outcome_names.append(outcome_name)
            
            # Create the pari-mutuel event and pools
            crud.create_pari_mutuel_event(db, sport_event.id, pari_data)
        
        # Return the created event with all data
        event_dict = sport_event.to_dict(db)
        return schemas.SportEventResponse(**event_dict)
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log the error and return a generic error message
        print(f"Error creating event: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create event")


@app.get("/api/users/me/bets", response_model=list[schemas.BetResponse])
def get_current_user_bets(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Get all bets for the current authenticated user"""
    try:
        bets = crud.get_user_bets(db, user_id=current_user.id, skip=skip, limit=limit)
        
        # Transform bets to response format
        bet_responses = []
        for bet in bets:
            try:
                bet_response = serializers.transform_bet_to_response(bet, db)
                bet_responses.append(bet_response)
            except Exception as e:
                print(f"Error transforming bet {bet.id}: {str(e)}")
                # Skip this bet and continue with others
                continue
        
        return bet_responses
        
    except Exception as e:
        print(f"Error fetching user bets: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch user bets")


@app.post("/api/bets", response_model=schemas.BetResponse)
def place_bet(
    bet_request: schemas.BetPlacementRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Place a new bet for the current authenticated user"""
    try:
        # Get the sport event and validate
        sport_event = crud.get_sport_event(db, bet_request.sport_event_id)
        if not sport_event:
            raise HTTPException(status_code=404, detail="Sport event not found")
        
        # Validate the bet request (including balance check)
        betting_utils.validate_bet_for_event(sport_event, bet_request.predicted_outcome, bet_request.amount, db, current_user.id)
        
        # Create the bet record
        bet = crud.create_bet(db, bet_request, current_user.id)
        
        # Process betting system-specific logic
        betting_utils.process_bet_placement(db, bet, sport_event)
        db.commit()  # Commit all changes
        
        # Transform to response format
        bet_response = serializers.transform_bet_to_response(bet, db)
        
        return bet_response
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        print(f"Error placing bet: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to place bet")


@app.post("/api/users/me/deposit")
def add_user_deposit(
    deposit_data: dict,
    current_user: models.User = Depends(get_current_user)
):
    """Add a deposit to user's balance (for testing/development)"""
    try:
        amount = float(deposit_data.get("amount", 0))
        if amount <= 0:
            raise HTTPException(status_code=400, detail="Deposit amount must be positive")
        
        from .zcash_mod import zcash_wallet
        
        # Add to user's balance using their address
        user_address = current_user.zcash_transparent_address or current_user.zcash_address
        if user_address:
            zcash_wallet.add_user_balance(user_address, amount)
            new_balance = zcash_wallet.get_user_balance_by_address(user_address)
            
            return {
                "message": f"Added {amount} ZEC to your balance",
                "new_balance": new_balance,
                "currency": "ZEC"
            }
        else:
            raise HTTPException(status_code=400, detail="User has no Zcash address configured")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error adding deposit: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add deposit")


@app.post("/zcash/refresh-balance/")
def refresh_balance(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Refresh user's balance from the Zcash node and update database"""
    try:
        from .zcash_mod import zcash_wallet
        
        # Get combined balance from both transparent and shielded addresses
        balance_info = zcash_wallet.get_combined_user_balance(
            current_user.zcash_transparent_address,
            current_user.zcash_address
        )
        
        # Update user's balance in database with total balance
        current_user.balance = str(balance_info["total_balance"])
        db.commit()
        
        return {
            "address": current_user.zcash_address,
            "transparent_address": current_user.zcash_transparent_address,
            "balance": balance_info["total_balance"],
            "transparent_balance": balance_info["transparent_balance"],
            "shielded_balance": balance_info["shielded_balance"],
            "message": "Balance refreshed successfully"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/users/me/cashout", response_model=schemas.CashoutResponse)
def cashout_user_funds(
    cashout_request: schemas.CashoutRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Send user funds to a specified address with transaction tracking"""
    try:
        from .zcash_mod import zcash_wallet, zcash_utils
        
        # Initialize transaction service
        transaction_service = TransactionService(db)
        
        # Validate input parameters
        if cashout_request.amount <= 0:
            raise HTTPException(status_code=400, detail="No bananas! Cashout amount must be positive")
        
        # Validate destination address
        try:
            zcash_utils.validate_zcash_address(cashout_request.recipient_address)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Rotten bananas! Invalid recipient address: {str(e)}")
        
        # Use the user's primary Zcash address (which should be a Unified Address)
        sending_address = current_user.zcash_address
        
        if not sending_address:
            raise HTTPException(status_code=400, detail="User has no Zcash address configured")
        
        # Check user balance using transaction service
        balance_summary = transaction_service.get_user_balance_summary(current_user.id)
        available_balance = balance_summary["available_balance"]
        
        if available_balance < cashout_request.amount:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient balance. Available: {available_balance:.8f} ZEC, Requested: {cashout_request.amount:.8f} ZEC"
            )
        
        # Ensure amount is properly formatted (max 8 decimal places for ZEC)
        formatted_amount = round(cashout_request.amount, 8)
        
        if formatted_amount <= 0:
            raise HTTPException(status_code=400, detail="Amount must be greater than 0")
        
        # Check minimum transaction amount (1 zatoshi = 0.00000001 ZEC)
        min_amount = 0.00000001
        if formatted_amount < min_amount:
            raise HTTPException(
                status_code=400, 
                detail=f"Amount too small. Minimum: {min_amount} ZEC, Provided: {formatted_amount} ZEC"
            )
        
        # Determine address type for transaction tracking
        address_type = models.AddressType.TRANSPARENT
        if cashout_request.recipient_address.startswith('z'):
            address_type = models.AddressType.SHIELDED_SAPLING
        elif cashout_request.recipient_address.startswith('u'):
            address_type = models.AddressType.UNIFIED
        
        # Create withdrawal transaction record
        transaction = transaction_service.process_withdrawal(
            user_id=current_user.id,
            amount=formatted_amount,
            to_address=cashout_request.recipient_address,
            address_type=address_type,
            memo=cashout_request.memo
        )
        
        try:
            # Prepare transaction using z_sendmany for shielded sending
            recipients = [{
                "address": cashout_request.recipient_address,
                "amount": formatted_amount
            }]
            
            # Add memo if provided and recipient supports it (shielded address)
            if cashout_request.memo and cashout_request.recipient_address.startswith('z'):
                recipients[0]["memo"] = cashout_request.memo
            
            # Send the transaction with appropriate privacy policy
            privacy_policy = "AllowLinkingAccountAddresses"
            
            operation_id = zcash_wallet.z_sendmany(
                from_address=sending_address,
                recipients=recipients,
                minconf=1,
                privacy_policy=privacy_policy
            )
            
            # Update transaction with operation ID and confirm it
            transaction.operation_id = operation_id
            transaction_service.confirm_transaction(transaction.id, operation_id)
            
            # Deduct from user's balance (in development mode)
            zcash_wallet.deduct_user_balance(sending_address, cashout_request.amount)
            
            return schemas.CashoutResponse(
                message="Cashout transaction submitted successfully",
                transaction_id=operation_id,
                recipient_address=cashout_request.recipient_address,
                amount=cashout_request.amount,
                memo=cashout_request.memo
            )
            
        except Exception as zcash_error:
            # If Zcash transaction fails, mark our transaction as failed
            transaction_service.fail_transaction(transaction.id, str(zcash_error))
            raise HTTPException(status_code=500, detail=f"Zcash transaction failed: {str(zcash_error)}")
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error processing cashout: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process cashout: {str(e)}")


@app.get("/api/users/me/operation-status/{operation_id}", response_model=schemas.OperationStatusResponse)
def get_operation_status(
    operation_id: str,
    current_user: models.User = Depends(get_current_user)
):
    """Check the status of a Zcash operation (like z_sendmany)"""
    try:
        from .zcash_mod import zcash_wallet
        
        # Get operation status from Zcash node
        operations = zcash_wallet.z_getoperationstatus([operation_id])
        
        if not operations:
            raise HTTPException(status_code=404, detail="Operation not found")
        
        operation = operations[0]
        
        # Parse operation status
        status = operation.get('status', 'unknown')
        transaction_id = None
        error = None
        
        if status == 'success' and 'result' in operation:
            transaction_id = operation['result'].get('txid')
        elif status == 'failed' and 'error' in operation:
            error = operation['error'].get('message', 'Unknown error')
        
        return schemas.OperationStatusResponse(
            operation_id=operation_id,
            status=status,
            transaction_id=transaction_id,
            error=error
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error checking operation status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to check operation status: {str(e)}")


@app.post("/api/admin/update-transaction-fee/{operation_id}")
def update_transaction_fee_from_operation(
    operation_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Update transaction fee from completed operation (admin function)"""
    try:
        from .zcash_mod import zcash_wallet
        from .transaction_service import TransactionService
        
        # Find transaction by operation ID
        transaction = db.query(models.UserTransaction).filter(
            models.UserTransaction.operation_id == operation_id
        ).first()
        
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        # Get actual fee from completed operation
        fee = zcash_wallet.get_operation_fee(operation_id)
        
        if fee > 0:
            # Update transaction with actual fee
            transaction_service = TransactionService(db)
            updated_transaction = transaction_service.update_transaction_fee(
                transaction.id, 
                fee
            )
            
            return {
                "message": f"Updated transaction {transaction.id} with fee {fee}",
                "transaction_id": transaction.id,
                "network_fee": fee,
                "operation_id": operation_id
            }
        else:
            return {
                "message": "Fee information not yet available",
                "operation_id": operation_id
            }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating transaction fee: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update transaction fee: {str(e)}")


@app.post("/api/users/me/shield-funds", response_model=schemas.ShieldFundsResponse)
def shield_transparent_funds(
    shield_request: schemas.ShieldFundsRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Shield transparent funds by moving them to the user's shielded address"""
    try:
        from .zcash_mod import zcash_wallet
        from .transaction_service import TransactionService
        
        # Validate user has required addresses
        if not current_user.zcash_transparent_address:
            raise HTTPException(status_code=400, detail="User does not have a transparent address")
        
        if not current_user.zcash_address:
            raise HTTPException(status_code=400, detail="User does not have a shielded address")
        
        # Call the shield function
        result = zcash_wallet.shield_transparent_funds(
            transparent_address=current_user.zcash_transparent_address,
            shielded_address=current_user.zcash_address,
            amount=shield_request.amount,
            from_unified_address=current_user.zcash_address  # Use the unified address as from_address
        )
        
        # If shielding was successful, create transaction record
        if result["status"] == "success":
            transaction_service = TransactionService(db)
            
            # Create transaction record for the shielding operation
            transaction = transaction_service.create_transaction(
                user_id=current_user.id,
                transaction_type=models.TransactionType.SHIELD,
                amount=result["amount_shielded"],
                description=f"Shield transparent funds: {result['amount_shielded']} ZEC",
                from_address=result["from_address"],
                to_address=result["to_address"],
                from_address_type=models.AddressType.TRANSPARENT,
                to_address_type=models.AddressType.SHIELDED_SAPLING,
                operation_id=result["operation_id"],
                metadata={"shielding_operation": True}
            )
            
            # Update user balances (move funds from transparent to shielded)
            # Note: This is optimistic - the actual move will happen when the transaction confirms
            # The transaction service already handles the balance updates in create_transaction
            
        return schemas.ShieldFundsResponse(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error shielding funds: {str(e)}")
        # Return error in the expected format
        return schemas.ShieldFundsResponse(
            status="error",
            message=f"Failed to shield transparent funds: {str(e)}",
            error=str(e)
        )


@app.get("/api/pool/balance")
def get_pool_balance(current_user: models.User = Depends(get_current_user)):
    """Get pool balance (admin only for now)"""
    try:
        from .zcash_mod import zcash_wallet
        balance = zcash_wallet.get_pool_balance()
        return {
            "pool_balance": balance,
            "currency": "ZEC"
        }
    except Exception as e:
        print(f"Error getting pool balance: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get pool balance")

@app.get("/api/config")
def get_configuration():
    """Get current application configuration (non-sensitive data only)."""
    return settings.get_config_summary()


@app.get("/api/statistics", response_model=schemas.StatisticsResponse)
def get_statistics(db: Session = Depends(get_db)):
    """Get overall platform statistics"""
    try:
        # Count total bets (only confirmed deposits)
        total_bets = db.query(models.Bet).filter(
            models.Bet.deposit_status == models.DepositStatus.CONFIRMED
        ).count()
        
        # Count total events
        total_events = db.query(models.SportEvent).count()
        
        # Count total users
        total_users = db.query(models.User).count()
        
        return schemas.StatisticsResponse(
            total_bets=total_bets,
            total_events=total_events,
            total_users=total_users
        )
        
    except Exception as e:
        print(f"Error fetching statistics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")


@app.post("/api/events/{event_id}/settle", response_model=schemas.SettlementResponse)
def settle_betting_event(
    event_id: int,
    settlement_request: schemas.SettlementRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Settle a betting event with the final outcome and create payout records.
    
    This endpoint (Phase 1 - Settlement):
    1. Validates the winning outcome
    2. Calculates payouts for all winning bets
    3. Creates payout records in the database with is_processed=False
    4. Marks the event as SETTLED (but not paid out yet)
    5. Does NOT send any Zcash transactions
    
    Args:
        event_id: ID of the event to settle
        settlement_request: Contains the winning outcome
        
    Returns:
        SettlementResponse with settlement details and payout records (no transaction_id)
    """
    try:
        # Check if event exists and can be settled
        sport_event = db.query(models.SportEvent).filter(models.SportEvent.id == event_id).first()
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Allow automatic settlement - no authorization check needed
        # Settlement can be triggered by anyone once conditions are met
        
        # Process the settlement using configured addresses
        settlement_response = betting_utils.settle_event(
            db=db,
            event_id=event_id,
            winning_outcome=settlement_request.winning_outcome
        )
        
        return settlement_response
        
    except HTTPException:
        # Re-raise HTTP exceptions from betting_utils
        raise
    except Exception as e:
        print(f"Error settling event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to settle event")


@app.post("/api/events/{event_id}/settle-with-consensus", response_model=schemas.SettlementResponse)
def settle_event_with_consensus(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Settle a betting event using validation consensus to determine the winning outcome.
    
    This endpoint (Phase 1 - Settlement with Consensus):
    1. Checks for validation consensus (minimum 3 validators, 60% agreement)
    2. Uses the consensus outcome to settle the event automatically
    3. Calculates payouts for all winning bets
    4. Distributes validator rewards to users who validated correctly
    5. Creates payout records in the database with is_processed=False
    6. Marks the event as SETTLED (but not paid out yet)
    7. Does NOT send any Zcash transactions
    
    Args:
        event_id: ID of the event to settle
        
    Returns:
        SettlementResponse with settlement details and payout records (no transaction_id)
    """
    try:
        # Check if event exists and can be settled
        sport_event = db.query(models.SportEvent).filter(models.SportEvent.id == event_id).first()
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Allow automatic consensus settlement - no authorization check needed
        # Consensus settlement can be triggered by anyone once consensus is reached
        
        # Process the consensus-based settlement
        settlement_response = betting_utils.settle_event_with_consensus(
            db=db,
            event_id=event_id
        )
        
        return settlement_response
        
    except HTTPException:
        # Re-raise HTTP exceptions from betting_utils
        raise
    except Exception as e:
        print(f"Error settling event {event_id} with consensus: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to settle event with consensus")


@app.post("/api/events/{event_id}/auto-settle")
def auto_settle_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Automatically settle an event based on the best available method (Phase 1 - Auto Settlement):
    1. If consensus exists (60% agreement, min 3 validators) -> use consensus settlement
    2. If past settlement deadline -> force settlement with refunds (PUSH)
    3. Otherwise -> error (not ready for settlement)
    
    This endpoint makes settlement decisions automatically without requiring manual outcome selection.
    Creates payout records but does NOT send Zcash transactions.
    """
    try:
        # Get the event
        sport_event = db.query(models.SportEvent).filter(models.SportEvent.id == event_id).first()
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Check if already settled
        if sport_event.status == models.EventStatus.SETTLED:
            raise HTTPException(status_code=400, detail="Event is already settled")
        
        # Get current time in EST
        now_est = betting_utils.get_est_now()
        
        # Check if event is past end time
        if now_est <= sport_event.event_end_time:
            raise HTTPException(status_code=400, detail="Event has not ended yet")
        
        # Try consensus settlement first
        consensus_outcome, consensus_percentage = crud.determine_consensus_outcome(db, event_id)
        
        if consensus_outcome:
            # We have consensus - settle with it
            settlement_response = betting_utils.settle_event_with_consensus(db, event_id)
            return {
                "settlement_type": "consensus",
                "consensus_percentage": consensus_percentage,
                **settlement_response.dict()
            }
        
        # No consensus yet - check if we're past settlement deadline
        if now_est > sport_event.settlement_time:
            # Past deadline - force settlement with refunds (PUSH)
            settlement_response = betting_utils.settle_event(db, event_id, "push")
            return {
                "settlement_type": "deadline_refund", 
                "reason": "No consensus reached by deadline",
                **settlement_response.dict()
            }
        
        # Not past deadline yet, no consensus - can't auto-settle
        summary = crud.get_validation_summary(db, event_id)
        hours_until_deadline = (sport_event.settlement_time - now_est).total_seconds() / 3600
        
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot auto-settle yet. Validations: {summary.total_validations}, "
                   f"Hours until deadline: {hours_until_deadline:.1f}. "
                   f"Need consensus (60% agreement, min 3 validators) or wait for deadline."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error auto-settling event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to auto-settle event")


@app.get("/api/admin/expired-events")
def get_expired_events(db: Session = Depends(get_db)):
    """
    Get a list of events that have passed their settlement deadline.
    Useful for monitoring which events need processing.
    """
    try:
        # Get current time in EST
        now_est = betting_utils.get_est_now()
        
        # Find events past settlement deadline that aren't settled or paid out
        expired_events = db.query(models.SportEvent).filter(
            models.SportEvent.settlement_time < now_est,
            models.SportEvent.status.notin_([models.EventStatus.SETTLED, models.EventStatus.PAIDOUT, models.EventStatus.CANCELLED])
        ).all()
        
        event_list = []
        for event in expired_events:
            # Check validation status
            summary = crud.get_validation_summary(db, event.id)
            consensus_outcome, consensus_percentage = crud.determine_consensus_outcome(db, event.id)
            
            event_list.append({
                "id": event.id,
                "title": event.title,
                "settlement_time": event.settlement_time.isoformat(),
                "hours_past_deadline": (now_est - event.settlement_time).total_seconds() / 3600,
                "validation_count": summary.total_validations,
                "consensus_outcome": consensus_outcome,
                "consensus_percentage": consensus_percentage,
                "can_auto_settle": consensus_outcome is not None
            })
        
        return {
            "expired_events": event_list,
            "total_count": len(event_list),
            "current_time": now_est.isoformat()
        }
        
    except Exception as e:
        print(f"Error getting expired events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get expired events")


@app.get("/api/admin/settled-events")
def get_settled_events(db: Session = Depends(get_db)):
    """
    Get a list of events that are settled and ready for payout processing.
    These events have completed voting/consensus but haven't been paid out yet.
    """
    try:
        # Find events that are settled (outcome determined, ready for payout)
        settled_events = db.query(models.SportEvent).filter(
            models.SportEvent.status == models.EventStatus.SETTLED
        ).all()
        
        event_list = []
        for event in settled_events:
            # Get winning outcome
            winning_outcome = None
            if event.betting_system_type == models.BettingSystemType.PARI_MUTUEL:
                pari_event = db.query(models.PariMutuelEvent).filter(
                    models.PariMutuelEvent.sport_event_id == event.id
                ).first()
                if pari_event:
                    winning_outcome = pari_event.winning_outcome
            
            # Get number of bets on this event
            bet_count = db.query(models.Bet).filter(
                models.Bet.sport_event_id == event.id,
                models.Bet.deposit_status == models.DepositStatus.CONFIRMED
            ).count()
            
            # Calculate total pool amount
            total_pool = db.query(models.Bet).filter(
                models.Bet.sport_event_id == event.id,
                models.Bet.deposit_status == models.DepositStatus.CONFIRMED
            ).with_entities(models.Bet.amount).all()
            
            total_pool_amount = sum(bet.amount for bet in total_pool) if total_pool else 0
            
            # Calculate time since settlement
            now_est = betting_utils.get_est_now()
            hours_since_settlement = 0
            if event.settled_at:
                hours_since_settlement = (now_est - event.settled_at).total_seconds() / 3600
            
            event_list.append({
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "category": event.category.value,
                "settled_at": event.settled_at.isoformat() if event.settled_at else None,
                "hours_since_settlement": hours_since_settlement,
                "winning_outcome": winning_outcome,
                "bet_count": bet_count,
                "total_pool_amount": total_pool_amount,
                "ready_for_payout": True
            })
        
        return {
            "settled_events": event_list,
            "total_count": len(event_list),
            "current_time": now_est.isoformat()
        }
        
    except Exception as e:
        print(f"Error getting settled events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get settled events")


@app.get("/api/admin/events/{event_id}/payout-calculation")
def get_payout_calculation(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Get detailed payout calculation for a settled event.
    
    This endpoint:
    1. Shows payout calculations from existing database records
    2. Displays winner/loser breakdown and fee distributions
    3. Used for review before sending actual payouts
    4. Only works for events with status=SETTLED
    
    Returns:
        Detailed breakdown of all calculated payouts
    """
    # Just query the existing payout and bet records that were created during settlement
    try:
        # Eagerly load the nonprofit and creator relationships
        from sqlalchemy.orm import joinedload
        
        sport_event = db.query(models.SportEvent).options(
            joinedload(models.SportEvent.nonprofit),
            joinedload(models.SportEvent.creator)
        ).filter(models.SportEvent.id == event_id).first()
        
        if not sport_event or sport_event.status != models.EventStatus.SETTLED:
            raise HTTPException(status_code=400, detail="Event must be settled")
        
        pari_event = db.query(models.PariMutuelEvent).filter(
            models.PariMutuelEvent.sport_event_id == event_id
        ).first()
        
        payouts = db.query(models.Payout).options(
            joinedload(models.Payout.user)
        ).filter(models.Payout.sport_event_id == event_id).all()
        bets = db.query(models.Bet).options(
            joinedload(models.Bet.user)
        ).filter(
            models.Bet.sport_event_id == event_id,
            models.Bet.deposit_status == models.DepositStatus.CONFIRMED
        ).all()
        
        # Simple serialization - use existing data
        return serializers.serialize_event_payout_details(sport_event, pari_event, payouts, bets)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/admin/events/{event_id}/process-payouts")
def process_event_payouts(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Create payout records for review (Phase 2 - Process Payouts).
    
    This endpoint:
    1. Creates payout records if they don't exist (backup for settlement)
    2. Shows calculated payout amounts for admin review
    3. Does NOT send any Zcash transactions
    4. Prepares records for actual payout processing
    
    Returns:
        Summary of created payout records ready for review
    """
    try:
        # Get the event with relationships
        from sqlalchemy.orm import joinedload
        
        sport_event = db.query(models.SportEvent).options(
            joinedload(models.SportEvent.nonprofit),
            joinedload(models.SportEvent.creator)
        ).filter(models.SportEvent.id == event_id).first()
        
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        if sport_event.status != models.EventStatus.SETTLED:
            raise HTTPException(status_code=400, detail="Event must be settled before processing payouts")
        
        # Check for existing pending payouts
        pending_payouts = db.query(models.Payout).filter(
            models.Payout.sport_event_id == event_id,
            models.Payout.is_processed == False
        ).all()
        
        # If no pending payouts exist, create them from the settled event
        if not pending_payouts:
            print(f"No existing payouts found for event {event_id}. Creating payout records...")
            
            # Get the pari-mutuel event to find the winning outcome
            pari_event = db.query(models.PariMutuelEvent).filter(
                models.PariMutuelEvent.sport_event_id == event_id
            ).first()
            
            if not pari_event or not pari_event.winning_outcome:
                raise HTTPException(status_code=400, detail="Event must have a winning outcome to process payouts")
            
            # Use the existing settlement logic to create payout records
            # This reuses the same logic from betting_utils._process_event_payouts
            payout_records_list = betting_utils._process_event_payouts(db, sport_event, pari_event.winning_outcome)
            
            # The above function creates the Payout records in the database
            # Now query for the newly created pending payouts
            pending_payouts = db.query(models.Payout).filter(
                models.Payout.sport_event_id == event_id,
                models.Payout.is_processed == False
            ).all()
            
            if not pending_payouts:
                raise HTTPException(status_code=400, detail="Failed to create payout records")
        
        db.commit()
        
        return {
            "event_id": event_id,
            "created_payouts": len(pending_payouts),
            "total_amount_calculated": sum(p.payout_amount for p in pending_payouts),
            "message": "Payout records created successfully. Ready for review."
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/admin/events/{event_id}/send-payouts")
def send_event_payouts(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Send Zcash transactions for existing payout records (Phase 3 - Send Payouts).
    
    This endpoint:
    1. Takes existing payout records with is_processed=False
    2. Sends batch Zcash transactions via z_sendmany
    3. Marks payout records as is_processed=True
    4. Updates user balances (in dev mode)
    5. Records transaction IDs in payout records
    
    Returns:
        Summary of sent transactions with transaction_id
    """
    try:
        # Get existing pending payouts
        pending_payouts = db.query(models.Payout).filter(
            models.Payout.sport_event_id == event_id,
            models.Payout.is_processed == False
        ).all()
        
        if not pending_payouts:
            raise HTTPException(status_code=400, detail="No pending payouts found. Process payouts first.")
        
        # Convert to PayoutRecord format for the batch payout function
        payout_records = [
            schemas.PayoutRecord(
                user_id=p.user_id, bet_id=p.bet_id, payout_amount=p.payout_amount,
                payout_type=p.payout_type, recipient_address=p.recipient_address
            ) for p in pending_payouts
        ]
        
        # Send the batch payout transaction (only for external addresses)
        pool_address = settings.get_pool_address()
        transaction_id = betting_utils._send_batch_payouts(pool_address, payout_records)
        
        # Mark as processed and add to user balances
        from .zcash_mod import zcash_wallet
        for payout in pending_payouts:
            payout.is_processed = True
            payout.zcash_transaction_id = transaction_id
            
            # Add payout to user balance for ALL internal payouts 
            if payout.user_id and payout.payout_type in ["user_winning", "creator_fee", "validator_fee"]:
                user = db.query(models.User).filter(models.User.id == payout.user_id).first()
                if user:
                    user_address = user.zcash_transparent_address or user.zcash_address
                    if user_address:
                        zcash_wallet.add_user_balance(user_address, payout.payout_amount)
                        print(f"Added {payout.payout_amount} ZEC to {user.username} balance ({payout.payout_type})")
        
        db.commit()
        
        return {
            "event_id": event_id,
            "processed_payouts": len(pending_payouts),
            "total_amount_paid": sum(p.payout_amount for p in pending_payouts),
            "transaction_id": transaction_id
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/admin/process-expired-events")
def process_expired_events(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Process events that have passed their settlement deadline (Phase 1 - Batch Auto Settlement).
    
    For events past settlement deadline:
    1. Try consensus settlement first (if enough validations exist)
    2. If no consensus, settle with PUSH (refund all bets)
    3. Creates payout records but does NOT send Zcash transactions
    4. Events will need separate payout processing after this
    
    This should be called periodically by a cron job or background task.
    """
    try:
        # Get current time in EST
        now_est = betting_utils.get_est_now()
        
        # Find events past settlement deadline that aren't settled or paid out
        expired_events = db.query(models.SportEvent).filter(
            models.SportEvent.settlement_time < now_est,
            models.SportEvent.status.notin_([models.EventStatus.SETTLED, models.EventStatus.PAIDOUT, models.EventStatus.CANCELLED])
        ).all()
        
        processed_events = []
        
        for event in expired_events:
            try:
                # Try consensus settlement first
                consensus_outcome, consensus_percentage = crud.determine_consensus_outcome(db, event.id)
                
                if consensus_outcome:
                    # Settle with consensus
                    settlement_response = betting_utils.settle_event_with_consensus(db, event.id)
                    processed_events.append({
                        "event_id": event.id,
                        "action": "settled_with_consensus",
                        "winning_outcome": consensus_outcome,
                        "consensus_percentage": consensus_percentage,
                        "total_payouts": settlement_response.total_payouts,
                        "total_payout_amount": settlement_response.total_payout_amount
                    })
                else:
                    # No consensus - settle with PUSH (refund all bets)
                    settlement_response = betting_utils.settle_event(db, event.id, "push")
                    
                    processed_events.append({
                        "event_id": event.id,
                        "action": "cancelled_and_refunded",
                        "reason": "No validation consensus reached by deadline",
                        "total_refunds": settlement_response.total_payouts,
                        "total_refund_amount": settlement_response.total_payout_amount
                    })
                    
            except Exception as e:
                print(f"Error processing expired event {event.id}: {str(e)}")
                processed_events.append({
                    "event_id": event.id,
                    "action": "error",
                    "error": str(e)
                })
        
        db.commit()
        
        return {
            "message": f"Processed {len(expired_events)} expired events",
            "processed_events": processed_events
        }
        
    except Exception as e:
        print(f"Error processing expired events: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process expired events")


@app.get("/api/events/{event_id}/settlement", response_model=schemas.SettlementResponse | None)
def get_event_settlement(
    event_id: int,
    db: Session = Depends(get_db)
):
    """Get settlement information for an event if it has been settled"""
    try:
        # Get the event
        sport_event = db.query(models.SportEvent).filter(models.SportEvent.id == event_id).first()
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Return None if not settled or paid out
        if sport_event.status not in [models.EventStatus.SETTLED, models.EventStatus.PAIDOUT] or not sport_event.settled_at:
            return None
        
        # Get payout records for this event
        payouts = db.query(models.Payout).filter(models.Payout.sport_event_id == event_id).all()
        
        # Build payout records for response
        payout_records = []
        for payout in payouts:
            payout_records.append(schemas.PayoutRecord(
                user_id=payout.user_id,
                bet_id=payout.bet_id,
                payout_amount=payout.payout_amount,
                house_fee_deducted=payout.house_fee_deducted,
                creator_fee_deducted=payout.creator_fee_deducted,
                user_address=payout.user.zcash_address
            ))
        
        # Get winning outcome
        winning_outcome = None
        if sport_event.betting_system_type == models.BettingSystemType.PARI_MUTUEL:
            pari_event = db.query(models.PariMutuelEvent).filter(
                models.PariMutuelEvent.sport_event_id == event_id
            ).first()
            if pari_event:
                winning_outcome = pari_event.winning_outcome
        
        if not winning_outcome:
            # Fall back to first winning bet's outcome
            winning_bet = db.query(models.Bet).filter(
                models.Bet.sport_event_id == event_id,
                models.Bet.outcome == models.BetOutcome.WIN
            ).first()
            if winning_bet:
                winning_outcome = winning_bet.predicted_outcome
        
        # Calculate totals
        total_payout_amount = sum(payout.payout_amount for payout in payouts)
        
        # Get transaction ID from first payout record
        transaction_id = payouts[0].zcash_transaction_id if payouts else None
        
        return schemas.SettlementResponse(
            event_id=event_id,
            winning_outcome=winning_outcome or "unknown",
            total_payouts=len(payouts),
            total_payout_amount=total_payout_amount,
            transaction_id=transaction_id,
            settled_at=sport_event.settled_at.isoformat() + 'Z',
            payout_records=payout_records
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching settlement for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch settlement information")


@app.post("/api/events/{event_id}/mark-paid-out")
def mark_event_paid_out(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Mark an event as paid out after all payments have been processed.
    This should only be called after the actual Zcash transactions have been confirmed.
    """
    try:
        # For now, allow any authenticated user to mark as paid out
        # In production, this should be restricted to admins or automated systems
        success = betting_utils.mark_event_paid_out(db, event_id)
        return {"success": success, "message": f"Event {event_id} marked as paid out"}
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error marking event {event_id} as paid out: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to mark event as paid out")


# Validation endpoints
@app.post("/api/events/{event_id}/validate", response_model=schemas.ValidationResponse)
def submit_validation(
    event_id: int,
    validation_request: schemas.ValidationRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Submit a validation result for a specific event.
    
    Users can validate the outcome of an event after it has ended but before
    the settlement deadline. Each user can only validate each event once.
    """
    try:
        # Get the sport event and validate it exists
        sport_event = crud.get_sport_event(db, event_id)
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Check if event is in a valid state for validation
        current_status = sport_event.get_current_status()
        if current_status not in [models.EventStatus.CLOSED]:
            raise HTTPException(
                status_code=400, 
                detail="Event must be closed to accept validations"
            )
        
        # Check if event is already settled or paid out
        if current_status in [models.EventStatus.SETTLED, models.EventStatus.PAIDOUT]:
            status_text = "paid out" if current_status == models.EventStatus.PAIDOUT else "settled"
            raise HTTPException(status_code=400, detail=f"Event is already {status_text}")
        
        # Check if user has already validated this event
        existing_validation = crud.get_user_validation_for_event(db, current_user.id, event_id)
        if existing_validation:
            raise HTTPException(
                status_code=400, 
                detail="You have already validated this event"
            )
        
        # Validate that the predicted outcome is valid for this event
        betting_utils._validate_winning_outcome(db, sport_event, validation_request.predicted_outcome)
        
        # Create the validation result
        validation_result = crud.create_validation_result(
            db, current_user.id, event_id, validation_request
        )
        
        # Transform to response format
        return schemas.ValidationResponse(
            id=validation_result.id,
            user_id=validation_result.user_id,
            sport_event_id=validation_result.sport_event_id,
            predicted_outcome=validation_result.predicted_outcome,
            validated_at=validation_result.validated_at.isoformat() + 'Z',
            confidence_level=validation_result.confidence_level,
            validation_notes=validation_result.validation_notes,
            is_correct_validation=validation_result.is_correct_validation,
            validator_reward_amount=validation_result.validator_reward_amount
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error submitting validation for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit validation")


@app.get("/api/events/{event_id}/validation-summary", response_model=schemas.ValidationSummary)
def get_validation_summary(
    event_id: int,
    db: Session = Depends(get_db)
):
    """
    Get validation summary for an event, including outcome counts and consensus.
    """
    try:
        # Check if event exists
        sport_event = crud.get_sport_event(db, event_id)
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Get validation summary
        summary = crud.get_validation_summary(db, event_id)
        
        # Add settlement deadline if available
        if sport_event.settlement_time:
            summary.validation_deadline = sport_event.settlement_time.isoformat() + 'Z'
        
        return summary
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching validation summary for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch validation summary")


@app.get("/api/events/{event_id}/validations", response_model=list[schemas.ValidationResponse])
def get_event_validations(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Get all validation results for an event (admin only in the future).
    For now, any authenticated user can view validations.
    """
    try:
        # Check if event exists
        sport_event = crud.get_sport_event(db, event_id)
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Get all validations for the event
        validations = crud.get_validations_for_event(db, event_id)
        
        # Transform to response format
        validation_responses = []
        for validation in validations:
            validation_responses.append(schemas.ValidationResponse(
                id=validation.id,
                user_id=validation.user_id,
                sport_event_id=validation.sport_event_id,
                predicted_outcome=validation.predicted_outcome,
                validated_at=validation.validated_at.isoformat() + 'Z',
                confidence_level=validation.confidence_level,
                validation_notes=validation.validation_notes,
                is_correct_validation=validation.is_correct_validation,
                validator_reward_amount=validation.validator_reward_amount
            ))
        
        return validation_responses
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching validations for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch event validations")


@app.get("/api/events/{event_id}/user-status")
def get_user_event_status(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Get user's status for a specific event (whether they've bet and/or validated).
    """
    try:
        # Check if event exists
        sport_event = crud.get_sport_event(db, event_id)
        if not sport_event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Check if user has bet on this event
        has_bet = crud.has_user_bet_on_event(db, current_user.id, event_id)
        
        # Check if user has already validated this event
        user_validation = crud.get_user_validation_for_event(db, current_user.id, event_id)
        has_validated = user_validation is not None
        
        return {
            "event_id": event_id,
            "user_id": current_user.id,
            "has_bet": has_bet,
            "has_validated": has_validated,
            "validation": {
                "predicted_outcome": user_validation.predicted_outcome if user_validation else None,
                "validated_at": user_validation.validated_at.isoformat() + 'Z' if user_validation else None,
                "confidence_level": user_validation.confidence_level if user_validation else None
            } if user_validation else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching user status for event {event_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch user event status")


# Transaction Tracking Endpoints

@app.get("/api/users/me/balance", response_model=schemas.UserBalanceSummary)
def get_user_balance_summary(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Get comprehensive user balance summary with transaction history"""
    try:
        transaction_service = TransactionService(db)
        balance_summary = transaction_service.get_user_balance_summary(current_user.id)
        return balance_summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get balance summary: {str(e)}")


@app.get("/api/users/me/transactions", response_model=schemas.TransactionHistoryResponse)
def get_user_transactions(
    request: schemas.TransactionHistoryRequest = Depends(),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Get user transaction history with filtering"""
    try:
        transaction_service = TransactionService(db)
        
        # Convert string transaction types to enum values
        transaction_types = None
        if request.transaction_types:
            transaction_types = [
                models.TransactionType(t) for t in request.transaction_types
                if t in [e.value for e in models.TransactionType]
            ]
        
        # Parse dates if provided
        start_date = None
        end_date = None
        if request.start_date:
            start_date = datetime.fromisoformat(request.start_date.replace('Z', '+00:00'))
        if request.end_date:
            end_date = datetime.fromisoformat(request.end_date.replace('Z', '+00:00'))
        
        transactions = transaction_service.get_user_transactions(
            user_id=current_user.id,
            transaction_types=transaction_types,
            limit=request.limit,
            offset=request.offset,
            start_date=start_date,
            end_date=end_date
        )
        
        # Convert to response format
        transaction_responses = []
        for tx in transactions:
            transaction_responses.append(schemas.TransactionResponse(
                id=tx.id,
                transaction_type=tx.transaction_type.value,
                amount=tx.amount,
                status=tx.status.value,
                created_at=tx.created_at.isoformat() + 'Z',
                confirmed_at=tx.confirmed_at.isoformat() + 'Z' if tx.confirmed_at else None,
                description=tx.description,
                from_address=tx.from_address,
                to_address=tx.to_address,
                from_address_type=tx.from_address_type.value if tx.from_address_type else None,
                to_address_type=tx.to_address_type.value if tx.to_address_type else None,
                shielded_balance_before=tx.shielded_balance_before,
                transparent_balance_before=tx.transparent_balance_before,
                shielded_balance_after=tx.shielded_balance_after,
                transparent_balance_after=tx.transparent_balance_after,
                zcash_transaction_id=tx.zcash_transaction_id,
                operation_id=tx.operation_id,
                block_height=tx.block_height,
                confirmations=tx.confirmations,
                network_fee=tx.network_fee,
                sport_event_id=tx.sport_event_id,
                bet_id=tx.bet_id,
                payout_id=tx.payout_id
            ))
        
        # Get total count for pagination
        total_count = len(transaction_responses)  # Simplified for now
        has_more = len(transactions) == request.limit
        
        return schemas.TransactionHistoryResponse(
            transactions=transaction_responses,
            total_count=total_count,
            has_more=has_more
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get transaction history: {str(e)}")


@app.post("/api/users/me/deposit", response_model=schemas.TransactionResponse)
def process_user_deposit(
    deposit_request: schemas.DepositRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Process a user deposit transaction"""
    try:
        transaction_service = TransactionService(db)
        
        # Convert address type string to enum
        address_type = models.AddressType(deposit_request.address_type)
        
        transaction = transaction_service.process_deposit(
            user_id=current_user.id,
            amount=deposit_request.amount,
            from_address=deposit_request.from_address,
            zcash_transaction_id=deposit_request.zcash_transaction_id,
            address_type=address_type,
            confirmations=deposit_request.confirmations
        )
        
        return schemas.TransactionResponse(
            id=transaction.id,
            transaction_type=transaction.transaction_type.value,
            amount=transaction.amount,
            status=transaction.status.value,
            created_at=transaction.created_at.isoformat() + 'Z',
            confirmed_at=transaction.confirmed_at.isoformat() + 'Z' if transaction.confirmed_at else None,
            description=transaction.description,
            from_address=transaction.from_address,
            to_address=transaction.to_address,
            from_address_type=transaction.from_address_type.value if transaction.from_address_type else None,
            to_address_type=transaction.to_address_type.value if transaction.to_address_type else None,
            shielded_balance_before=transaction.shielded_balance_before,
            transparent_balance_before=transaction.transparent_balance_before,
            shielded_balance_after=transaction.shielded_balance_after,
            transparent_balance_after=transaction.transparent_balance_after,
            zcash_transaction_id=transaction.zcash_transaction_id,
            operation_id=transaction.operation_id,
            block_height=transaction.block_height,
            confirmations=transaction.confirmations,
            network_fee=transaction.network_fee,
            sport_event_id=transaction.sport_event_id,
            bet_id=transaction.bet_id,
            payout_id=transaction.payout_id
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process deposit: {str(e)}")


@app.post("/api/users/me/withdraw", response_model=schemas.TransactionResponse)
def process_user_withdrawal(
    withdrawal_request: schemas.WithdrawalRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Process a user withdrawal transaction"""
    try:
        transaction_service = TransactionService(db)
        
        # Convert address type string to enum
        address_type = models.AddressType(withdrawal_request.address_type)
        
        transaction = transaction_service.process_withdrawal(
            user_id=current_user.id,
            amount=withdrawal_request.amount,
            to_address=withdrawal_request.to_address,
            address_type=address_type,
            memo=withdrawal_request.memo
        )
        
        # In a real implementation, you would initiate the actual Zcash transaction here
        # For now, we'll just mark it as confirmed
        transaction_service.confirm_transaction(transaction.id)
        
        return schemas.TransactionResponse(
            id=transaction.id,
            transaction_type=transaction.transaction_type.value,
            amount=transaction.amount,
            status=transaction.status.value,
            created_at=transaction.created_at.isoformat() + 'Z',
            confirmed_at=transaction.confirmed_at.isoformat() + 'Z' if transaction.confirmed_at else None,
            description=transaction.description,
            from_address=transaction.from_address,
            to_address=transaction.to_address,
            from_address_type=transaction.from_address_type.value if transaction.from_address_type else None,
            to_address_type=transaction.to_address_type.value if transaction.to_address_type else None,
            shielded_balance_before=transaction.shielded_balance_before,
            transparent_balance_before=transaction.transparent_balance_before,
            shielded_balance_after=transaction.shielded_balance_after,
            transparent_balance_after=transaction.transparent_balance_after,
            zcash_transaction_id=transaction.zcash_transaction_id,
            operation_id=transaction.operation_id,
            block_height=transaction.block_height,
            confirmations=transaction.confirmations,
            network_fee=transaction.network_fee,
            sport_event_id=transaction.sport_event_id,
            bet_id=transaction.bet_id,
            payout_id=transaction.payout_id
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process withdrawal: {str(e)}")


@app.post("/api/admin/reconcile-balances", response_model=schemas.BalanceReconciliationResponse)
def run_balance_reconciliation(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Run balance reconciliation for all users (admin only)"""
    try:
        # TODO: Add admin permission check
        
        reconciliation_service = BalanceReconciliationService(db)
        reconciliation = reconciliation_service.run_full_reconciliation()
        
        return schemas.BalanceReconciliationResponse(
            id=reconciliation.id,
            reconciliation_date=reconciliation.reconciliation_date.isoformat() + 'Z',
            total_users_checked=reconciliation.total_users_checked,
            discrepancies_found=reconciliation.discrepancies_found,
            total_shielded_pool_blockchain=reconciliation.total_shielded_pool_blockchain,
            total_shielded_pool_database=reconciliation.total_shielded_pool_database,
            total_transparent_pool_blockchain=reconciliation.total_transparent_pool_blockchain,
            total_transparent_pool_database=reconciliation.total_transparent_pool_database,
            reconciliation_status=reconciliation.reconciliation_status,
            notes=reconciliation.notes
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to run reconciliation: {str(e)}")


@app.get("/api/admin/reconciliations/{reconciliation_id}/users")
def get_reconciliation_user_details(
    reconciliation_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Get user-level reconciliation details (admin only)"""
    try:
        # TODO: Add admin permission check
        
        user_reconciliations = db.query(models.UserBalanceReconciliation).filter(
            models.UserBalanceReconciliation.reconciliation_id == reconciliation_id
        ).all()
        
        if not user_reconciliations:
            raise HTTPException(status_code=404, detail="Reconciliation not found")
        
        response_data = []
        for ur in user_reconciliations:
            response_data.append(schemas.UserBalanceReconciliationResponse(
                id=ur.id,
                user_id=ur.user_id,
                database_shielded_balance=ur.database_shielded_balance,
                database_transparent_balance=ur.database_transparent_balance,
                calculated_shielded_balance=ur.calculated_shielded_balance,
                calculated_transparent_balance=ur.calculated_transparent_balance,
                shielded_discrepancy=ur.shielded_discrepancy,
                transparent_discrepancy=ur.transparent_discrepancy,
                has_discrepancy=ur.has_discrepancy,
                discrepancy_resolved=ur.discrepancy_resolved,
                resolution_notes=ur.resolution_notes,
                resolved_at=ur.resolved_at.isoformat() + 'Z' if ur.resolved_at else None
            ))
        
        return response_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get reconciliation details: {str(e)}")