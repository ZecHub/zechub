from backend.utils.instance import db
from datetime import datetime
import uuid

class CommunityCategory(db.Model):
    __tablename__ = "community_categories"

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

    
    created_by_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )

    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    community = db.relationship("Community", backref="categories")

    created_by = db.relationship("Users")

    channels = db.relationship(
        "CommunityChannel",
        back_populates="category",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<CommunityCategory {self.name}>"


class CategoryAllowedRole(db.Model):
    __tablename__ = "category_allowed_roles"

    id = db.Column(db.Integer, primary_key=True)

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("community_categories.id", ondelete="CASCADE"),
        nullable=False
    )

    role = db.Column(db.String(20), nullable=False)  


    category = db.relationship(
        "CommunityCategory",
        backref=db.backref("allowed_roles", cascade="all, delete-orphan")
    )
