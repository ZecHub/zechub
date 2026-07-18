from backend.utils.instance import db
from flask_login import UserMixin
import uuid
from sqlalchemy.orm import object_session
import random
import string
from sqlalchemy import Numeric
from datetime import datetime, timedelta


class Users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    profile_pic = db.Column(db.String(255))
    username = db.Column(db.String(100), nullable=True)

    # Relationships
    communities_created = db.relationship('Community', back_populates='creator', cascade='all, delete')
    sprints_created = db.relationship('Sprint', back_populates='creator', cascade='all, delete')
    payments = db.relationship('Payment', back_populates='user', cascade='all, delete')
    admin_display_name = db.Column(
        db.String(12),
        unique=True,
        nullable=False
    )
    deletion_requested_at = db.Column(db.DateTime, nullable=True)



    roles = db.relationship('CommunityUserRole', back_populates='user', cascade='all, delete')

    # 🔹 Social connections
    twitter_connections = db.relationship('UserTwitter', backref='user', cascade='all, delete')
    telegram_connections = db.relationship('UserTelegram', backref='user', cascade='all, delete')
    discord_connections = db.relationship('UserDiscord', backref='user', cascade='all, delete')
    youtube_connections = db.relationship('UserYouTube', backref='user', cascade='all, delete')
    tiktok_connections = db.relationship('UserTikTok', backref='user', cascade='all, delete')
    wallets = db.relationship(
        'ZecWallet',
        backref='user',
        cascade="all, delete",
        lazy=True
    )
    xp_logs = db.relationship("UserXP", back_populates="user", cascade="all, delete")

    @staticmethod
    def generate_unique_admin_display_name(session, length=8):
        while True:
            name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
            if not session.query(Users).filter_by(admin_display_name=name).first():
                return name


    def get_admin_identifier(self):
        """Return the display name for admins (fallback to UUID if missing)"""
        if self.admin_display_name:
            return self.admin_display_name
        # Fallback: first 8 chars of UUID
        return self.uuid[:8]
    


    subquest_completions = db.relationship(
        "SubquestCompletion",
        back_populates="user",
        cascade="all, delete"
    )
    task_attempt_histories = db.relationship("TaskAttemptHistory", back_populates="user", cascade="all, delete")
    subquest_cooldowns = db.relationship(
        "SubquestCooldown",
        back_populates="user",
        cascade="all, delete"
    )
    extra_roles = db.relationship(
        'CommunityUserExtraRole',
        foreign_keys='CommunityUserExtraRole.user_id',
        back_populates='user',
        cascade='all, delete'
    )



    invitation_codes = db.relationship(
        "InvitationCode",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
       # Invite logs where this user was invited
    invite_logs_received = db.relationship("CommunityInviteLog", foreign_keys="[CommunityInviteLog.invited_user_id]", back_populates="invited_user", lazy=True)

    # Invite logs where this user invited others
    invite_logs_sent = db.relationship("CommunityInviteLog", foreign_keys="[CommunityInviteLog.inviter_user_id]", back_populates="inviter_user", lazy=True)
    # ----------------------
    # Computed properties
    # ----------------------
    @property
    def latest_twitter(self):
        if not self.twitter_connections:
            return None
        # get latest "connected" record
        return max(
            (conn for conn in self.twitter_connections if conn.action == 'connected'),
            key=lambda c: c.timestamp,
            default=None
        )
    



    @property
    def primary_wallet(self):
        """Return the most recently connected wallet (if any)."""
        if not self.wallets:
            return None
        return max(self.wallets, key=lambda w: w.connected_at)

    def __repr__(self):
        return f"<User {self.username}>"

    @property
    def latest_twitter_username(self):
        return self.latest_twitter.xusername if self.latest_twitter else None

    @property
    def latest_discord(self):
        if not self.discord_connections:
            return None
        return max(
            (conn for conn in self.discord_connections if conn.action == 'connected'),
            key=lambda c: c.timestamp,
            default=None
        )

    @property
    def latest_discord_username(self):
        return self.latest_discord.discord_username if self.latest_discord else None

    @property
    def latest_youtube(self):
        if not self.youtube_connections:
            return None
        # get latest "connected" record
        return max(
            (conn for conn in self.youtube_connections if conn.action == 'connected'),
            key=lambda c: c.timestamp,
            default=None
        )

    @property
    def latest_youtube_handle(self):
        """Return the YouTube username/handle of the latest connected account"""
        return self.latest_youtube.youtube_handle if self.latest_youtube else None

    @property
    def latest_tiktok(self):
        if not self.tiktok_connections:
            return None
        # Get latest "connected" record
        return max(
            (conn for conn in self.tiktok_connections if conn.action == 'connected'),
            key=lambda c: c.timestamp,
            default=None
        )

    @property
    def latest_tiktok_nickname(self):
        return self.latest_tiktok.nickname if self.latest_tiktok else None


    def __repr__(self):
        return f"<User {self.username}>"

    def purge_deleted_users():
        cutoff = datetime.utcnow() - timedelta(days=30)

        users = Users.query.filter(
            Users.deletion_requested_at.isnot(None),
            Users.deletion_requested_at <= cutoff
        ).all()

        for user in users:
            db.session.delete(user)

        db.session.commit()


class UserBalance(db.Model):
    __tablename__ = "user_balances"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False)

    balance = db.Column(Numeric(18, 6), default=0)
    total_earned = db.Column(Numeric(18, 6), default=0)
    total_withdrawn = db.Column(Numeric(18, 6), default=0)

    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("Users", backref=db.backref("balance", uselist=False))



class UserTransaction(db.Model):
    __tablename__ = "user_transactions"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    type = db.Column(db.String(10))  # 'in', 'out', 'fee'
    amount = db.Column(Numeric(18, 6), nullable=False)

    token = db.Column(db.String(10), default="ZEC")

    status = db.Column(db.String(20), default="pending")  
    tx_hash = db.Column(db.String(128))
    block_number = db.Column(db.String(50))

    from_address = db.Column(db.String(512))
    to_address = db.Column(db.String(512))

    remark = db.Column(db.String(255))  

    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("Users", backref="transactions")


class PasswordResetToken(db.Model):
    __tablename__ = "password_reset_tokens"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    token = db.Column(db.String(120), unique=True, nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)

    used = db.Column(db.Boolean, default=False)

    user = db.relationship("Users")
        



class UserTwoFactor(db.Model):
    __tablename__ = "user_two_factor"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    # 🔐 TOTP secret
    secret = db.Column(db.String(32), nullable=False)

    is_enabled = db.Column(db.Boolean, default=False)

    backup_codes = db.Column(db.JSON, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("Users", backref=db.backref("two_factor", uselist=False))


    