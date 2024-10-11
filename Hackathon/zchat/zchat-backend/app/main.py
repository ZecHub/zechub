import uuid

from fastapi import Depends, FastAPI, HTTPException, status, Query, Cookie, WebSocket, WebSocketException, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
    
from sqlalchemy.orm import Session
from typing import List, Annotated, Optional

from . import auth, crud, models, schemas, cleaners
from .database import SessionLocal, engine

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000", "https://zchat-frontend.vercel.app" # React development server
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
def read_users_me(current_user: schemas.UserCreate = Depends(get_current_user)):
    return current_user

@app.post("/register/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # cleaners.validate_email(db, email=user.email)
    # cleaners.validate_username(db, username=user.username)
    # cleaners.validate_password(db, password=user.password)
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

@app.get("/messages/{sender}/{receiver}")
def get_chat_history(sender: str, receiver: str, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    if not current_user:
        return {}
    sender_id = crud.get_user_id_from_username(db=db, username=sender)
    receiver_id = crud.get_user_id_from_username(db=db, username=receiver)

    if not sender_id or not receiver_id:
        raise HTTPException(status_code=404, detail="Sender or receiver not found")
    
    chat_history = crud.get_p2p_chat_history(db=db, sender_id=sender_id, receiver_id=receiver_id)
    decrypted_chat_history = crud.decrypt_chat_history(chat_history)
    
    # return chat_history
    return decrypted_chat_history

@app.get("/users/latest-messages/{current_user_id}", response_model=List[schemas.UserWithMessage])
def read_users_with_latest_messages(current_user_id: int, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    if not current_user:
        return {}
    users = db.query(models.User).filter(models.User.id != current_user_id).all()  # Fetch all users except current user
    users_with_messages = []

    for user in users:
        latest_message = crud.get_latest_message_with_user(db, current_user_id, user.id)
        try:
            users_with_messages.append({
                "username": user.username,
                "latest_message": crud.decrypt_message(latest_message.message),
                "transaction": latest_message.transaction
            })
        except:
            if latest_message:
                users_with_messages.append({
                    "username": user.username,
                    "latest_message": None,
                    "transaction": latest_message.transaction
                })
            users_with_messages.append({
                "username": user.username,
                "latest_message": None,
                "transaction": None
            })
    
    # return chat_history
    return users_with_messages

# Extracted logic to save messages
def save_message_logic(message_data: schemas.MessageCreate, db: Session):
    sender_id = crud.get_user_id_from_username(db=db, username=message_data.sender)
    receiver_id = crud.get_user_id_from_username(db=db, username=message_data.receiver)

    if not sender_id or not receiver_id:
        raise HTTPException(status_code=400, detail="Sender or receiver not found")

    if not message_data.transaction:
        crud.create_message(db=db, sender_id=sender_id, receiver_id=receiver_id, message=message_data.message, transaction=None)

    elif message_data.transaction:
        # crud.send_zec_funds(db=db, message_data=message_data)
        crud.create_message(db=db, sender_id=sender_id, receiver_id=receiver_id, message=message_data.message, transaction=message_data.transaction)

    return {"message": "Message saved successfully"}

@app.post("/messages/")
def save_message(message_data: schemas.MessageCreate, db: Session = Depends(get_db)):
    return save_message_logic(message_data, db)

# @app.post("/users/{user_id}/items/", response_model=schemas.Item)
# def create_item_for_user(user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)):
#     return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.post("/zcash/send-to-address/")
def z_cash_send_to_address(message_data: schemas.MessageCreate, db: Session = Depends(get_db)):
    # Reusing the same logic from the /messages/ endpoint to save the message
    save_message_logic(message_data, db)

    # If there's other Zcash-specific logic, you can add it here
    return {"message": "Zcash transaction processed and message saved"}


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


class PrivateConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.user_connections = {}

    async def connect(self, websocket: WebSocket, id: int):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.user_connections[id] = websocket

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        for user, ws in self.user_connections.items():
            if ws == websocket:
                del self.user_connections[user]
                break

    async def send_personal_message_from(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast_to(self, sender_id: int, message: str):
        formatted_message = f"{sender_id}: {message}"
        for id, connection in self.user_connections.items():
            if id != sender_id:  # Exclude the sender
                await connection.send_text(formatted_message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


private_manager = PrivateConnectionManager()

@app.get("/client_id")
async def get_client_id():
    return {"client_id": str(uuid.uuid4())}


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")


@app.websocket("/ws/private/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await private_manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            await private_manager.send_personal_message_from(f"{client_id}: {data}", websocket)
            try:
                await private_manager.broadcast_to(sender_id=client_id, message=f"{data}")
            except:
                pass
    except WebSocketDisconnect:
        private_manager.disconnect(websocket)
        # await private_manager.broadcast(f"Client #{client_id} left the chat")

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