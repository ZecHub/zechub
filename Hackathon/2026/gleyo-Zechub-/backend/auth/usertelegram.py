from backend.utils.instance import db
from datetime import datetime

class UserTelegram(db.Model):
    __tablename__ = 'user_telegram'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    action = db.Column(db.String(50), nullable=False)  # "connected" or "disconnected"

    tusername = db.Column(db.String(255), nullable=True)
    telegram_user_id = db.Column(db.String(50), nullable=False)

    phone_number = db.Column(db.String(20), nullable=True, unique=True)
    is_member = db.Column(db.Boolean, default=False)

    auth_date = db.Column(db.DateTime, nullable=True)
    hash = db.Column(db.String(500), nullable=True)  
    photo_url = db.Column(db.String(500), nullable=True)  

    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<UserTelegram {self.tusername or self.telegram_user_id} ({self.action})>"
