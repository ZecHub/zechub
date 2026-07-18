from backend.utils.instance import db
from datetime import datetime
import uuid
from sqlalchemy import UniqueConstraint


class CommunityChannel(db.Model):
    __tablename__ = "community_channels"

    id = db.Column(db.Integer, primary_key=True)

    uuid = db.Column(
        db.String(36),
        unique=True,
        nullable=False,
        default=lambda: str(uuid.uuid4())
    )

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False
    )

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("community_categories.id", ondelete="SET NULL"),
        nullable=True
    )


    created_by_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )

    name = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(255), nullable=True)

    is_private = db.Column(db.Boolean, default=False)
    is_quest_alert = db.Column(db.Boolean, default=False)

    slowmode_seconds = db.Column(db.Integer, default=0)

    position = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    community = db.relationship("Community", backref="channels")

    category = db.relationship(
        "CommunityCategory",
        back_populates="channels"
    )

    created_by = db.relationship("Users")

    messages = db.relationship(
        "CommunityMessage",
        back_populates="channel",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<CommunityChannel {self.name}>"





class ChannelAllowedRole(db.Model):
    __tablename__ = "channel_allowed_roles"

    id = db.Column(db.Integer, primary_key=True)

    channel_id = db.Column(
        db.Integer,
        db.ForeignKey("community_channels.id", ondelete="CASCADE"),
        nullable=False
    )

    role = db.Column(db.String(20), nullable=False)

    channel = db.relationship(
        "CommunityChannel",
        backref=db.backref("allowed_roles", cascade="all, delete-orphan")
    )
