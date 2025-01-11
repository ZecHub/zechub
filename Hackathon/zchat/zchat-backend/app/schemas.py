from pydantic import BaseModel, ConfigDict
from typing import List, Optional
import datetime

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    zcash_account: int
    zcash_address: str
    zcash_transparent_address: str
    balance: str
    # encrypted_messages: List[str] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class WalletAuth(BaseModel):
    wallet_address: str
    signature: str

class MessageBase(BaseModel):
    sender: str
    receiver: str
    message: str | None
    transaction: float | None | int

    # Configuration for Pydantic
    model_config = ConfigDict(arbitrary_types_allowed=True)

class MessageCreate(MessageBase):
    pass

class MessageUpdate(BaseModel):
    message: Optional[str] = None

    # Configuration for Pydantic
    model_config = ConfigDict(arbitrary_types_allowed=True)

class MessageInDBBase(MessageBase):
    id: int
    timestamp: datetime.datetime = None

    # Pydantic configuration
    # model_config = ConfigDict(arbitrary_types_allowed=True, from_attributes=True)

    class Config:
        from_attributes = True

class Message(MessageInDBBase):
    pass

class MessageInDB(MessageInDBBase):
    pass

class Transaction(BaseModel):
    address: str
    amount: float

class UserWithMessage(BaseModel):
    username: str
    latest_message: Optional[str]  # Can be None if there's no message
    transaction: float|int|None  # Can be None if there's no message

    class Config:
        from_attributes = True  # This allows compatibility with SQLAlchemy models