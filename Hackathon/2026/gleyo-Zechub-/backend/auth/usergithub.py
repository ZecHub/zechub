from backend.utils.instance import db
from datetime import datetime

class UserGithub(db.Model):
    __tablename__ = "user_github"

    id              = db.Column(db.Integer, primary_key=True)
    user_id         = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    github_user_id  = db.Column(db.String(64), nullable=False)
    github_username = db.Column(db.String(128))
    github_email    = db.Column(db.String(256))
    github_avatar   = db.Column(db.String(512))
    github_profile  = db.Column(db.String(256))  
    access_token    = db.Column(db.Text)               
    token_type      = db.Column(db.String(32))
    scope           = db.Column(db.String(256))     
    action          = db.Column(db.String(32), default="connected")
    timestamp       = db.Column(db.DateTime, default=datetime.utcnow)