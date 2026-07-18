from backend.utils.instance import db
from datetime import datetime

class UserCommunitySettings(db.Model):
    __tablename__ = "user_community_settings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),  
        nullable=False
    )
    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),  
        nullable=False
    )

    theme_mode = db.Column(db.String(10), default="light")  # light or dark
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship(
        "Users",
        backref=db.backref("community_settings", cascade="all, delete-orphan", passive_deletes=True)
    )
    community = db.relationship(
        "Community",
        backref=db.backref("user_settings", cascade="all, delete-orphan", passive_deletes=True)
    )

    __table_args__ = (
        db.UniqueConstraint("user_id", "community_id", name="uq_user_community"),
    )
