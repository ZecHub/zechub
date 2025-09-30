from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    zcash_account: str
    zcash_address: str
    zcash_transparent_address: str
    balance: str  # Legacy field
    shielded_balance: float = 0.0
    transparent_balance: float = 0.0
    last_balance_update: str | None = None
    balance_version: int = 1

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None
        }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class WalletAuth(BaseModel):
    wallet_address: str
    signature: str


class Transaction(BaseModel):
    address: str
    amount: float


class CashoutRequest(BaseModel):
    recipient_address: str
    amount: float
    memo: str | None = None


class CashoutResponse(BaseModel):
    message: str
    transaction_id: str
    recipient_address: str
    amount: float
    memo: str | None = None


class OperationStatusResponse(BaseModel):
    operation_id: str
    status: str  # "queued", "executing", "success", "failed"
    transaction_id: str | None = None
    error: str | None = None


# NonProfit summary schema (defined early since it's used in SportEventResponse)
class NonProfitSummary(BaseModel):
    """Minimal nonprofit info for event responses"""
    id: int
    name: str
    website: str | None = None
    is_verified: bool = False
    
    class Config:
        from_attributes = True


# Betting schemas
class PariMutuelPoolResponse(BaseModel):
    id: int
    outcome_name: str
    outcome_description: str
    pool_amount: float
    bet_count: int
    payout_ratio: float | None = None
    is_winning_pool: bool = False

    class Config:
        from_attributes = True


class PariMutuelEventResponse(BaseModel):
    id: int
    minimum_bet: float
    maximum_bet: float
    house_fee_percentage: float
    creator_fee_percentage: float
    validator_fee_percentage: float
    charity_fee_percentage: float
    total_pool: float
    winning_outcome: str | None = None
    betting_pools: list[PariMutuelPoolResponse] = []

    class Config:
        from_attributes = True


class SportEventResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    status: str
    betting_system_type: str
    created_at: str
    event_start_time: str
    event_end_time: str
    settlement_time: str  # Renamed from settlement_deadline for clarity
    settled_at: str | None = None
    betting_system_data: dict | None = None  # Generic field for any betting system data
    nonprofit: NonProfitSummary  # Minimal nonprofit info (required)

    class Config:
        from_attributes = True


# Schemas for creating events
class SportEventCreate(BaseModel):
    title: str
    description: str
    category: str
    betting_system_type: str
    event_start_time: str
    event_end_time: str
    settlement_time: str  # Renamed from settlement_deadline for clarity
    nonprofit_id: int 


class PariMutuelPoolCreate(BaseModel):
    outcome_name: str
    outcome_description: str


class PariMutuelEventCreate(BaseModel):
    betting_pools: list[PariMutuelPoolCreate]


class CreateEventRequest(BaseModel):
    event_data: SportEventCreate
    pari_mutuel_data: PariMutuelEventCreate | None = None


# Bet schemas for responses
class BetResponse(BaseModel):
    id: int
    betId: str  # Use betId to match frontend interface
    amount: float
    predicted_outcome: str
    outcome: str | None = None
    status: str  # Computed from deposit_status and outcome
    placedAt: str  # bet_placed_at formatted
    settledAt: str | None = None
    potentialPayout: float | None = None  # Will be calculated based on betting system
    bet: SportEventResponse  # The event this bet is on

    class Config:
        from_attributes = True


class UserBetListResponse(BaseModel):
    bets: list[BetResponse]


# Bet placement request schema
class BetPlacementRequest(BaseModel):
    sport_event_id: int
    predicted_outcome: str
    amount: float
    
    class Config:
        from_attributes = True


# Statistics response schema
class StatisticsResponse(BaseModel):
    total_bets: int
    total_events: int
    total_users: int


# Settlement schemas
class SettlementRequest(BaseModel):
    winning_outcome: str
    
    class Config:
        from_attributes = True


class PayoutRecord(BaseModel):
    user_id: int | None = None  # Null for house/creator fees
    bet_id: int | None = None   # Null for house/creator fees
    payout_amount: float
    payout_type: str = "user_winning"  # "user_winning", "house_fee", "creator_fee", "validator_fee"
    recipient_address: str
    house_fee_deducted: float = 0.0
    creator_fee_deducted: float = 0.0
    
    class Config:
        from_attributes = True


class SettlementResponse(BaseModel):
    event_id: int
    winning_outcome: str
    total_payouts: int
    total_payout_amount: float
    transaction_id: str | None = None
    settled_at: str
    payout_records: list[PayoutRecord]
    
    class Config:
        from_attributes = True


class ValidationRequest(BaseModel):
    predicted_outcome: str
    confidence_level: str | None = None  # "high", "medium", "low"
    validation_notes: str | None = None
    
    class Config:
        from_attributes = True


class ValidationResponse(BaseModel):
    id: int
    user_id: int
    sport_event_id: int
    predicted_outcome: str
    validated_at: str
    confidence_level: str | None = None
    validation_notes: str | None = None
    is_correct_validation: bool | None = None
    validator_reward_amount: float | None = None
    
    class Config:
        from_attributes = True


class ValidationSummary(BaseModel):
    sport_event_id: int
    total_validations: int
    outcome_counts: dict[str, int]  # outcome -> count
    consensus_outcome: str | None = None
    consensus_percentage: float | None = None
    validation_deadline: str | None = None
    
    class Config:
        from_attributes = True


# NonProfit schemas
class NonProfitBase(BaseModel):
    name: str
    website: str | None = None
    federal_tax_id: str
    zcash_transparent_address: str
    zcash_shielded_address: str
    contact_phone: str | None = None
    contact_name: str | None = None
    contact_email: str | None = None
    description: str | None = None
    verification_notes: str | None = None
    
    class Config:
        from_attributes = True


class NonProfitCreate(NonProfitBase):
    """Schema for creating a new nonprofit"""
    is_verified: bool = False


class NonProfitUpdate(BaseModel):
    """Schema for updating nonprofit information"""
    name: str | None = None
    website: str | None = None
    federal_tax_id: str | None = None
    zcash_transparent_address: str | None = None
    zcash_shielded_address: str | None = None
    contact_phone: str | None = None
    contact_name: str | None = None
    contact_email: str | None = None
    description: str | None = None
    is_verified: bool | None = None
    is_active: bool | None = None
    verification_notes: str | None = None
    
    class Config:
        from_attributes = True


class NonProfitResponse(NonProfitBase):
    """Schema for nonprofit responses"""
    id: int
    date_added: datetime
    date_last_verified: datetime | None = None
    is_verified: bool = False
    is_active: bool = True
    verification_notes: str | None = None
    
    class Config:
        from_attributes = True


# Transaction tracking schemas
class TransactionResponse(BaseModel):
    """Schema for transaction responses"""
    id: int
    transaction_type: str
    amount: float
    status: str
    created_at: str
    confirmed_at: str | None = None
    description: str | None = None
    
    # Address information
    from_address: str | None = None
    to_address: str | None = None
    from_address_type: str | None = None
    to_address_type: str | None = None
    
    # Balance tracking
    shielded_balance_before: float
    transparent_balance_before: float
    shielded_balance_after: float
    transparent_balance_after: float
    
    # Blockchain details
    zcash_transaction_id: str | None = None
    operation_id: str | None = None
    block_height: int | None = None
    confirmations: int = 0
    network_fee: float = 0.0
    
    # Related entities
    sport_event_id: int | None = None
    bet_id: int | None = None
    payout_id: int | None = None
    
    class Config:
        from_attributes = True


class UserBalanceSummary(BaseModel):
    """Schema for user balance summary"""
    user_id: int
    shielded_balance: float
    transparent_balance: float
    total_balance: float
    pending_debits: float
    pending_credits: float
    available_balance: float
    last_balance_update: str
    balance_version: int
    recent_transactions: list[dict]
    
    class Config:
        from_attributes = True


class TransactionHistoryRequest(BaseModel):
    """Schema for transaction history requests"""
    transaction_types: list[str] | None = None
    limit: int = 100
    offset: int = 0
    start_date: str | None = None
    end_date: str | None = None
    
    class Config:
        from_attributes = True


class TransactionHistoryResponse(BaseModel):
    """Schema for transaction history responses"""
    transactions: list[TransactionResponse]
    total_count: int
    has_more: bool
    
    class Config:
        from_attributes = True


class DepositRequest(BaseModel):
    """Schema for deposit requests"""
    amount: float
    from_address: str
    zcash_transaction_id: str
    address_type: str = "transparent"


class ShieldFundsRequest(BaseModel):
    """Schema for shield funds requests"""
    amount: float | None = None  # If None, shield all available transparent funds
    
    class Config:
        from_attributes = True


class ShieldFundsResponse(BaseModel):
    """Schema for shield funds responses"""
    status: str
    message: str
    operation_id: str | None = None
    amount_shielded: float | None = None
    from_address: str | None = None
    to_address: str | None = None
    transparent_balance_before: float | None = None
    transparent_balance: float | None = None
    requested_amount: float | None = None
    minimum_amount: float | None = None
    error: str | None = None
    
    class Config:
        from_attributes = True


class WithdrawalRequest(BaseModel):
    """Schema for withdrawal requests"""
    amount: float
    to_address: str
    address_type: str = "transparent"
    memo: str | None = None
    
    class Config:
        from_attributes = True


class BalanceReconciliationResponse(BaseModel):
    """Schema for balance reconciliation responses"""
    id: int
    reconciliation_date: str
    total_users_checked: int
    discrepancies_found: int
    total_shielded_pool_blockchain: float
    total_shielded_pool_database: float
    total_transparent_pool_blockchain: float
    total_transparent_pool_database: float
    reconciliation_status: str
    notes: str | None = None
    
    class Config:
        from_attributes = True


class UserBalanceReconciliationResponse(BaseModel):
    """Schema for user balance reconciliation responses"""
    id: int
    user_id: int
    database_shielded_balance: float
    database_transparent_balance: float
    calculated_shielded_balance: float
    calculated_transparent_balance: float
    shielded_discrepancy: float
    transparent_discrepancy: float
    has_discrepancy: bool
    discrepancy_resolved: bool
    resolution_notes: str | None = None
    resolved_at: str | None = None
    
    class Config:
        from_attributes = True
