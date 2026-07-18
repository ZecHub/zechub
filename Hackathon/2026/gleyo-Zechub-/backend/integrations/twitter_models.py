from backend.utils.instance import db
from datetime import datetime
from backend.communities.community_models import Community

class CommunityTwitter(db.Model):
    __tablename__ = 'community_twitter'

    id = db.Column(db.Integer, primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)

    action = db.Column(db.String(50), nullable=False)

    # Twitter username
    xusername = db.Column(db.String(255), nullable=False)

    # Twitter user ID (numeric ID from Twitter API)
    twitter_user_id = db.Column(db.String(50), nullable=False)

    # OAuth tokens (some users may only use OAuth2)
    access_token = db.Column(db.String(500), nullable=True)
    access_token_secret = db.Column(db.String(500), nullable=True)   
    refresh_token = db.Column(db.String(500), nullable=True)
    token_type = db.Column(db.String(50), nullable=True)  # "bearer"

    # When this event happened
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    # --- Link to Community ---
    community = db.relationship(
        "Community",
        back_populates="twitter_account",
        uselist=False
    )

    def __repr__(self):
        return f"<CommunityTwitter {self.xusername} ({self.action}) at {self.timestamp}>"

