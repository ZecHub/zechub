from backend.utils.instance import db
from datetime import datetime


class CommunityNotificationSettings(db.Model):
    __tablename__ = "community_notification_settings"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    message_level = db.Column(
        db.Enum("all", "mentions", "none", name="community_message_level"),
        default="mentions",
        nullable=False
    )

    mute_until = db.Column(db.DateTime)
    mute_duration_seconds  = db.Column(
        db.String(16),  # "1h" | "1d" | "1w" | "until"
        nullable=True
    )

    allow_direct_messages = db.Column(db.Boolean, default=True, nullable=False)

    notify_new_quest = db.Column(db.Boolean, default=True)
    notify_reward_payout = db.Column(db.Boolean, default=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    user = db.relationship("Users", backref="community_notification_settings")
    community = db.relationship("Community", backref="notification_settings")

    __table_args__ = (
        db.UniqueConstraint("user_id", "community_id"),
    )

    @property
    def is_muted(self):
        return self.mute_until and self.mute_until > datetime.utcnow()






class CategoryNotificationSettings(db.Model):
    __tablename__ = "category_notification_settings"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("community_categories.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    notification_level = db.Column(
        db.Enum("all", "mentions", "none", name="category_message_level"),
        nullable=True  # inherit from community
    )

    is_muted = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    category = db.relationship("CommunityCategory")

    __table_args__ = (
        db.UniqueConstraint("user_id", "category_id"),
    )



class ChannelNotificationSettings(db.Model):
    __tablename__ = "channel_notification_settings"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    channel_id = db.Column(
        db.Integer,
        db.ForeignKey("community_channels.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    notification_level = db.Column(
        db.Enum("all", "mentions", "none", name="channel_message_level"),
        nullable=True  # inherit
    )

    is_muted = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    channel = db.relationship("CommunityChannel")

    __table_args__ = (
        db.UniqueConstraint("user_id", "channel_id"),
    )



class PushSubscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, index=True)
    endpoint = db.Column(db.Text, unique=True)
    p256dh = db.Column(db.Text)
    auth = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
