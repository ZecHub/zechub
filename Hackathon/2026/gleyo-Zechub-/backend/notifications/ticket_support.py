from datetime import datetime
import uuid
from backend.utils.instance import db
from sqlalchemy import Enum


from sqlalchemy import Index

class CommunityTicket(db.Model):
    __tablename__ = "community_tickets"

    id = db.Column(db.Integer, primary_key=True)
    community_ticket_number = db.Column(db.Integer, nullable=False)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="open"
    )

    closed_by_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    community = db.relationship("Community", backref="tickets")

    closed_at = db.Column(db.DateTime)
    messages = db.relationship(
        "CommunityMessage",
        back_populates="ticket",
        cascade="all, delete"
    )

    user = db.relationship("Users", foreign_keys=[user_id])
    closed_by = db.relationship("Users", foreign_keys=[closed_by_id])

    __table_args__ = (
        # 🔒 ONE OPEN TICKET PER USER PER COMMUNITY
        Index(
            "uq_open_ticket_per_user_per_community",
            "community_id",
            "user_id",
            unique=True,
            postgresql_where=(status == "open"),
            sqlite_where=(status == "open")
        ),
    )
    
    def __repr__(self):
        return f"<CommunityTicket {self.uuid} status={self.status}>"






class CommunityTicketSettings(db.Model):
    __tablename__ = "community_ticket_settings"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    tickets_disabled = db.Column(
        db.Boolean,
        nullable=False,
        default=False
    )

    # 👤 Who disabled it
    disabled_by_user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )

    # When it was disabled (audit only)
    disabled_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=True
    )

    disabled_until = db.Column(
        db.DateTime,
        nullable=True
    )

    # 🧠 Intent (optional but explicit)
    disable_mode = db.Column(
        Enum("manual", "temporary", name="ticket_disable_mode"),
        nullable=True
    )



    community = db.relationship(
        "Community",
        back_populates="ticket_settings"
    )

    disabled_by = db.relationship(
        "Users",
        foreign_keys=[disabled_by_user_id]
    )

 
 
    def is_disabled(self) -> bool:
        """
        Pure check.
        Safe to call anywhere.
        """
        if not self.tickets_disabled:
            return False

        if self.disable_mode == "temporary" and self.disabled_until:
            return self.disabled_until > datetime.utcnow()

        # Manual disable
        return True

    def disable_temporarily(self, until: datetime, by_user_id: int):
        self.tickets_disabled = True
        self.disable_mode = "temporary"
        self.disabled_until = until
        self.disabled_by_user_id = by_user_id
        self.disabled_at = datetime.utcnow()

    def disable_manually(self, by_user_id: int):
        self.tickets_disabled = True
        self.disable_mode = "manual"
        self.disabled_until = None
        self.disabled_by_user_id = by_user_id
        self.disabled_at = datetime.utcnow()

    def enable(self):
        self.tickets_disabled = False
        self.disable_mode = None
        self.disabled_until = None
        self.disabled_by_user_id = None
        self.disabled_at = None

    def __repr__(self):
        return (
            f"<CommunityTicketSettings "
            f"community_id={self.community_id} "
            f"disabled={self.tickets_disabled} "
            f"mode={self.disable_mode}>"
        )
