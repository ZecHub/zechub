# community_models.py
from backend.utils.instance import db


class CommunitySecurity(db.Model):
    __tablename__ = 'community_security'
    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False, unique=True)

    community = db.relationship("Community", back_populates="security_settings")

    # Private Community
    private_community = db.Column(db.Boolean, default=False)  # Require invite to join

    # Invites
    xp_for_valid_invite = db.Column(db.Integer, default=1)   # XP needed for invite
    consume_invites = db.Column(db.Boolean, default=True)     

    # Guest Access Verification
    require_wallet = db.Column(db.Boolean, default=False)
    require_discord = db.Column(db.Boolean, default=False)
    require_twitter = db.Column(db.Boolean, default=False)
    require_youtube = db.Column(db.Boolean, default=False)
    require_telegram = db.Column(db.Boolean, default=False)
    require_github = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<CommunitySecurity for Community {self.community_id}>"