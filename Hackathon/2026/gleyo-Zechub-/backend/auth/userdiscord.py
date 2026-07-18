from backend.utils.instance import db
from datetime import datetime

class UserDiscord(db.Model):
    __tablename__ = 'user_discord'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # action = "connected" or "disconnected"
    action = db.Column(db.String(50), nullable=False)

    # Discord username (example: "NuceMe#1234")
    discord_username = db.Column(db.String(255), nullable=False)

    # Discord user ID (numeric ID from Discord API)
    discord_user_id = db.Column(db.String(50), nullable=False)

    # OAuth2 tokens
    access_token = db.Column(db.String(500), nullable=True)
    refresh_token = db.Column(db.String(500), nullable=True)
    token_type = db.Column(db.String(50), nullable=True)   # Bearer

    # When the action happened
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<UserDiscord {self.discord_username} ({self.action})>"
