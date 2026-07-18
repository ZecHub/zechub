from backend.utils.instance import db
from datetime import datetime

class SubquestCooldown(db.Model):
    __tablename__ = "subquest_cooldown"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("Users", back_populates="subquest_cooldowns")

    subquest_id = db.Column(db.Integer, db.ForeignKey("subquest.id"), nullable=False)
    subquest = db.relationship("Subquest", back_populates="cooldowns")

    task_attempt_id = db.Column(db.Integer, db.ForeignKey("task_attempt_history.id"), nullable=True)
    task_attempt = db.relationship("TaskAttemptHistory", back_populates="cooldowns")


    subquest_completion_id = db.Column(db.Integer, db.ForeignKey("subquest_completion.id"), nullable=True)
    subquest_completion = db.relationship("SubquestCompletion", back_populates="cooldowns")

    cooldown_until = db.Column(db.DateTime(timezone=True), nullable=True)
    is_no_retry = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
