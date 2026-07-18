from datetime import datetime
from backend.utils.instance import db
import uuid

class Quest(db.Model):
    __tablename__ = 'quest'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))

    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    color = db.Column(db.String(20))
    cover_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # One Quest has many Subquests
    subquests = db.relationship('Subquest', back_populates='quest', cascade='all, delete')

    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
    community = db.relationship('Community', back_populates='quests')

    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    creator = db.relationship('Users', backref='quests_created')

    sprint_id = db.Column(db.Integer, db.ForeignKey('sprints.id'))
    sprint = db.relationship('Sprint', backref='quests')

    def __repr__(self):
        return f"<Quest {self.title}>"
 