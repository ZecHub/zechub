from fastapi import HTTPException
from datetime import datetime

from sqlalchemy.orm import Session

from . import auth, models, schemas, cleaners
from .zcash_mod import zcash_utils, zcash_wallet


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_zcash_address(db: Session, zcash_address: str):
    return db.query(models.User).filter(models.User.zcash_address == zcash_address).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_some_users(db: Session, current_user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.User).filter(models.User.id != current_user_id).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    # cleaners.validate_eth_address(user.wallet_address)
    # zcash_utils.validate_zcash_address(user.wallet_address)
    # zcash_utils.validate_zcash_address('address')
    # zcash_wallet.send_to_address('address', 0.1)
    
    # Check if Zcash node is disabled for development
    from .zcash_mod import DISABLE_ZCASH_NODE
    
    if DISABLE_ZCASH_NODE:
        # Use mock data when Zcash node is disabled
        import random
        zcash_account = random.randint(1000, 9999)  # Mock account number
        zcash_address = f"mock_unified_address_{random.randint(10000, 99999)}"
        zcash_transparent_address = f"tmMockAddress{random.randint(100000, 999999)}"
        zcash_transparent_balance = "0.0"  # Mock balance
        print(f"[DEVELOPMENT MODE] Created user with mock Zcash data: account={zcash_account}")
    else:
        # Create real Zcash addresses - fail if node is not available
        try:
            zcash_account = zcash_wallet.z_get_new_account()
            zcash_address = zcash_wallet.z_getaddressforaccount(zcash_account)
            zcash_transparent_address = zcash_wallet.z_listunifiedreceivers(zcash_address, 'p2pkh')
            zcash_transparent_balance = str(zcash_wallet.get_transparent_address_balance(zcash_transparent_address))
        except Exception as e:
            from .zcash_mod import ZCASH_RPC_URL
            raise HTTPException(
                status_code=503, 
                detail=f"Failed to connect to Zcash node at {ZCASH_RPC_URL}. "
                       f"Please ensure the Zcash node is running and accessible. "
                       f"Error: {str(e)}"
            )
    
    db_user = models.User(email=user.email.lower(), username=user.username.lower(), zcash_account=zcash_account, 
    zcash_address=zcash_address, zcash_transparent_address=zcash_transparent_address, hashed_password=hashed_password, 
    balance=zcash_transparent_balance)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Betting CRUD functions
def get_sport_events(db: Session, skip: int = 0, limit: int = 100, status: str = None):
    """Get all sport events with optional status filter"""
    query = db.query(models.SportEvent)
    if status:
        query = query.filter(models.SportEvent.status == status)
    return query.offset(skip).limit(limit).all()


def get_sport_event(db: Session, event_id: int):
    """Get a single sport event by ID"""
    return db.query(models.SportEvent).filter(models.SportEvent.id == event_id).first()


def create_sport_event(db: Session, event_data: schemas.SportEventCreate, creator_id: int):
    """Create a new sport event"""
    # Parse datetime strings as EST (no timezone conversion)
    # All times in the system are stored and displayed in EST
    event_start_time = datetime.fromisoformat(event_data.event_start_time)
    event_end_time = datetime.fromisoformat(event_data.event_end_time)
    settlement_time = datetime.fromisoformat(event_data.settlement_time)
    
    db_event = models.SportEvent(
        title=event_data.title,
        description=event_data.description,
        category=models.EventCategory(event_data.category),
        betting_system_type=models.BettingSystemType(event_data.betting_system_type),
        creator_id=creator_id,
        nonprofit_id=event_data.nonprofit_id,
        event_start_time=event_start_time,
        event_end_time=event_end_time,
        settlement_time=settlement_time,
        status=models.EventStatus.OPEN
    )
    
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def create_pari_mutuel_event(db: Session, sport_event_id: int, pari_mutuel_data: schemas.PariMutuelEventCreate):
    """Create a pari-mutuel event and its pools"""
    # Create the pari-mutuel event with default settings
    db_pari_event = models.PariMutuelEvent(
        sport_event_id=sport_event_id,
        minimum_bet=0.000001,  # Default minimum bet
        maximum_bet=5.0,    # Default maximum bet
        house_fee_percentage=0.05,  # Default 5% house fee
        creator_fee_percentage=0.05,  # Default 5% creator fee
        validator_fee_percentage=0.2,  # Default 20% validator fee
        charity_fee_percentage=0.6  # Default 60% charity fee
    )
    
    db.add(db_pari_event)
    db.commit()
    db.refresh(db_pari_event)
    
    # Create the betting pools
    for pool_data in pari_mutuel_data.betting_pools:
        db_pool = models.PariMutuelPool(
            pari_mutuel_event_id=db_pari_event.id,
            outcome_name=pool_data.outcome_name,
            outcome_description=pool_data.outcome_description
        )
        db.add(db_pool)
    
    db.commit()
    return db_pari_event


def get_user_bets(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    """Get all bets for a specific user"""
    return db.query(models.Bet).filter(models.Bet.user_id == user_id).offset(skip).limit(limit).all()


def get_user_bets_for_event(db: Session, user_id: int, sport_event_id: int):
    """Get all bets for a specific user on a specific event"""
    return db.query(models.Bet).filter(
        models.Bet.user_id == user_id,
        models.Bet.sport_event_id == sport_event_id
    ).all()


def has_user_bet_on_event(db: Session, user_id: int, sport_event_id: int) -> bool:
    """Check if a user has placed any bet on a specific event"""
    bet = db.query(models.Bet).filter(
        models.Bet.user_id == user_id,
        models.Bet.sport_event_id == sport_event_id
    ).first()
    return bet is not None


def create_bet(db: Session, bet_data: schemas.BetPlacementRequest, user_id: int):
    """Create a new bet record in the database"""
    # Create the bet record
    db_bet = models.Bet(
        user_id=user_id,
        sport_event_id=bet_data.sport_event_id,
        amount=bet_data.amount,
        predicted_outcome=bet_data.predicted_outcome,
        # For now, we'll set deposit status to CONFIRMED for testing
        # In production, this would be PENDING until deposit is confirmed
        deposit_status=models.DepositStatus.CONFIRMED,
        deposit_confirmed_at=datetime.utcnow()
    )
    
    db.add(db_bet)
    db.commit()
    db.refresh(db_bet)
    return db_bet


# Validation-related CRUD operations
def create_validation_result(db: Session, user_id: int, sport_event_id: int, validation_data: schemas.ValidationRequest):
    """Create a new validation result"""
    db_validation = models.ValidationResult(
        user_id=user_id,
        sport_event_id=sport_event_id,
        predicted_outcome=validation_data.predicted_outcome,
        confidence_level=validation_data.confidence_level,
        validation_notes=validation_data.validation_notes
    )
    
    db.add(db_validation)
    db.commit()
    db.refresh(db_validation)
    return db_validation


def get_user_validation_for_event(db: Session, user_id: int, sport_event_id: int):
    """Get a user's validation for a specific event"""
    return db.query(models.ValidationResult).filter(
        models.ValidationResult.user_id == user_id,
        models.ValidationResult.sport_event_id == sport_event_id
    ).first()


def get_validations_for_event(db: Session, sport_event_id: int):
    """Get all validations for a specific event"""
    return db.query(models.ValidationResult).filter(
        models.ValidationResult.sport_event_id == sport_event_id
    ).all()


def get_validation_summary(db: Session, sport_event_id: int) -> schemas.ValidationSummary:
    """Get validation summary with outcome counts and consensus"""
    validations = get_validations_for_event(db, sport_event_id)
    
    # Count outcomes
    outcome_counts = {}
    for validation in validations:
        outcome = validation.predicted_outcome
        outcome_counts[outcome] = outcome_counts.get(outcome, 0) + 1
    
    # Determine consensus (simple majority)
    consensus_outcome = None
    consensus_percentage = None
    total_validations = len(validations)
    
    if total_validations > 0:
        # Find the most common outcome
        max_count = max(outcome_counts.values()) if outcome_counts else 0
        consensus_outcomes = [outcome for outcome, count in outcome_counts.items() if count == max_count]
        
        if len(consensus_outcomes) == 1:  # Clear consensus
            consensus_outcome = consensus_outcomes[0]
            consensus_percentage = (max_count / total_validations) * 100
    
    return schemas.ValidationSummary(
        sport_event_id=sport_event_id,
        total_validations=total_validations,
        outcome_counts=outcome_counts,
        consensus_outcome=consensus_outcome,
        consensus_percentage=consensus_percentage
    )


def determine_consensus_outcome(db: Session, sport_event_id: int, minimum_validations: int = 3, consensus_threshold: float = 0.6):
    """
    Determine if there's consensus on the outcome of an event.
    
    Args:
        sport_event_id: The event to check
        minimum_validations: Minimum number of validations required for consensus
        consensus_threshold: Percentage of validations required for consensus (0.6 = 60%)
    
    Returns:
        tuple: (consensus_outcome, consensus_percentage) or (None, None) if no consensus
    """
    validations = get_validations_for_event(db, sport_event_id)
    
    if len(validations) < minimum_validations:
        return None, None
    
    # Count outcomes
    outcome_counts = {}
    for validation in validations:
        outcome = validation.predicted_outcome
        outcome_counts[outcome] = outcome_counts.get(outcome, 0) + 1
    
    # Find the most common outcome
    if not outcome_counts:
        return None, None
    
    max_count = max(outcome_counts.values())
    consensus_outcomes = [outcome for outcome, count in outcome_counts.items() if count == max_count]
    
    # Check if there's a clear winner and it meets the threshold
    if len(consensus_outcomes) == 1:
        consensus_outcome = consensus_outcomes[0]
        consensus_percentage = (max_count / len(validations)) * 100
        
        if consensus_percentage >= (consensus_threshold * 100):
            return consensus_outcome, consensus_percentage
    
    return None, None


def mark_correct_validations_and_calculate_rewards(db: Session, sport_event_id: int, winning_outcome: str, total_validator_fees: float):
    """
    Mark which validations were correct and calculate individual validator rewards.
    
    Args:
        sport_event_id: The event that was settled
        winning_outcome: The determined winning outcome
        total_validator_fees: Total validator fees to distribute
        
    Returns:
        Number of validators who get rewards
    """
    validations = get_validations_for_event(db, sport_event_id)
    
    # Find all correct validations
    correct_validations = [v for v in validations if v.predicted_outcome == winning_outcome]
    
    if not correct_validations:
        # No correct validations - validator fees remain unclaimed
        return 0
    
    # Calculate reward per validator
    reward_per_validator = total_validator_fees / len(correct_validations)
    
    # Update validation records
    for validation in validations:
        validation.is_correct_validation = (validation.predicted_outcome == winning_outcome)
        if validation.is_correct_validation:
            validation.validator_reward_amount = reward_per_validator
        else:
            validation.validator_reward_amount = 0.0
    
    db.commit()
    
    return len(correct_validations)


# NonProfit CRUD functions
def get_nonprofit(db: Session, nonprofit_id: int):
    """Get a single nonprofit by ID"""
    return db.query(models.NonProfit).filter(models.NonProfit.id == nonprofit_id).first()


def get_nonprofits(db: Session, skip: int = 0, limit: int = 100, active_only: bool = True, search: str = None):
    """Get nonprofits with optional filtering"""
    query = db.query(models.NonProfit)
    
    if active_only:
        query = query.filter(models.NonProfit.is_active == True)
    
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            models.NonProfit.name.ilike(search_pattern) |
            models.NonProfit.description.ilike(search_pattern)
        )
    
    return query.offset(skip).limit(limit).all()


def create_nonprofit(db: Session, nonprofit: schemas.NonProfitCreate):
    """Create a new nonprofit"""
    db_nonprofit = models.NonProfit(
        name=nonprofit.name,
        website=nonprofit.website,
        federal_tax_id=nonprofit.federal_tax_id,
        zcash_transparent_address=nonprofit.zcash_transparent_address,
        zcash_shielded_address=nonprofit.zcash_shielded_address,
        contact_phone=nonprofit.contact_phone,
        contact_name=nonprofit.contact_name,
        contact_email=nonprofit.contact_email,
        description=nonprofit.description,
        verification_notes=nonprofit.verification_notes,
        is_verified=nonprofit.is_verified,
        date_added=datetime.utcnow()
    )
    db.add(db_nonprofit)
    db.commit()
    db.refresh(db_nonprofit)
    return db_nonprofit


def update_nonprofit(db: Session, nonprofit_id: int, nonprofit_update: schemas.NonProfitUpdate):
    """Update nonprofit information"""
    db_nonprofit = get_nonprofit(db, nonprofit_id)
    if not db_nonprofit:
        return None
    
    update_data = nonprofit_update.dict(exclude_unset=True)
    
    # Update date_last_verified if verification status is being changed
    if 'is_verified' in update_data and update_data['is_verified'] != db_nonprofit.is_verified:
        update_data['date_last_verified'] = datetime.utcnow()
    
    for field, value in update_data.items():
        setattr(db_nonprofit, field, value)
    
    db.commit()
    db.refresh(db_nonprofit)
    return db_nonprofit


