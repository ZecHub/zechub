import uuid
from backend.utils.instance import db
from datetime import datetime


class Community(db.Model):
    __tablename__ = 'communities'

    id = db.Column(db.Integer, primary_key=True)

    uuid = db.Column(
        db.String(36),
        unique=True,
        nullable=False,
        default=lambda: str(uuid.uuid4())
    )

    name = db.Column(db.String(120), nullable=False)
    website = db.Column(db.String(255))
    about = db.Column(db.Text)
    blockchain = db.Column(db.String(100))
    logo_path = db.Column(db.String(255))
    slug = db.Column(db.String(120), unique=True, nullable=False)

    is_paid = db.Column(db.Boolean, default=False)

    # ✅ Monthly invite cap (default 30)
    invite_limit_per_month = db.Column(
        db.Integer,
        nullable=False,
        default=30
    )

    deletion_requested_at = db.Column(db.DateTime, nullable=True)
    delete_at = db.Column(db.DateTime, nullable=True)

    created_by_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )

    creator = db.relationship(
        'Users',
        back_populates='communities_created'
    )

    # -------------------------------------------------
    # Relationships
    # -------------------------------------------------

    user_roles = db.relationship(
        'CommunityUserRole',
        back_populates='community',
        cascade='all, delete'
    )

    payments = db.relationship(
        'Payment',
        back_populates='community',
        cascade='all, delete'
    )

    quests = db.relationship(
        'Quest',
        back_populates='community',
        cascade='all, delete'
    )

    # ✅ Invite codes
    invitation_codes = db.relationship(
        "InvitationCode",
        back_populates="community",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    invite_logs = db.relationship(
        "CommunityInviteLog",
        back_populates="community",
        lazy=True
    )

    # ✅ Monthly invite usage tracker
    invite_usage = db.relationship(
        "CommunityInviteUsage",
        back_populates="community",
        cascade="all, delete-orphan"
    )

    online_status = db.relationship(
        'CommunityOnlineStatus',
        back_populates='community',
        uselist=False,
        cascade='all, delete-orphan'
    )

    discord_guild = db.relationship(
        "DiscordGuild",
        back_populates="community",
        uselist=False,
        cascade="all, delete"
    )

    limited_codes = db.relationship(
        "LimitedCode",
        back_populates="community",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    wallet = db.relationship(
        "CommunityWallet",
        back_populates="community",
        uselist=False,
        cascade="all, delete-orphan"
    )

    ticket_settings = db.relationship(
        "CommunityTicketSettings",
        back_populates="community",
        uselist=False,
        cascade="all, delete-orphan"
    )

    twitter_account = db.relationship(
        "CommunityTwitter",
        back_populates="community",
        uselist=False,
        cascade="all, delete"
    )

    extra_roles = db.relationship(
        'CommunityUserExtraRole',
        back_populates='community',
        cascade='all, delete'
    )

    extra_role_definitions = db.relationship(
        'CommunityExtraRole',
        back_populates='community',
        cascade='all, delete-orphan'
    )

    security_settings = db.relationship(
        "CommunitySecurity",
        back_populates="community",
        uselist=False,
        cascade="all, delete"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )

    def __repr__(self):
        return f"<Community {self.name}>"



class InboxNotification(db.Model):
    __tablename__ = "inbox_notifications"

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

    unread_count = db.Column(
        db.Integer,
        default=0,
        nullable=False
    )

    last_updated = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # 🚀 Ensure ONE row per user per community
    __table_args__ = (
        db.UniqueConstraint('user_id', 'community_id', name='uq_user_community_inbox'),
    )

    # Relationships (optional but useful)
    user = db.relationship("Users", backref="inbox_notifications")
    community = db.relationship("Community", backref="inbox_notifications")


    def mark_inbox_read(user_id, community_id):
        notif = InboxNotification.query.filter_by(
            user_id=user_id,
            community_id=community_id
        ).first()

        if notif:
            notif.unread_count = 0
            db.session.commit()



    def increment_inbox(user_id, community_id):
        notif = InboxNotification.query.filter_by(
            user_id=user_id,
            community_id=community_id
        ).first()

        if not notif:
            notif = InboxNotification(
                user_id=user_id,
                community_id=community_id,
                unread_count=1
            )
            db.session.add(notif)
        else:
            notif.unread_count += 1


        

    def __repr__(self):
        return f"<InboxNotification user={self.user_id} community={self.community_id} count={self.unread_count}>"



class ReviewNotification(db.Model):
    __tablename__ = "review_notifications"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,  # ONE per community
        index=True
    )

    pending_count = db.Column(
        db.Integer,
        default=0,
        nullable=False
    )

    last_updated = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    community = db.relationship("Community", backref="review_notification")


    def increment_reviews(community_id):
        notif = ReviewNotification.query.filter_by(
            community_id=community_id
        ).first()

        if not notif:
            notif = ReviewNotification(
                community_id=community_id,
                pending_count=1
            )
            db.session.add(notif)
        else:
            notif.pending_count += 1



    def decrement_reviews(community_id):
        notif = ReviewNotification.query.filter_by(
            community_id=community_id
        ).first()

        if notif and notif.pending_count > 0:
            notif.pending_count -= 1

    def __repr__(self):
        return f"<ReviewNotification community={self.community_id} pending={self.pending_count}>"
    


class CommunityInviteUsage(db.Model):
    __tablename__ = "community_invite_usage"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id"),
        nullable=False,
        index=True
    )

    year = db.Column(
        db.Integer,
        nullable=False,
        index=True
    )

    month = db.Column(
        db.Integer,
        nullable=False,
        index=True
    )

    invite_count = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    community = db.relationship(
        "Community",
        back_populates="invite_usage"
    )

    __table_args__ = (
        db.UniqueConstraint(
            "community_id",
            "year",
            "month",
            name="uq_community_invite_month"
        ),
    )



class CommunityUserXP(db.Model):
    __tablename__ = "community_user_xp"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)

    xp = db.Column(db.Integer, default=0, nullable=False)

    user = db.relationship("Users", backref="community_xp")
    community = db.relationship("Community", backref="user_xp")

    __table_args__ = (
        db.UniqueConstraint("user_id", "community_id", name="unique_user_community_xp"),
    )



class SprintUserXP(db.Model):
    __tablename__ = "sprint_user_xp"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
    sprint_id = db.Column(db.Integer, db.ForeignKey("sprints.id"), nullable=False)

    xp = db.Column(db.Integer, default=0, nullable=False)

    user = db.relationship("Users", backref="sprint_xp")
    sprint = db.relationship("Sprint", backref="user_xp")

    __table_args__ = (
        db.UniqueConstraint("user_id", "sprint_id", name="unique_user_sprint_xp"),
    )



class EarlyAccessApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    user = db.relationship("Users", backref="early_access_applications")

    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    community_name = db.Column(db.String(120))
    community_link = db.Column(db.String(255))
    community_size = db.Column(db.String(50))
    problem = db.Column(db.Text)
    reason = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)



class ProWaitlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    user = db.relationship("Users", backref="pro_waitlist_entries")

    email = db.Column(db.String(120), unique=True)
    community_name = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)



class CommunityWallet(db.Model):
    __tablename__ = "community_wallets"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id"),
        unique=True,
        nullable=False
    )

    available_balance = db.Column(db.BigInteger, default=0)  
    locked_balance = db.Column(db.BigInteger, default=0)     

    currency = db.Column(db.String(10), default="ZEC")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    community = db.relationship("Community", back_populates="wallet")

    @property
    def total_balance(self):
        return self.available_balance + self.locked_balance



class CommunityWalletTransaction(db.Model):
    __tablename__ = "community_wallet_transactions"

    id = db.Column(db.Integer, primary_key=True)

    wallet_id = db.Column(
        db.Integer,
        db.ForeignKey("community_wallets.id"),
        nullable=False
    )

    amount = db.Column(db.BigInteger, nullable=False)
    type = db.Column(db.String(50))   

    reference = db.Column(db.String(120))  

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    wallet = db.relationship("CommunityWallet")


    


class AIConversation(db.Model):
    __tablename__ = "ai_conversation"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    session_id = db.Column(db.String(64), index=True)

    module = db.Column(db.String(50))
    object_type = db.Column(db.String(50))
    object_id = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    messages = db.relationship(
        "AIMessage",
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="AIMessage.created_at"
    )


class AIMessage(db.Model):
    __tablename__ = "ai_message"

    id = db.Column(db.Integer, primary_key=True)

    conversation_id = db.Column(
        db.Integer,
        db.ForeignKey("ai_conversation.id", ondelete="CASCADE"),
        nullable=False
    )

    role = db.Column(db.String(20))
    content = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    metadata_json = db.Column(db.JSON)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    conversation = db.relationship(
        "AIConversation",
        back_populates="messages"
    )





class CommunityInteractionSettings(db.Model):
    __tablename__ = "community_interaction_settings"

    id = db.Column(db.Integer, primary_key=True)

    # 🔗 One-to-one with Community
    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )


    can_send_messages = db.Column(db.Boolean, default=True, nullable=False)
    can_send_links = db.Column(db.Boolean, default=True, nullable=False)
    can_upload_images = db.Column(db.Boolean, default=True, nullable=False)
    can_send_voice = db.Column(db.Boolean, default=True, nullable=False)


    updated_by_user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

 
    community = db.relationship(
        "Community",
        backref=db.backref(
            "interaction_settings",
            uselist=False,
            cascade="all, delete-orphan"
        )
    )

    updated_by = db.relationship(
        "Users",
        foreign_keys=[updated_by_user_id]
    )

    def __repr__(self):
        return f"<CommunityInteractionSettings community_id={self.community_id}>"


class CommunityClaimUsage(db.Model):
    __tablename__ = "community_claim_usage"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id"),
        nullable=False,
        index=True
    )

    year = db.Column(db.Integer, nullable=False, index=True)
    month = db.Column(db.Integer, nullable=False, index=True)

    claim_count = db.Column(db.Integer, nullable=False, default=0)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    community = db.relationship("Community")

    __table_args__ = (
        db.UniqueConstraint(
            "community_id",
            "year",
            "month",
            name="uq_community_month"
        ),
    )








class AIActionLog(db.Model):
    __tablename__ = "ai_action_logs"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="SET NULL")
    )

    action_type = db.Column(db.String(100), nullable=False)
    # create_quest
    # schedule_quest
    # create_partnership
    # send_announcement

    payload_json = db.Column(db.JSON, nullable=True)

    status = db.Column(
        db.String(50),
        default="success"
    )
    # success | failed | pending

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    community = db.relationship("Community")
    user = db.relationship("Users")




