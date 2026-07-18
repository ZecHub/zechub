from backend.utils.instance import db
from datetime import datetime

class UserTwitter(db.Model):
    __tablename__ = 'user_twitter'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # action = "connected" or "disconnected"
    action = db.Column(db.String(50), nullable=False)

    # Twitter username
    xusername = db.Column(db.String(255), nullable=False)

    twitter_user_id = db.Column(db.String(50), nullable=False)

    access_token = db.Column(db.String(500), nullable=True)
    access_token_secret = db.Column(db.String(500), nullable=True)  
    refresh_token = db.Column(db.String(500), nullable=True)
    token_type = db.Column(db.String(50), nullable=True)  # "bearer", etc.
    last_followers_count = db.Column(db.Integer, default=0)
    followers_last_checked = db.Column(db.DateTime, default=datetime.utcnow)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<UserTwitter {self.xusername} ({self.action}) at {self.timestamp}>"
