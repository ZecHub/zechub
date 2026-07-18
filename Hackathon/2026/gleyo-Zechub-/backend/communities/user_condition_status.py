from backend.utils.instance import db
from datetime import datetime

class UserConditionStatus(db.Model):
    __tablename__ = "user_condition_status"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    subquest_id = db.Column(db.Integer, db.ForeignKey("subquest.id", ondelete="CASCADE"), nullable=False)
    condition_id = db.Column(db.Integer, db.ForeignKey("subquest_condition.id", ondelete="CASCADE"), nullable=False)
    condition = db.relationship("SubquestCondition", back_populates="user_statuses")

    condition_type = db.Column(db.String(50), nullable=False)
    met = db.Column(db.Boolean, nullable=False, default=False)
    last_checked = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint("user_id", "condition_id", name="uq_user_condition_unique"),
    )

    def __repr__(self):
        return f"<UserConditionStatus user={self.user_id} cond={self.condition_type} met={self.met}>"
