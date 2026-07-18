from datetime import datetime 
from backend.utils.instance import db 
import json 

class CommunityInviteLog(db.Model):
    __tablename__ = "community_invite_logs"

    id = db.Column(db.Integer, primary_key=True)
    invited_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    inviter_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
    invitation_code = db.Column(db.String(50), nullable=False)

    status = db.Column(
        db.String(20),
        nullable=False,
        default="pending",
        comment="Invite status: pending, active, consumed"
    )

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    consumed_at = db.Column(db.DateTime, nullable=True)

    # Relationships
    invited_user = db.relationship(
        "Users",
        foreign_keys=[invited_user_id],
        lazy=True,
        back_populates="invite_logs_received"
    )
    inviter_user = db.relationship(
        "Users",
        foreign_keys=[inviter_user_id],
        lazy=True,
        back_populates="invite_logs_sent"
    )
    community = db.relationship(
        "Community",
        lazy=True,
        back_populates="invite_logs"
    )
    invite_tasks = db.relationship(
        "CommunityInviteTask",
        back_populates="invite_log",
        cascade="all, delete-orphan",
        lazy=True
    )

    def __repr__(self):
        return (
            f"<CommunityInviteLog id={self.id} "
            f"invited_user_id={self.invited_user_id} "
            f"inviter_user_id={self.inviter_user_id} "
            f"community_id={self.community_id} "
            f"invitation_code={self.invitation_code} "
            f"status={self.status}>"
        )
