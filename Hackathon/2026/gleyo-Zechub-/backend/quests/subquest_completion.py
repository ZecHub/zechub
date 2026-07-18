from backend.utils.instance import db
from sqlalchemy.sql import func
from datetime import datetime, timedelta
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import JSON

class SubquestCompletion(db.Model):
    __tablename__ = "subquest_completion"

    id = db.Column(db.Integer, primary_key=True)

    # Link to subquest
    subquest_id = db.Column(db.Integer, db.ForeignKey("subquest.id"), nullable=False)
    subquest = db.relationship("Subquest", back_populates="completions")
    
    # Link to user
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("Users", back_populates="subquest_completions")

    # Completion status
    status = db.Column(
        db.String(20),
        nullable=False,
        default="pending"
    )  

    review_note = db.Column(db.Text, nullable=True)
    attempts = db.Column(db.Integer, nullable=False, default=0)      
    success_count = db.Column(db.Integer, nullable=False, default=0) 
    started_at = db.Column(db.DateTime, server_default=func.now())
    completed_at = db.Column(db.DateTime, nullable=True)
    reviewed_at = db.Column(db.DateTime, nullable=True)
    failed_tasks = db.Column(db.JSON, nullable=True, default=dict)
    successful_tasks = db.Column(db.JSON, nullable=True, default=dict)
    assigned_rewards = db.Column(MutableList.as_mutable(JSON), nullable=True, default=list)
    task_attempt_histories = db.relationship("TaskAttemptHistory", back_populates="subquest_completion", cascade="all, delete")
    xp_rewards = db.relationship("UserXP", back_populates="completion", cascade="all, delete")

    task_completions = db.relationship(
        "TaskCompletion", 
        back_populates="subquest_completion", 
        cascade="all, delete"
    )


    cooldowns = db.relationship(
        "SubquestCooldown",
        back_populates="subquest_completion",
        cascade="all, delete"
    )
    def is_active_for_recurrence(self, recurrence: str) -> bool:
            """Returns True if user has already completed this subquest for the current recurrence period."""
            if self.status != "success" or not self.completed_at:
                return False

            now = datetime.utcnow()

            if recurrence == "Daily":
                return self.completed_at.date() == now.date()

            elif recurrence == "Weekly":
                # Sunday 12:00AM UTC is the start of the week
                last_sunday = now - timedelta(days=now.weekday() + 1)  # Sunday
                return self.completed_at.date() > last_sunday.date()

            elif recurrence == "Monthly":
                return self.completed_at.year == now.year and self.completed_at.month == now.month

            return True 
    def __repr__(self):
        return f"<SubquestCompletion user={self.user_id} subquest={self.subquest_id} status={self.status}>"

