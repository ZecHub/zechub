from datetime import datetime
from backend.utils.instance import db

class CommunityOnlineStatus(db.Model):
    __tablename__ = 'community_online_status'
    id = db.Column(db.Integer, primary_key=True)
    
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), unique=True, nullable=False)
    community = db.relationship('Community', back_populates='online_status')

    is_online = db.Column(db.Boolean, default=False, nullable=False)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        status = "Online" if self.is_online else "Offline"
        return f"<CommunityOnlineStatus {self.community.name}: {status}>"
