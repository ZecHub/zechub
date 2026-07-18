from datetime import datetime 
from backend.utils.instance import db 


class CommunityInviteTask(db.Model):
    __tablename__ = "community_invite_tasks"

    id = db.Column(db.Integer, primary_key=True)
    community_invite_log_id = db.Column(db.Integer, db.ForeignKey("community_invite_logs.id"), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey("task.id"), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="pending")  # pending, active, consumed
    completed_at = db.Column(db.DateTime, nullable=True)

    # Relationships
    invite_log = db.relationship("CommunityInviteLog", back_populates="invite_tasks")
    task = db.relationship("Task")

    def __repr__(self):
        return (
            f"<CommunityInviteTask id={self.id} "
        )
