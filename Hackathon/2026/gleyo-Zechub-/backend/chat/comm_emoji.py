from backend.utils.instance import db
from datetime import datetime

class MessageReaction(db.Model):
    __tablename__ = "message_reactions"

    id = db.Column(db.Integer, primary_key=True)

    message_id = db.Column(
        db.Integer,
        db.ForeignKey("community_messages.id", ondelete="CASCADE"),
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    emoji = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    message = db.relationship("CommunityMessage", back_populates="reactions")
    user = db.relationship("Users")

    __table_args__ = (
        db.UniqueConstraint("message_id", "user_id", "emoji"),
    )
