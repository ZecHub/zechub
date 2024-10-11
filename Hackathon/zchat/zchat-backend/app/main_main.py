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
    "http://localhost:3000",  # React development server
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
def authenticate_user(db: Session, email: str, password: str):
    user = crud.get_user_by_email(db, email)
    if not user:
        return False
    if not auth.verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, auth.SECRET_KEY, algorithm=auth.ALGORITHM)
        return encoded_jwt
    

def get_current_user(db: Session = Depends(get_db), token: str = Depends(auth.oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM]) # This throws an error when token has expired
    print(payload)
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
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
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


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections[username] = websocket

    def disconnect(self, username: str):
        if username in self.active_connections:
            del self.active_connections[username]

    async def send_personal_message(self, message: str, username: str):
        if username in self.active_connections:
            websocket = self.active_connections[username]
            await websocket.send_text(message)

    async def broadcast(self, message: str):
        for websocket in self.active_connections.values():
            await websocket.send_text(message)


manager = ConnectionManager()

@app.websocket("/ws/chat/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str, current_user: schemas.User = Depends(get_current_user)):
    await manager.connect(websocket, username)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast message to all connections
            await manager.broadcast(f"{username}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(username)

async def get_cookie_or_token(
    websocket: WebSocket,
    session: Annotated[str | None, Cookie()] = None,
    token: Annotated[str | None, Query()] = None,
):
    if session is None and token is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)
    return session or token


@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket, token: Optional[str] = Query(None)):
    if token is None:
        await websocket.close(code=1008)  # Close with policy violation code
        return
    
    try:
        # Validate token and get the current user
        user = get_current_user(token=token)  # Make sure to pass token as an argument
    except HTTPException:
        await websocket.close(code=1008)  # Close with policy violation code
        return
    
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Sent by: {user}, Message text was: {data}")
    except WebSocketDisconnect as e:
        print(f"WebSocket disconnected with code: {e.code}, reason: {e.reason}")


@app.websocket("/items/{item_id}/ws")
async def websocket_endpoint(
    *,
    websocket: WebSocket,
    item_id: str,
    db: Session = Depends(get_db),
    token: str = Depends(auth.oauth2_scheme),
):
    # user = get_current_user(db, token)
    # print(user)
    # await websocket.accept()
    # # while True:
    # #     data = await websocket.receive_text()
    # #     await websocket.send_text(
    # #         f"Session cookie or query token value is: {cookie_or_token}"
    # #     )
    # #     if q is not None:
    # #         await websocket.send_text(f"Query parameter q is: {q}")
    # #     await websocket.send_text(f"Message text was: {data}, for item ID: {item_id}")
    # try:
    #     while True:
    #         data = await websocket.receive_text()
    #         # Instead of echoing back, handle the message as needed
    #         response_message = f"Received from {user.username}: {data}"
    #         # You can remove or modify this line as needed to avoid double sending
    #         # await websocket.send_text(f"You: {data}")
    #         await websocket.send_text(response_message)
    # except WebSocketDisconnect:
    #     print(f"Connection closed for {item_id}")
    pass        