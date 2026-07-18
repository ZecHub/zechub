from backend.utils.instance import db
from sqlalchemy.sql import func
from datetime import datetime


class ResetTracker(db.Model):
    __tablename__ = "reset_tracker"

    id = db.Column(db.Integer, primary_key=True)
    last_reset_at = db.Column(db.DateTime, nullable=True)  
    

    def __repr__(self):
        return f"<ResetTracker last_reset_at={self.last_reset_at}>"
