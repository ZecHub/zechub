from backend.utils.instance import db
from datetime import datetime
import uuid


class CommunityEmoji(db.Model):
    __tablename__ = "community_emojis"

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

    # :party_parrot:
    name = db.Column(db.String(50), nullable=False)

    image_path = db.Column(db.String(255), nullable=True)

    # Optional: who uploaded it
    created_by_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint("community_id", "name"),
    )

    # relationships
    community = db.relationship("Community", backref="emojis")
    created_by = db.relationship("Users")

    def __repr__(self):
        return f"<CommunityEmoji :{self.name}:>"
