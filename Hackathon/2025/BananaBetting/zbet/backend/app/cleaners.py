from fastapi import Depends, FastAPI, HTTPException, status, Query
import eth_utils
from . import crud, schemas

import re

def og_validate_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(pattern, email) is not None

def og_validate_password(password):
    # Regex pattern to ensure at least one lowercase, one uppercase, one digit, one special character, and no whitespace
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    
    # Check if the password matches the pattern
    return re.match(pattern, password) is not None

def validate_eth_address(address: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid wallet address",
    )
    if not eth_utils.is_checksum_address(address):
        raise credentials_exception

def validate_email(db, email: str):
    if og_validate_email(email=email):
        db_user = crud.get_user_by_email(db, email=email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already exists")
    else:
        raise HTTPException(status_code=400, detail="Email format is invalid")
    
def validate_username(db, username: str):
    db_user = crud.get_user_by_username(db, username=username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")

def validate_password(db, password: str):
    if not og_validate_password(password):
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters containing Uppercase and special characters")
