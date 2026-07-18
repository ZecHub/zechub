from datetime import datetime
from backend.utils.instance import db

class UserSession(db.Model):
    __tablename__ = "user_sessions"
    id = db.Column(db.Integer, primary_key=True)
    session_uuid = db.Column(db.String(36), unique=True, index=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ip_address = db.Column(db.String(45))      # IPv4/IPv6
    user_agent = db.Column(db.String(256))
    login_time = db.Column(db.DateTime, default=datetime.utcnow)
    device = db.Column(db.String(256))
    location = db.Column(db.String(256))

    # New fields
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    is_online = db.Column(db.Boolean, default=True)

    # Relationship back to user
    user = db.relationship("Users", backref="sessions")
