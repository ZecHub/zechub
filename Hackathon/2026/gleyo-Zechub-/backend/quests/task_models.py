from backend.utils.instance import db
from datetime import datetime
class Task(db.Model):
    __tablename__ = "task"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)  # quiz, poll, twitter, etc.
    config = db.Column(db.JSON, nullable=True, default={})  # works on both SQLite + Postgres

    subquest_id = db.Column(db.Integer, db.ForeignKey("subquest.id"), nullable=False)
    subquest = db.relationship("Subquest", back_populates="tasks")
    attempt_histories = db.relationship("TaskAttemptHistory", back_populates="task", cascade="all, delete")

    @property
    def quest_uuid(self):
        return self.subquest.quest.uuid if self.subquest and self.subquest.quest else None
    
    def __repr__(self):
        return f"<Task {self.type}>"



class PreviewTaskState(db.Model):
    __tablename__ = "preview_task_state"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, index=True)
    type = db.Column(db.String(50), nullable=False)  # quiz, poll, twitter, etc.
    config = db.Column(db.JSON, nullable=True, default={}) 
    subquest_uuid = db.Column(db.String(64), index=True)
    state = db.Column(db.JSON)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)