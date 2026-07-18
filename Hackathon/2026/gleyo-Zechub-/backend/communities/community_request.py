from datetime import datetime
from backend.utils.instance import db
from sqlalchemy import Column, Integer, String, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base


class CommunityRequest(db.Model):
    __tablename__ = "community_requests"
    id = db.Column(db.Integer, primary_key=True)
    from_community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
    to_community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)


    from_community_name = db.Column(db.String(255), nullable=True)
    to_community_name = db.Column(db.String(255), nullable=True)
    has_ever_shown = db.Column(db.Boolean, default=False)
    accepted_at = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), default="pending", nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    from_community = db.relationship("Community", foreign_keys=[from_community_id], backref="requests_sent")
    to_community = db.relationship("Community", foreign_keys=[to_community_id], backref="requests_received")

    __table_args__ = (
        db.UniqueConstraint('from_community_id', 'to_community_id', name='unique_request_pair'),
    )

    def __repr__(self):
        return f"<CommunityRequest from={self.from_community_id} to={self.to_community_id} status={self.status}>" 
