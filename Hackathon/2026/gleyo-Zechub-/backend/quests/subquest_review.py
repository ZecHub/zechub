from datetime import datetime 
from backend.utils.instance import db 
from sqlalchemy import func
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import JSON

class TaskReview(db.Model):
    __tablename__ = "task_reviews"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user = db.relationship(
        "Users",
        foreign_keys=[user_id],
        backref=db.backref("task_reviews", cascade="all, delete")
    )

    reviewed_by = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"))
    reviewer = db.relationship(
        "Users",
        foreign_keys=[reviewed_by],
        backref=db.backref("reviews_made", cascade="all, delete")

    )

    subquest_completion_id = db.Column(
        db.Integer,
        db.ForeignKey("subquest_completion.id", ondelete="CASCADE"),
        nullable=False
    )
    subquest_completion = db.relationship(
        "SubquestCompletion",
        backref=db.backref("reviews", cascade="all, delete")
    )

    user_name = db.Column(db.String(100), nullable=True)
    stars = db.Column(db.Integer, nullable=True)
    free_xp = db.Column(db.Integer, default=0)
    pending_reward = db.Column(MutableList.as_mutable(JSON), nullable=True, default=list)
    comment = db.Column(db.Text, nullable=True)
    flag = db.Column(db.Boolean, default=False)
    review_status = db.Column(db.String(20), default="pending")

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    def __repr__(self):
        return f"<TaskReview user={self.user_id} reviewed_by={self.reviewed_by} status={self.review_status}>"
