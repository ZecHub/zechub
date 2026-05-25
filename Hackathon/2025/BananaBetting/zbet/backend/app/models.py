from sqlalchemy import Boolean, Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum, Index
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
import json

from .database import Base


class NonProfit(Base):
    __tablename__ = "nonprofits"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    website = Column(String(500), nullable=True)
    federal_tax_id = Column(String(20), nullable=False, unique=True, index=True)  # EIN or other tax ID
    
    # Zcash addresses
    zcash_transparent_address = Column(String(100), nullable=True, unique=True, index=True)
    zcash_shielded_address = Column(String(100), nullable=True, unique=True, index=True)
    
    # Contact information
    contact_phone = Column(String(20), nullable=True)
    contact_name = Column(String(255), nullable=True)
    contact_email = Column(String(255), nullable=True)
    
    # Administrative fields
    date_added = Column(DateTime, default=datetime.utcnow, nullable=False)
    date_last_verified = Column(DateTime, nullable=True)
    is_verified = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Optional description/notes
    description = Column(Text, nullable=True)
    verification_notes = Column(Text, nullable=True)
    
    # Relationships
    sport_events = relationship("SportEvent", back_populates="nonprofit")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    zcash_account = Column(String, primary_key=False)
    zcash_address = Column(String, unique=True, index=True)
    zcash_transparent_address = Column(String, unique=True, index=True)
    
    # Legacy balance field - kept for backward compatibility
    balance = Column(String, unique=False, index=True)
    
    # New separate balance tracking
    shielded_balance = Column(Float, default=0.0, nullable=False)  # Balance in shielded pool
    transparent_balance = Column(Float, default=0.0, nullable=False)  # Balance in transparent addresses
    
    # Balance metadata
    last_balance_update = Column(DateTime, default=datetime.utcnow, nullable=False)
    balance_version = Column(Integer, default=1, nullable=False)  # For optimistic locking

    # Relationships
    bets = relationship("Bet", back_populates="user")
    payouts = relationship("Payout", back_populates="user")
    validation_results = relationship("ValidationResult", back_populates="user")
    transactions = relationship("UserTransaction", back_populates="user")
    
    def get_total_balance(self):
        """Get total balance across all address types"""
        return self.shielded_balance + self.transparent_balance
    
    def update_balances(self, shielded_delta=0.0, transparent_delta=0.0):
        """Update balances with delta amounts"""
        self.shielded_balance += shielded_delta
        self.transparent_balance += transparent_delta
        self.last_balance_update = datetime.utcnow()
        self.balance_version += 1


# Enums for status fields
class EventStatus(enum.Enum):
    OPEN = "open"
    CLOSED = "closed" 
    SETTLED = "settled"
    PAIDOUT = "paidout"
    CANCELLED = "cancelled"


class BetOutcome(enum.Enum):
    WIN = "win"
    LOSS = "loss"
    PUSH = "push" # neither win or lose, stalemate, tie, etc. - triggers automatic refund 


class DepositStatus(enum.Enum):
    PENDING = "pending"         # Bet created, waiting for deposit
    CONFIRMING = "confirming"   # Deposit received, waiting for confirmations
    CONFIRMED = "confirmed"     # Deposit fully confirmed, bet is active
    FAILED = "failed"          # Deposit failed or insufficient
    EXPIRED = "expired"        # Deposit window expired


class EventCategory(enum.Enum):
    BASEBALL = "baseball"
    BANANA_ANTICS = "banana-antics"
    CROWD_FUN = "crowd-fun"
    PLAYER_PROPS = "player-props"


class BettingSystemType(enum.Enum):
    PARI_MUTUEL = "pari_mutuel"
    # TODO: implement fixed odds and spread systems 
    FIXED_ODDS = "fixed_odds"
    SPREAD = "spread"


# Base SportEvent model
class SportEvent(Base):
    __tablename__ = "sport_events"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(Enum(EventCategory), nullable=False)
    status = Column(Enum(EventStatus), default=EventStatus.OPEN, nullable=False)
    betting_system_type = Column(Enum(BettingSystemType), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    nonprofit_id = Column(Integer, ForeignKey("nonprofits.id"), nullable=False) # Events must be for nonprofits
    
    # Event timing (all times stored in EST)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)  # Keep UTC for creation time
    event_start_time = Column(DateTime, nullable=False)  # Stored in EST
    event_end_time = Column(DateTime, nullable=False)  # Stored in EST
    settlement_time = Column(DateTime, nullable=False)  # Stored in EST
    settled_at = Column(DateTime, nullable=True)  # Will be set in EST when settled
    
    # Relationships
    creator = relationship("User")
    nonprofit = relationship("NonProfit", back_populates="sport_events")
    
    def get_current_status(self):
        """Calculate the current status based on timing and stored status"""
        # If event is already settled, paid out, or cancelled, return as is
        if self.status in [EventStatus.SETTLED, EventStatus.PAIDOUT, EventStatus.CANCELLED]:
            return self.status
        
        from datetime import datetime, timezone, timedelta
        
        # Get current time in Eastern timezone
        # For simplicity, we'll use UTC-4 (EDT) since it's currently daylight saving time
        # In production, you'd want to use a proper timezone library
        eastern_offset = timedelta(hours=-4)  # EDT (Eastern Daylight Time)
        eastern_tz = timezone(eastern_offset)
        now_eastern = datetime.now(eastern_tz).replace(tzinfo=None)
        
        # If current time is past event end time, event should be closed
        if now_eastern > self.event_end_time:
            return EventStatus.CLOSED
        
        # Otherwise, return the stored status (likely OPEN)
        return self.status
    
    # Serialization methods
    def to_dict(self, db_session):
        """Convert to dictionary with all related data"""
        data = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category.value,
            "status": self.get_current_status().value,
            "betting_system_type": self.betting_system_type.value,
            "created_at": self.created_at.isoformat(),
            "event_start_time": self.event_start_time.isoformat(),
            "event_end_time": self.event_end_time.isoformat(),
            "settlement_time": self.settlement_time.isoformat(),
            "settled_at": self.settled_at.isoformat() if self.settled_at else None,
            "nonprofit": {
                "id": self.nonprofit.id,
                "name": self.nonprofit.name,
                "website": self.nonprofit.website,
                "is_verified": self.nonprofit.is_verified
            }
        }
        
        # Each betting system handles its own data
        if self.betting_system_type == BettingSystemType.PARI_MUTUEL:
            pari_event = db_session.query(PariMutuelEvent).filter_by(sport_event_id=self.id).first()
            if pari_event:
                data["betting_system_data"] = pari_event.to_dict(db_session)
        
        return data


# Pari-Mutuel specific betting structure
class PariMutuelEvent(Base):
    __tablename__ = "pari_mutuel_events"

    id = Column(Integer, primary_key=True)
    sport_event_id = Column(Integer, ForeignKey("sport_events.id"), nullable=False)
    
    # Pari-mutuel specific fields
    total_pool = Column(Float, default=0.0, nullable=False)  # Total amount bet across all outcomes
    winning_outcome = Column(String(50), nullable=True)  # The actual winning outcome
    
    # Pari-mutuel betting parameters
    minimum_bet = Column(Float, nullable=False, default=0.001)
    maximum_bet = Column(Float, nullable=False, default=1.0)
    house_fee_percentage = Column(Float, default=0.05, nullable=False)  # 5% default house fee
    creator_fee_percentage = Column(Float, default=0.05, nullable=False)  # 5% default creator fee
    validator_fee_percentage = Column(Float, default=0.2, nullable=False)  # 20% default validator fee
    charity_fee_percentage = Column(Float, default=0.6, nullable=False)  # 60% default charity fee
    
    # Relationships
    betting_pools = relationship("PariMutuelPool", back_populates="pari_mutuel_event")
    
    # Utility methods
    def get_bets(self, db_session):
        """Get all bets for this pari-mutuel event"""
        return db_session.query(Bet).filter(
            Bet.sport_event_id == self.sport_event_id,
            Bet.betting_metadata.contains(f'"pari_mutuel_event_id": {self.id}')
        ).all()
    
    def to_dict(self, db_session):
        """Convert to dictionary with all related data"""
        pools = db_session.query(PariMutuelPool).filter_by(pari_mutuel_event_id=self.id).all()
        
        return {
            "id": self.id,
            "minimum_bet": self.minimum_bet,
            "maximum_bet": self.maximum_bet,
            "house_fee_percentage": self.house_fee_percentage,
            "creator_fee_percentage": self.creator_fee_percentage,
            "validator_fee_percentage": self.validator_fee_percentage,
            "charity_fee_percentage": self.charity_fee_percentage,
            "total_pool": self.total_pool,
            "winning_outcome": self.winning_outcome,
            "betting_pools": [pool.to_dict() for pool in pools]
        }


# Individual betting pools for each possible outcome in pari-mutuel
class PariMutuelPool(Base):
    __tablename__ = "pari_mutuel_pools"

    id = Column(Integer, primary_key=True)
    pari_mutuel_event_id = Column(Integer, ForeignKey("pari_mutuel_events.id"), nullable=False)
    
    # Pool details
    outcome_name = Column(String(50), nullable=False)  # "team_a_wins", "over_5_goals", etc.
    outcome_description = Column(String(255), nullable=False)  # Human readable description
    pool_amount = Column(Float, default=0.0, nullable=False)  # Total amount bet on this outcome
    bet_count = Column(Integer, default=0, nullable=False)  # Number of bets on this outcome
    
    # Payout calculation (set when event settles)
    payout_ratio = Column(Float, nullable=True)  # How much each dollar wins (after fees)
    is_winning_pool = Column(Boolean, default=False, nullable=False)
    
    # Relationships
    pari_mutuel_event = relationship("PariMutuelEvent", back_populates="betting_pools")
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "outcome_name": self.outcome_name,
            "outcome_description": self.outcome_description,
            "pool_amount": self.pool_amount,
            "bet_count": self.bet_count,
            "payout_ratio": self.payout_ratio,
            "is_winning_pool": self.is_winning_pool
        }


class Bet(Base):
    __tablename__ = "bets"

    id = Column(Integer, primary_key=True)
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sport_event_id = Column(Integer, ForeignKey("sport_events.id"), nullable=False)
    
    # Bet details - system agnostic
    amount = Column(Float, nullable=False)  # Amount in ZEC
    predicted_outcome = Column(String(50), nullable=False)  # The outcome identifier they're betting on
    outcome = Column(Enum(BetOutcome), nullable=True)  # Set when event is settled (WIN/LOSS/PUSH)
    
    # System-agnostic betting metadata (JSON field for flexibility)
    betting_metadata = Column(Text, nullable=True)  # JSON string for system-specific data
    
    # Deposit tracking
    deposit_address = Column(String(100), nullable=True)  # Shielded address where user should send ZEC
    deposit_status = Column(Enum(DepositStatus), default=DepositStatus.PENDING, nullable=False)
    deposit_confirmed_at = Column(DateTime, nullable=True)  # When deposit was confirmed
    deposit_expires_at = Column(DateTime, nullable=True)  # When deposit window expires
    
    # Transaction details
    zcash_transaction_id = Column(String(100), nullable=True)  # Transaction hash for placing bet
    bet_placed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Payout details (calculated when event settles)
    payout_amount = Column(Float, nullable=True)  # Final payout amount after settlement
    house_fee_deducted = Column(Float, nullable=True)  # House fee deducted from this bet
    creator_fee_deducted = Column(Float, nullable=True)  # Creator fee deducted from this bet
    
    # Relationships
    user = relationship("User", back_populates="bets")
    sport_event = relationship("SportEvent")  # No back_populates since SportEvent doesn't manage bets
    payout = relationship("Payout", back_populates="bet", uselist=False)
    
    # Utility methods for betting metadata
    def get_betting_metadata(self):
        """Parse betting_metadata JSON field"""
        if self.betting_metadata:
            return json.loads(self.betting_metadata)
        return {}
    
    def set_betting_metadata(self, metadata_dict):
        """Set betting_metadata from dictionary"""
        self.betting_metadata = json.dumps(metadata_dict)
    
    def get_pari_mutuel_pool_id(self):
        """Helper to get pari-mutuel pool ID from metadata"""
        metadata = self.get_betting_metadata()
        return metadata.get('pari_mutuel_pool_id')
    
    def set_pari_mutuel_pool_id(self, pool_id):
        """Helper to set pari-mutuel pool ID in metadata"""
        metadata = self.get_betting_metadata()
        metadata['pari_mutuel_pool_id'] = pool_id
        self.set_betting_metadata(metadata)
    
    def is_active(self):
        """Check if bet is active (deposit confirmed and event not settled)"""
        return self.deposit_status == DepositStatus.CONFIRMED and self.outcome is None
    
    def can_accept_deposits(self):
        """Check if bet can still accept deposits"""
        if self.deposit_expires_at and datetime.utcnow() > self.deposit_expires_at:
            return False
        return self.deposit_status in [DepositStatus.PENDING, DepositStatus.CONFIRMING]


class Payout(Base):
    __tablename__ = "payouts"

    id = Column(Integer, primary_key=True)
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Nullable for house/creator fees
    bet_id = Column(Integer, ForeignKey("bets.id"), nullable=True)    # Nullable for house/creator fees
    sport_event_id = Column(Integer, ForeignKey("sport_events.id"), nullable=False)
    
    # Payout type to distinguish between user winnings and fee collections
    payout_type = Column(String(20), nullable=False, default="user_winning")  # "user_winning", "house_fee", "creator_fee", "validator_fee"
    
    # Payout details
    payout_amount = Column(Float, nullable=False)  # Amount in ZEC
    recipient_address = Column(String(100), nullable=False)  # Zcash address to send funds to
    house_fee_deducted = Column(Float, nullable=False, default=0.0)  # House fee amount deducted (only for user winnings)
    creator_fee_deducted = Column(Float, nullable=False, default=0.0)  # Creator fee amount deducted (only for user winnings)
    
    # Transaction details
    zcash_transaction_id = Column(String(100), nullable=True)  # Payout transaction hash
    payout_processed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Status
    is_processed = Column(Boolean, default=False, nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="payouts")
    bet = relationship("Bet", back_populates="payout")
    sport_event = relationship("SportEvent")


class ValidationResult(Base):
    __tablename__ = "validation_results"

    id = Column(Integer, primary_key=True)
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sport_event_id = Column(Integer, ForeignKey("sport_events.id"), nullable=False)
    
    # Validation details
    predicted_outcome = Column(String(50), nullable=False)  # The outcome the user believes is correct
    validated_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Validation metadata
    confidence_level = Column(String(20), nullable=True)  # "high", "medium", "low" - for future use
    validation_notes = Column(Text, nullable=True)  # Optional notes from validator
    
    # Reward tracking
    is_correct_validation = Column(Boolean, nullable=True)  # Set after consensus is reached
    validator_reward_amount = Column(Float, nullable=True)  # Set when rewards are calculated
    
    # Relationships
    user = relationship("User", back_populates="validation_results")
    sport_event = relationship("SportEvent")
    
    # Constraints to prevent duplicate validations
    __table_args__ = (
        # Each user can only validate each event once
        Index('idx_user_event_unique', 'user_id', 'sport_event_id', unique=True),
    )


# Transaction tracking enums
class TransactionType(enum.Enum):
    DEPOSIT = "deposit"                    # User deposits funds
    WITHDRAWAL = "withdrawal"              # User withdraws/cashouts funds
    BET_PLACED = "bet_placed"             # Funds moved from user to betting pool
    BET_REFUND = "bet_refund"             # Funds returned from cancelled/expired bet
    PAYOUT_WINNING = "payout_winning"     # Winnings paid to user
    PAYOUT_REFUND = "payout_refund"       # Refund for push/tie outcomes
    FEE_HOUSE = "fee_house"               # House fee collection
    FEE_CREATOR = "fee_creator"           # Event creator fee collection
    FEE_VALIDATOR = "fee_validator"       # Validator fee collection
    FEE_CHARITY = "fee_charity"           # Charity fee collection
    BALANCE_CORRECTION = "balance_correction"  # Manual balance adjustments
    POOL_TRANSFER = "pool_transfer"       # Transfer between shielded/transparent pools
    SHIELD = "shield"                     # Move funds from transparent to shielded pool


class TransactionStatus(enum.Enum):
    PENDING = "pending"                   # Transaction initiated but not confirmed
    CONFIRMED = "confirmed"               # Transaction confirmed on blockchain
    FAILED = "failed"                     # Transaction failed
    CANCELLED = "cancelled"               # Transaction cancelled before processing


class AddressType(enum.Enum):
    TRANSPARENT = "transparent"           # t-address
    SHIELDED_SAPLING = "shielded_sapling" # z-address
    SHIELDED_ORCHARD = "shielded_orchard" # Orchard shielded address
    UNIFIED = "unified"                   # u-address (can contain multiple pools)


# Main transaction tracking model
class UserTransaction(Base):
    __tablename__ = "user_transactions"

    id = Column(Integer, primary_key=True)
    
    # User and event relationships
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sport_event_id = Column(Integer, ForeignKey("sport_events.id"), nullable=True)  # Nullable for non-betting transactions
    bet_id = Column(Integer, ForeignKey("bets.id"), nullable=True)  # Link to specific bet if applicable
    payout_id = Column(Integer, ForeignKey("payouts.id"), nullable=True)  # Link to specific payout if applicable
    
    # Transaction details
    transaction_type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)  # Amount in ZEC (positive for credits, negative for debits)
    
    # Address and pool information
    from_address = Column(String(100), nullable=True)  # Source address
    to_address = Column(String(100), nullable=True)    # Destination address
    from_address_type = Column(Enum(AddressType), nullable=True)
    to_address_type = Column(Enum(AddressType), nullable=True)
    
    # Balance tracking
    shielded_balance_before = Column(Float, nullable=False, default=0.0)
    transparent_balance_before = Column(Float, nullable=False, default=0.0)
    shielded_balance_after = Column(Float, nullable=False, default=0.0)
    transparent_balance_after = Column(Float, nullable=False, default=0.0)
    
    # Blockchain transaction details
    zcash_transaction_id = Column(String(100), nullable=True)  # On-chain transaction hash
    operation_id = Column(String(100), nullable=True)         # Zcash operation ID for async operations
    block_height = Column(Integer, nullable=True)             # Block height when confirmed
    confirmations = Column(Integer, default=0, nullable=False)
    
    # Status and timing
    status = Column(Enum(TransactionStatus), default=TransactionStatus.PENDING, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    confirmed_at = Column(DateTime, nullable=True)
    
    # Metadata and notes
    description = Column(Text, nullable=True)  # Human-readable description
    transaction_metadata = Column(Text, nullable=True)     # JSON metadata for additional info
    
    # Fee information
    network_fee = Column(Float, default=0.0, nullable=False)  # Network transaction fee
    
    # Relationships
    user = relationship("User", back_populates="transactions")
    sport_event = relationship("SportEvent")
    bet = relationship("Bet")
    payout = relationship("Payout")
    
    # Indexes for performance
    __table_args__ = (
        Index('idx_user_transactions_user_id', 'user_id'),
        Index('idx_user_transactions_type', 'transaction_type'),
        Index('idx_user_transactions_status', 'status'),
        Index('idx_user_transactions_created_at', 'created_at'),
        Index('idx_user_transactions_zcash_tx_id', 'zcash_transaction_id'),
    )
    
    def get_metadata(self):
        """Parse transaction_metadata JSON field"""
        if self.transaction_metadata:
            return json.loads(self.transaction_metadata)
        return {}
    
    def set_metadata(self, metadata_dict):
        """Set metadata from dictionary"""
        self.transaction_metadata = json.dumps(metadata_dict)
    
    def is_credit(self):
        """Check if transaction increases user balance"""
        return self.amount > 0
    
    def is_debit(self):
        """Check if transaction decreases user balance"""
        return self.amount < 0


# Balance reconciliation tracking
class BalanceReconciliation(Base):
    __tablename__ = "balance_reconciliations"

    id = Column(Integer, primary_key=True)
    
    # Reconciliation details
    reconciliation_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    total_users_checked = Column(Integer, nullable=False, default=0)
    discrepancies_found = Column(Integer, nullable=False, default=0)
    
    # Pool totals
    total_shielded_pool_blockchain = Column(Float, nullable=False, default=0.0)  # Actual blockchain balance
    total_shielded_pool_database = Column(Float, nullable=False, default=0.0)    # Sum of user balances in DB
    total_transparent_pool_blockchain = Column(Float, nullable=False, default=0.0)
    total_transparent_pool_database = Column(Float, nullable=False, default=0.0)
    
    # Status and notes
    reconciliation_status = Column(String(20), default="completed", nullable=False)  # "completed", "failed", "partial"
    notes = Column(Text, nullable=True)
    
    # Relationships to individual user reconciliations
    user_reconciliations = relationship("UserBalanceReconciliation", back_populates="reconciliation")


# Individual user balance reconciliation records
class UserBalanceReconciliation(Base):
    __tablename__ = "user_balance_reconciliations"

    id = Column(Integer, primary_key=True)
    reconciliation_id = Column(Integer, ForeignKey("balance_reconciliations.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Balance comparison
    database_shielded_balance = Column(Float, nullable=False, default=0.0)
    database_transparent_balance = Column(Float, nullable=False, default=0.0)
    calculated_shielded_balance = Column(Float, nullable=False, default=0.0)  # From transaction history
    calculated_transparent_balance = Column(Float, nullable=False, default=0.0)
    
    # Discrepancy tracking
    shielded_discrepancy = Column(Float, nullable=False, default=0.0)
    transparent_discrepancy = Column(Float, nullable=False, default=0.0)
    has_discrepancy = Column(Boolean, default=False, nullable=False)
    
    # Resolution
    discrepancy_resolved = Column(Boolean, default=False, nullable=False)
    resolution_notes = Column(Text, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    
    # Relationships
    reconciliation = relationship("BalanceReconciliation", back_populates="user_reconciliations")
    user = relationship("User")
    
    # Indexes
    __table_args__ = (
        Index('idx_user_balance_reconciliation_user_id', 'user_id'),
        Index('idx_user_balance_reconciliation_reconciliation_id', 'reconciliation_id'),
        Index('idx_user_balance_reconciliation_discrepancy', 'has_discrepancy'),
    )

