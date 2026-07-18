from backend.utils.instance import db
from datetime import datetime
import secrets

class CommunityWebhook(db.Model):
    __tablename__ = "community_webhooks"

    id = db.Column(db.Integer, primary_key=True)

    # 🔗 Relations
    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False
    )

    created_by_user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )

    # 🌐 Webhook config
    endpoint_url = db.Column(db.String(500), nullable=False)
    secret = db.Column(
        db.String(128),
        nullable=False,
        default=lambda: secrets.token_hex(32)
    )

    is_active = db.Column(db.Boolean, default=True)

    on_user_joined = db.Column(db.Boolean, default=False)
    on_quest_completed = db.Column(db.Boolean, default=False)
    on_role_upgraded = db.Column(db.Boolean, default=False)
    on_subscription_expired = db.Column(db.Boolean, default=False)

    last_triggered_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    community = db.relationship("Community", backref="webhooks")
    created_by = db.relationship("Users", backref="created_webhooks")

    def __repr__(self):
        return f"<CommunityWebhook {self.endpoint_url}>"
