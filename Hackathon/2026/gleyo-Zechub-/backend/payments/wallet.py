from backend.utils.instance import db
import secrets
from datetime import datetime, UTC

class ZecWallet(db.Model):
    __tablename__ = "zec_wallets"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    address = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    wallet_name = db.Column(
        db.String(50),
        nullable=True
    )

    verified = db.Column(
        db.Boolean,
        default=False
    )

    connected_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(UTC)
    )

    is_active = db.Column(
        db.Boolean,
        default=True
    )

    disconnected_at = db.Column(
        db.DateTime(timezone=True),
        nullable=True
    )

    def __repr__(self):
        return f"<ZecWallet {self.address}>"
    



class ZecAuthSession(db.Model):
    __tablename__ = "zec_auth_sessions"

    id = db.Column(db.Integer, primary_key=True)

    session_id = db.Column(
        db.String(64),
        unique=True,
        nullable=False,
        default=lambda: secrets.token_hex(16)
    )

    verification_code = db.Column(
        db.String(20),
        nullable=False
    )

    deposit_address = db.Column(
        db.String(255),
        nullable=False
    )

    wallet_name = db.Column(
        db.String(50),
        nullable=True
    )

    balance_before = db.Column(db.Float, nullable=False, default=0.0)

    user_provided_address = db.Column(
        db.String(255),
        nullable=True
    )

    status = db.Column(
        db.String(20),
        default="pending"
    )

    verified_wallet_address = db.Column(
        db.String(255),
        nullable=True
    )

    expires_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(UTC)
    )



class ZecWithdrawalQueue(db.Model):
    __tablename__ = "zec_withdrawal_queue"

    id = db.Column(db.Integer, primary_key=True)

    tx_id = db.Column(
        db.Integer,
        db.ForeignKey("user_transactions.id"),
        nullable=False,
        unique=True
    )

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    address = db.Column(db.String(255), nullable=False)
    amount_to_send = db.Column(db.Numeric(20, 8), nullable=False)
    full_amount = db.Column(db.Numeric(20, 8), nullable=False)
    platform_fee = db.Column(db.Numeric(20, 8), nullable=False)

    # queued -> processing -> done | failed
    status = db.Column(db.String(20), default="queued", nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(UTC))
    started_at = db.Column(db.DateTime(timezone=True), nullable=True)
    finished_at = db.Column(db.DateTime(timezone=True), nullable=True)

    def __repr__(self):
        return f"<ZecWithdrawalQueue tx={self.tx_id} status={self.status}>"