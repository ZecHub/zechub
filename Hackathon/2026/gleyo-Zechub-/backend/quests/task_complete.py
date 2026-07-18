from backend.utils.instance import db
from sqlalchemy.sql import func
from datetime import datetime



class TaskCompletion(db.Model):
    __tablename__ = "task_completion"

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey("task.id"), nullable=False)
    subquest_completion_id = db.Column(db.Integer, db.ForeignKey("subquest_completion.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Track reward earned for this task
    reward_id = db.Column(db.Integer, db.ForeignKey("subquest_reward.id"), nullable=True)
    reward_claimed = db.Column(db.Boolean, default=False)
    reward_data = db.Column(db.JSON, nullable=True)   
    user_input = db.Column(db.JSON, nullable=True) 

    status = db.Column(db.String(50), default="pending")  
    completed_at = db.Column(db.DateTime, nullable=True)

    # Relationships
    task = db.relationship("Task")
    subquest_completion = db.relationship("SubquestCompletion", back_populates="task_completions")
    user = db.relationship("Users")
    reward = db.relationship("SubquestReward")