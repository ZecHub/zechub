from datetime import datetime
from backend.utils.instance import db

class UserCommunityFabState(db.Model):
    __tablename__ = "user_community_fab_state"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id", ondelete="CASCADE"), nullable=False)
    is_visible = db.Column(db.Boolean, default=True)
    notification_count = db.Column(db.Integer, default=0)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint("user_id", "community_id", name="uq_fab_user_community"),
    )

    def __repr__(self):
        return f"<FabState user={self.user_id} community={self.community_id} visible={self.is_visible} count={self.notification_count}>"
