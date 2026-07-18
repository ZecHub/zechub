from backend.utils.instance import db
from sqlalchemy.sql import func
from datetime import datetime


class SubquestReward(db.Model):
    __tablename__ = "subquest_reward"

    id = db.Column(db.Integer, primary_key=True)
    subquest_id = db.Column(db.Integer, db.ForeignKey("subquest.id"), nullable=False)
    subquest = db.relationship("Subquest", back_populates="rewards")

    reward_type = db.Column(db.String(50), nullable=False)  
    distribution_type = db.Column(db.String(50), nullable=False, default="ALL")   
    reward_data = db.Column(db.Text, nullable=True) 
    claim_count = db.Column(db.Integer, nullable=True, default=None)

    created_at = db.Column(db.DateTime, server_default=func.now())
    
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Reward {self.reward_type} ({self.distribution_type})>"
