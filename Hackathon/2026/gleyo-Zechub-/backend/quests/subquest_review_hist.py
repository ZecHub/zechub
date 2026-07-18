
from backend.utils.instance import db
import uuid
from sqlalchemy.sql import func
from datetime import datetime, timedelta
class TaskReviewHistory(db.Model):
    __tablename__ = "task_review_history"

    id = db.Column(db.Integer, primary_key=True)
    task_review_id = db.Column(db.Integer, db.ForeignKey("task_reviews.id", ondelete="CASCADE"), nullable=False)
    reviewer_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"))
    comment = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    stars = db.Column(db.Boolean, nullable=False, default=False)
    free_xp = db.Column(db.Integer, default=0)
    flag = db.Column(db.Boolean, default=False)
    reviewer = db.relationship("Users", backref="review_histories")
    task_review = db.relationship("TaskReview", backref=db.backref("history", cascade="all, delete"))