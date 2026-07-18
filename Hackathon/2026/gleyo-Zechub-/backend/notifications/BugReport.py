from backend.utils.instance import db
from datetime import datetime

class BugReport(db.Model):
    __tablename__ = "bug_reports"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    screenshot_path = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('bug_reports', cascade='all, delete-orphan'))

    def __repr__(self):
        return f"<BugReport id={self.id} user_id={self.user_id}>"
