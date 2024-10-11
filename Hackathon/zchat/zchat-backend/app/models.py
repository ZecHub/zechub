from pydantic import BaseModel
from typing import List
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, JSON, Text, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    zcash_account = Column(Integer, primary_key=False)
    zcash_address = Column(String, unique=True, index=True)
    zcash_transparent_address = Column(String, unique=True, index=True)
    balance = Column(String, unique=False, index=True)

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey('users.id'))
    receiver_id = Column(Integer, ForeignKey('users.id'))
    message = Column(Text, nullable=True)
    message_hash = Column(String, default=None, nullable=True) 
    timestamp = Column(DateTime, default=datetime.now)
    transaction = Column(Float, nullable=True)

    sender = relationship("User", foreign_keys=[sender_id])
    receiver = relationship("User", foreign_keys=[receiver_id])
