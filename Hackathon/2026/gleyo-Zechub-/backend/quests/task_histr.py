from datetime import datetime
from backend.utils.instance import db

class TaskAttemptHistory(db.Model):
    __tablename__ = "task_attempt_history"

    id = db.Column(db.Integer, primary_key=True)

    task_id = db.Column(db.Integer, db.ForeignKey("task.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Optional: link to subquest run (so you can group attempts by attempt session)
    subquest_completion_id = db.Column(db.Integer, db.ForeignKey("subquest_completion.id"), nullable=True)

    status = db.Column(db.String(20), nullable=False)  
    user_input = db.Column(db.JSON, nullable=True)    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    task = db.relationship("Task", back_populates="attempt_histories")
    user = db.relationship("Users", back_populates="task_attempt_histories")
    subquest_completion = db.relationship("SubquestCompletion", back_populates="task_attempt_histories")
    cooldowns = db.relationship(
        "SubquestCooldown",
        back_populates="task_attempt",
        cascade="all, delete"
    )
    def __repr__(self):
        return f"<TaskAttemptHistory task={self.task_id} user={self.user_id} status={self.status}>"
