from datetime import datetime
from backend.utils.instance import db
from flask_login import UserMixin

class UserTikTok(db.Model):
    __tablename__ = "user_tiktok"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    open_id = db.Column(db.String(255), unique=True, nullable=False)
    nickname = db.Column(db.String(255), nullable=True)
    access_token = db.Column(db.String(500), nullable=True)
    refresh_token = db.Column(db.String(500), nullable=True)
    token_type = db.Column(db.String(50), nullable=True)
    expires_at = db.Column(db.DateTime, nullable=True)
    action = db.Column(db.String(50), default="connected")  # connected/disconnected
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<UserTikTok {self.nickname} ({self.open_id})>"
