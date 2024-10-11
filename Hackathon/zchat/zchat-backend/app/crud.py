import os
from fastapi import HTTPException
import hashlib
from datetime import datetime
from typing import List
from cryptography.fernet import Fernet

from sqlalchemy.orm import Session

from . import auth, models, schemas, cleaners
from .zcash_mod import zcash_utils, zcash_wallet

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
key_dir = os.path.join(BASE_DIR, 'key')
key_file_path = os.path.join(key_dir, 'fernet_key.key')

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_zcash_address(db: Session, zcash_address: str):
    return db.query(models.User).filter(models.User.zcash_address == zcash_address).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_some_users(db: Session, current_user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.User).filter(models.User.id != current_user_id).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    # cleaners.validate_eth_address(user.wallet_address)
    # zcash_utils.validate_zcash_address(user.wallet_address)
    # zcash_utils.validate_zcash_address('address')
    # zcash_wallet.send_to_address('address', 0.1)
    # try:
    zcash_account = zcash_wallet.z_get_new_account()
    zcash_address = zcash_wallet.z_getaddressforaccount(zcash_account)
    zcash_transparent_address = zcash_wallet.z_listunifiedreceivers(zcash_address, 'p2pkh')
    zcash_transparent_balance = str(zcash_wallet.get_transparent_address_balance(zcash_transparent_address))
    db_user = models.User(email=user.email.lower(), username=user.username.lower(), zcash_account=zcash_account, zcash_address=zcash_address, zcash_transparent_address=zcash_transparent_address, hashed_password=hashed_password, balance=zcash_transparent_balance)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_id_from_username(db: Session, username: str):
    id = db.query(models.User.id).filter(models.User.username == username).scalar()
    return id

def get_p2p_chat_history(db: Session, sender_id: int, receiver_id: int):
    chat_history = db.query(models.Message).filter(
        (models.Message.sender_id == sender_id) & (models.Message.receiver_id == receiver_id) |
        (models.Message.sender_id == receiver_id) & (models.Message.receiver_id == sender_id)
    ).order_by(models.Message.timestamp).all()
    
    return chat_history

def send_zec_funds(db:Session, message_data: schemas.MessageCreate):
    user:models.User = get_user_by_username(db=db, username=message_data.receiver)
    try:
        zcash_wallet.send_to_address(address=user.zcash_transparent_address, amount=message_data.transaction)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def send_transaction():
    pass

def get_latest_message_with_user(db: Session, current_user_id: int, other_user_id: int):
    # Fetch chat history between current user and other user
    chat_history = db.query(models.Message).filter(
        ((models.Message.sender_id == current_user_id) & (models.Message.receiver_id == other_user_id)) |
        ((models.Message.sender_id == other_user_id) & (models.Message.receiver_id == current_user_id))
    ).order_by(models.Message.timestamp.desc()).all()  # Order by timestamp descending

    return chat_history[0] if chat_history else None  # Return the latest message or None

# Generate or load the encryption key (for demonstration, this key is generated once)
# key = Fernet.generate_key()

# Read the key from the file
with open(key_file_path, "rb") as key_file:
    key = key_file.read()

cipher = Fernet(key)

# Proceed with encryption and decryption as before


def encrypt_message(message: str|None) -> str:
    if message:
        encrypted_message = cipher.encrypt(message.encode('utf-8'))
        return encrypted_message.decode('utf-8')
    return None

def decrypt_message(encrypted_message: str|None) -> str:
    if encrypted_message:
        decrypted_message = cipher.decrypt(encrypted_message.encode('utf-8'))
        return decrypted_message.decode('utf-8')
    return None

def hash_message(message: str|None) -> str:
    # Convert the message to bytes and generate a SHA-256 hash
    if message:
        return hashlib.sha256(message.encode('utf-8')).hexdigest()
    return None

def verify_hash(message: str, hash_value: str) -> bool:
    """Verify the hash of the decrypted message."""
    return hash_message(message) == hash_value

def decrypt_chat_history(chat_history: List[dict]) -> List[dict]:
    decrypted_history = []
    # decrypted_message = decrypt_message("4c59ce35aee1dc138819828669e5e024d4a1af156eadb734a7ab014ca7d96c18")  
    
    for message in chat_history:
        # Decrypt only if the message content is encrypted 
        decrypted_message = decrypt_message(message.message)
        if not verify_hash(message=decrypted_message, hash_value=message.message_hash):
            decrypted_message = f"{decrypted_message} (integrity compromised)"
        
        decrypted_history.append({
            'id': message.id,
            'sender_id': message.sender_id,
            'receiver_id': message.receiver_id,
            'message': decrypted_message,
            'transaction': message.transaction,
            'timestamp': message.timestamp.strftime("%H:%M")
        })
    
    # return decrypted_history
    return decrypted_history

def create_message(db: Session, sender_id: int, receiver_id: int, message: str|None, transaction: int|float|None):
    encrypted_message = encrypt_message(message=message)
    message_hash = hash_message(message=message)
    new_message = models.Message(sender_id=sender_id, receiver_id=receiver_id, message= encrypted_message, message_hash=message_hash, transaction=transaction)
    db.add(new_message)
    db.commit()

    return new_message


# def create_message(db: Session, user: schemas.MessageCreate):
#     hashed_password = auth.get_password_hash(user.password)
#     # cleaners.validate_eth_address(user.wallet_address)
#     db_user = models.User(email=user.email.lower(), username=user.username.lower(), wallet_address=user.wallet_address, hashed_password=hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()

# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.model_dump(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item