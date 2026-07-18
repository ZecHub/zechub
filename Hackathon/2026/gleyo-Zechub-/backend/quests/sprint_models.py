from backend.utils.instance import db
import uuid
from datetime import datetime
class Sprint(db.Model):
    __tablename__ = 'sprints'
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))

    title = db.Column(db.String(120))
    start_date = db.Column(db.DateTime)   
    end_date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    rewards = db.Column(db.String(100))
    end_zone = db.Column(db.String(50))
    color = db.Column(db.String(20))
    distribution = db.Column(db.String(100))
    created_by_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    creator = db.relationship('Users', back_populates='sprints_created')

    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    community = db.relationship('Community', backref='sprints')

    def __repr__(self):
        return f"<Sprint {self.title}>"
