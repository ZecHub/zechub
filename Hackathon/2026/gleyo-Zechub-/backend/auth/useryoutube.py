from backend.utils.instance import db
from datetime import datetime

class UserYouTube(db.Model):
    __tablename__ = 'user_youtube'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # action = "connected" or "disconnected"
    action = db.Column(db.String(50), nullable=False)

    # YouTube user info
    youtube_user_id = db.Column(db.String(255), nullable=False)
    youtube_handle = db.Column(db.String(255), nullable=False)

    # OAuth tokens
    access_token = db.Column(db.String(500), nullable=True)
    refresh_token = db.Column(db.String(500), nullable=True)
    token_type = db.Column(db.String(50), nullable=True)
    expires_at = db.Column(db.DateTime, nullable=True)  # when the token expires

    # When this connection event happened
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<UserYouTube {self.youtube_handle} ({self.action}) at {self.timestamp}>"
