from backend.utils.instance import db
from datetime import datetime

class MessageAttachment(db.Model):
    __tablename__ = "message_attachments"

    id = db.Column(db.Integer, primary_key=True)

    message_id = db.Column(
        db.Integer,
        db.ForeignKey("community_messages.id", ondelete="CASCADE"),
        nullable=False
    )

    file_url = db.Column(db.String(255), nullable=False)
    file_type = db.Column(
        db.Enum("image", "video", "audio", "file", "voice", name="attachment_type"),
        nullable=False
    )

    original_name = db.Column(db.String(255), nullable=False)

    file_size = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    message = db.relationship("CommunityMessage", back_populates="attachments")


