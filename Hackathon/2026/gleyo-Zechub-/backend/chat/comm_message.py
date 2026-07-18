from backend.utils.instance import db
from datetime import datetime
import uuid

class CommunityMessage(db.Model):
    __tablename__ = "community_messages"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, default=lambda: str(uuid.uuid4()))

    channel_id = db.Column(
        db.Integer,
        db.ForeignKey("community_channels.id", ondelete="CASCADE"),
        nullable=True
    )
    ticket_id = db.Column(
        db.Integer,
        db.ForeignKey("community_tickets.id", ondelete="CASCADE"),
        nullable=True
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    content = db.Column(db.Text, nullable=True)

 
    reply_to_id = db.Column(
        db.Integer,
        db.ForeignKey("community_messages.id"),
        nullable=True
    )
    is_mention = db.Column(db.Boolean, default=False, nullable=False)

    forwarded_from_id = db.Column(
        db.Integer,
        db.ForeignKey("community_messages.id"),
        nullable=True
    )

    is_edited = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)

    # relationships
    channel = db.relationship("CommunityChannel", back_populates="messages")
    ticket = db.relationship("CommunityTicket", back_populates="messages")
    user = db.relationship("Users", backref="messages")

    reply_to = db.relationship(
        "CommunityMessage",
        remote_side=[id],
        foreign_keys=[reply_to_id],
        uselist=False
    )

    forwarded_from = db.relationship(
        "CommunityMessage",
        remote_side=[id],
        foreign_keys=[forwarded_from_id],
        uselist=False
    )

    reactions = db.relationship(
        "MessageReaction",
        back_populates="message",
        cascade="all, delete"
    )

    attachments = db.relationship(
        "MessageAttachment",
        back_populates="message",
        cascade="all, delete"
    )
    audio = db.relationship(
        "MessageAudio",
        back_populates="message",
        uselist=False,         
        cascade="all, delete"
    )
    __table_args__ = (
        db.CheckConstraint(
            "(channel_id IS NOT NULL AND ticket_id IS NULL) OR "
            "(channel_id IS NULL AND ticket_id IS NOT NULL)",
            name="ck_message_single_context"
        ),
    )

    def __repr__(self):
        return f"<Message {self.id} by User {self.user_id}>"

class ChannelSlowmodeState(db.Model):
    __tablename__ = "channel_slowmode_state"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    channel_id = db.Column(
        db.Integer,
        db.ForeignKey("community_channels.id"),
        nullable=False
    )

    # when cooldown started (optional but useful for debugging / UI)
    cooldown_started_at = db.Column(db.DateTime, nullable=False)

    # 🔥 THIS IS THE IMPORTANT ONE
    cooldown_ends_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("Users")
    channel = db.relationship("CommunityChannel")

    __table_args__ = (
        db.UniqueConstraint("user_id", "channel_id"),
    )


class PinnedMessage(db.Model):
    __tablename__ = "pinned_messages"

    id = db.Column(db.Integer, primary_key=True)

    message_id = db.Column(
        db.Integer,
        db.ForeignKey("community_messages.id", ondelete="CASCADE"),
        nullable=False,
        unique=True  # 🔥 one pin per message
    )

    channel_id = db.Column(
        db.Integer,
        db.ForeignKey("community_channels.id", ondelete="CASCADE"),
        nullable=False
    )

    pinned_by_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )

    pinned_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # relationships
    message = db.relationship(
        "CommunityMessage",
        backref=db.backref("pin", uselist=False, cascade="all, delete-orphan")
    )

    channel = db.relationship(
        "CommunityChannel",
        backref=db.backref("pinned_messages", cascade="all, delete-orphan")
    )

    pinned_by = db.relationship("Users")

    __table_args__ = (
        db.UniqueConstraint("message_id"),
    )


class MessageAudio(db.Model):
    __tablename__ = "message_audio"

    id = db.Column(db.Integer, primary_key=True)

    message_id = db.Column(
        db.Integer,
        db.ForeignKey("community_messages.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    audio_url = db.Column(db.String(255), nullable=False)


    type = db.Column(
        db.Enum("audio", name="message_audio_type"),
        nullable=False,
        default="audio"
    )

    # waveform data (precomputed)
    duration_sec = db.Column(db.Integer, nullable=False)
    audio_size = db.Column(db.Integer, nullable=False)


    wave_height = db.Column(db.Text, nullable=True)
    

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relationship
    message = db.relationship(
        "CommunityMessage",
        back_populates="audio"
    )
