from backend.utils.instance import db
from sqlalchemy.sql import func
from datetime import datetime

class UserXP(db.Model):
    __tablename__ = "user_xp"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("Users", back_populates="xp_logs")

    completion_id = db.Column(db.Integer, db.ForeignKey("subquest_completion.id"), nullable=True)
    completion = db.relationship("SubquestCompletion", back_populates="xp_rewards")

    # XP amount
    amount = db.Column(db.Integer, nullable=False)
    bonus_xp_reward = db.Column(db.Integer, nullable=True)


    reason = db.Column(db.String(255), nullable=True)

    # Timestamp
    created_at = db.Column(db.DateTime, server_default=func.now())

    def __repr__(self):
        return f"<UserXP user={self.user_id} +{self.amount}>"
