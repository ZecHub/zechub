from backend.utils.instance import db 
from datetime import datetime
from sqlalchemy import func


class SubquestCondition(db.Model):
    __tablename__ = "subquest_condition"

    id = db.Column(db.Integer, primary_key=True)
    subquest_id = db.Column(db.Integer, db.ForeignKey("subquest.id"), nullable=False)
    subquest = db.relationship("Subquest", back_populates="conditions")
    subquest_uuid = db.Column(db.String(36), nullable=True)
    condition_type = db.Column(db.String(50), nullable=False)

    condition_value = db.Column(db.Text, nullable=True)

    operator = db.Column(db.String(10), nullable=True)

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    user_statuses = db.relationship(
        "UserConditionStatus",
        back_populates="condition",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Condition {self.condition_type}: {self.condition_value}>"