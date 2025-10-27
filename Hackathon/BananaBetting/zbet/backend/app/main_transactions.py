from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordRequestForm
from typing import List

from . import auth, crud, models, schemas
from .database import SessionLocal, engine, get_db
from .zcash_mod import zcash_wallet, zcash_utils

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zcash Transaction API", description="API for Zcash transactions with authentication")

# CORS configuration - adjust origins as needed
origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication functions
def authenticate_user(db: Session, username: str, password: str):
    user = crud.get_user_by_username(db, username)
    if not user:
        return False
    if not auth.verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
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

# Authentication endpoints
@app.post("/register/", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user with Zcash wallet"""
    return crud.create_user(db=db, user=user)

@app.post("/login/", response_model=schemas.Token)
def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    """Login and get access token"""
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/token_status/")
def check_token_status(token: str = Depends(auth.oauth2_scheme)):
    """Check if token is valid"""
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

@app.get("/users/me/", response_model=schemas.User)
def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

# Zcash transaction endpoints
@app.post("/zcash/send/")
def send_zcash(transaction: schemas.Transaction, current_user: models.User = Depends(get_current_user)):
    """Send Zcash to an address"""
    try:
        # Validate the destination address
        zcash_utils.validate_zcash_address(transaction.address)
        
        # Send the transaction
        result = zcash_wallet.send_to_address(
            address=transaction.address,
            amount=transaction.amount,
            comment=f"Sent by {current_user.username}",
            subtractfeefromamount=False
        )
        
        return {
            "message": "Transaction sent successfully",
            "transaction_id": result,
            "from": current_user.zcash_address,
            "to": transaction.address,
            "amount": transaction.amount
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/zcash/balance/")
def get_balance(current_user: models.User = Depends(get_current_user)):
    """Get current user's Zcash balance (combined transparent and shielded)"""
    try:
        # Get combined balance from both transparent and shielded addresses
        balance_info = zcash_wallet.get_combined_user_balance(
            current_user.zcash_transparent_address,
            current_user.zcash_address
        )
        
        return {
            "address": current_user.zcash_address,
            "transparent_address": current_user.zcash_transparent_address,
            "balance": balance_info["total_balance"],
            "transparent_balance": balance_info["transparent_balance"],
            "shielded_balance": balance_info["shielded_balance"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/zcash/refresh-balance/")
def refresh_balance(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Refresh user's balance from the Zcash node and update database"""
    try:
        # Get current balance from Zcash node
        current_balance = zcash_wallet.get_transparent_address_balance(current_user.zcash_transparent_address)
        
        # Update user's balance in database
        current_user.balance = str(current_balance)
        db.commit()
        
        return {
            "address": current_user.zcash_address,
            "transparent_address": current_user.zcash_transparent_address,
            "balance": current_balance,
            "message": "Balance refreshed successfully"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/zcash/address/")
def get_address(current_user: models.User = Depends(get_current_user)):
    """Get current user's Zcash addresses"""
    return {
        "zcash_address": current_user.zcash_address,
        "transparent_address": current_user.zcash_transparent_address,
        "account": current_user.zcash_account
    }

@app.post("/zcash/validate-address/")
def validate_address(address: str):
    """Validate a Zcash address"""
    from .zcash_mod import DISABLE_ZCASH_NODE
    
    if DISABLE_ZCASH_NODE:
        # Mock validation when Zcash node is disabled
        is_valid = address.startswith(('t', 'z', 'u', 'mock_'))  # Simple mock validation
        return {
            "address": address,
            "is_valid": is_valid,
            "details": {"isvalid": is_valid, "type": "mock"},
            "message": "Development mode: Mock validation"
        }
    
    try:
        result = zcash_utils.validate_zcash_address(address)
        return {
            "address": address,
            "is_valid": result.get("isvalid", False),
            "details": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/zcash/new-account/")
def create_new_account(current_user: models.User = Depends(get_current_user)):
    """Create a new Zcash account (admin function)"""
    from .zcash_mod import DISABLE_ZCASH_NODE
    
    if DISABLE_ZCASH_NODE:
        # Return mock data when Zcash node is disabled
        import random
        account = random.randint(1000, 9999)
        return {
            "account": account,
            "address": f"mock_unified_address_{random.randint(10000, 99999)}",
            "transparent_address": f"tmMockAddress{random.randint(100000, 999999)}",
            "message": "Development mode: Mock Zcash data returned"
        }
    
    try:
        account = zcash_wallet.z_get_new_account()
        address = zcash_wallet.z_getaddressforaccount(account)
        transparent_address = zcash_wallet.z_listunifiedreceivers(address, 'p2pkh')
        
        return {
            "account": account,
            "address": address,
            "transparent_address": transparent_address
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check
@app.get("/health/")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "zcash-transaction-api"}

@app.get("/")
def root():
    """Root endpoint with API information"""
    return {
        "message": "Zcash Transaction API",
        "docs": "/docs",
        "health": "/health"
    }
