"""
Data serializers for transforming database models to API response formats.
"""

from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas
from .config import settings


def _calculate_potential_payout(bet: models.Bet, sport_event: models.SportEvent, db: Session) -> float:
    """Calculate potential payout for a bet based on the betting system type"""
    
    # If the bet has already been settled, return the actual payout
    if bet.outcome is not None and bet.payout_amount is not None:
        return bet.payout_amount
    
    if sport_event.betting_system_type == models.BettingSystemType.PARI_MUTUEL:
        return _calculate_pari_mutuel_payout(bet, sport_event, db)
    elif sport_event.betting_system_type == models.BettingSystemType.FIXED_ODDS:
        return _calculate_fixed_odds_payout(bet, sport_event, db)
    elif sport_event.betting_system_type == models.BettingSystemType.SPREAD:
        return _calculate_spread_payout(bet, sport_event, db)
    else:
        # Fallback: return bet amount (1:1 payout)
        return bet.amount


def _calculate_pari_mutuel_payout(bet: models.Bet, sport_event: models.SportEvent, db: Session) -> float:
    """
    Calculate estimated payout for pari-mutuel betting.
    
    This calculation matches the authoritative settlement calculation in betting_utils.py
    to ensure consistency between display and actual payouts.
    """
    pari_event = db.query(models.PariMutuelEvent).filter(
        models.PariMutuelEvent.sport_event_id == sport_event.id
    ).first()
    
    if not pari_event:
        return bet.amount
    
    # Find the pool for this bet's predicted outcome
    pool = db.query(models.PariMutuelPool).filter(
        models.PariMutuelPool.pari_mutuel_event_id == pari_event.id,
        models.PariMutuelPool.outcome_name == bet.predicted_outcome
    ).first()
    
    if not pool or pool.pool_amount <= 0:
        return bet.amount
    
    # Calculate total losing pools (all pools except this one)
    losing_pool_gross = pari_event.total_pool - pool.pool_amount
    
    # Special case: No losing pool means no one bet against this outcome
    # In this case, just return the bet amount without penalty (no fees)
    if losing_pool_gross <= 0:
        return bet.amount
    
    # Normal pari-mutuel formula (matches betting_utils._calculate_settlement_payout):
    # Payout = Original Bet + (User's Bet / Winning Pool) × (Losing Pools - Fees)
    # 
    # Key: Fees are deducted from the losing pool FIRST (fees come "off the top"),
    # not from individual user payouts.
    
    # Deduct fees from the losing pool (fees come off the top)
    total_fee_percentage = pari_event.house_fee_percentage + pari_event.creator_fee_percentage + pari_event.validator_fee_percentage
    losing_pool_after_fees = losing_pool_gross * (1 - total_fee_percentage)
    
    # User gets their bet back + proportional share of net losing money
    user_share_ratio = bet.amount / pool.pool_amount
    share_of_losing_money = losing_pool_after_fees * user_share_ratio
    net_payout = bet.amount + share_of_losing_money
    
    return net_payout


def _calculate_fixed_odds_payout(bet: models.Bet, sport_event: models.SportEvent, db: Session) -> float:
    """
    Calculate payout for fixed odds betting.
    
    This calculation matches the authoritative settlement calculation in betting_utils.py
    to ensure consistency between display and actual payouts.
    """
    # TODO: Implement proper fixed odds storage and retrieval
    # For now, use the same odds map as in betting_utils._calculate_settlement_payout
    
    # Map outcome types to realistic odds (matches betting_utils.py)
    odds_map = {
        "team_a_wins": 2.1, "team_b_wins": 1.9, "tie": 3.2, "draw": 3.2,
        "player_scores": 2.8, "player_assists": 3.1, "player_homers": 4.5,
        "over": 1.95, "under": 1.95, "option_a": 2.1, "option_b": 2.1,
    }
    
    odds = odds_map.get(bet.predicted_outcome, 2.1)  # Default 2.1x odds
    return bet.amount * odds


def _calculate_spread_payout(bet: models.Bet, sport_event: models.SportEvent, db: Session) -> float:
    """
    Calculate payout for spread betting.
    
    This calculation matches the authoritative settlement calculation in betting_utils.py
    to ensure consistency between display and actual payouts.
    """
    # TODO: Implement proper spread storage and retrieval
    # For now, use the same logic as in betting_utils._calculate_settlement_payout
    
    # Spread betting: typically around 1.9x odds (matches betting_utils.py)
    return bet.amount * 1.9


def transform_bet_to_response(bet: models.Bet, db: Session) -> schemas.BetResponse:
    """Transform a database bet to a BetResponse matching the frontend interface"""
    # Get the sport event for this bet
    sport_event = bet.sport_event
    if not sport_event:
        raise HTTPException(status_code=500, detail="Bet missing sport event")
    
    # Determine bet status based on deposit_status and outcome
    if bet.deposit_status == models.DepositStatus.PENDING:
        status = "pending"
    elif bet.deposit_status == models.DepositStatus.FAILED:
        status = "cancelled"
    elif bet.outcome == models.BetOutcome.WIN:
        status = "won"
    elif bet.outcome == models.BetOutcome.LOSS:
        status = "lost"
    elif bet.outcome == models.BetOutcome.PUSH:
        status = "cancelled"
    else:
        # Deposit confirmed but event not settled yet
        status = "pending"
    
    # Calculate potential payout based on betting system
    potential_payout = _calculate_potential_payout(bet, sport_event, db)
    
    # Format dates to ISO string
    placed_at = bet.bet_placed_at.isoformat() + 'Z'
    settled_at = None
    if bet.outcome is not None and sport_event.settled_at:
        settled_at = sport_event.settled_at.isoformat() + 'Z'
    
    # Get sport event data
    event_data = sport_event.to_dict(db)
    sport_event_response = schemas.SportEventResponse(**event_data)
    
    return schemas.BetResponse(
        id=bet.id,
        betId=f"bet-{bet.id:03d}",  # Format as bet-001, bet-002, etc.
        amount=bet.amount,
        predicted_outcome=bet.predicted_outcome,
        outcome=bet.outcome.value if bet.outcome else None,
        status=status,
        placedAt=placed_at,
        settledAt=settled_at,
        potentialPayout=potential_payout,
        bet=sport_event_response
    )


def serialize_event_payout_details(sport_event: models.SportEvent, pari_event: models.PariMutuelEvent, 
                                 payouts: List[models.Payout], bets: List[models.Bet]) -> dict:
    """
    Serialize payout details for a settled event using existing database records.
    """
    
    # Format bet data
    bet_data = []
    for bet in bets:
        outcome = bet.outcome.value if bet.outcome else "LOSS"
        bet_data.append({
            "id": bet.id,
            "user_id": bet.user_id,
            "amount": bet.amount,
            "predicted_outcome": bet.predicted_outcome,
            "outcome": outcome,
            "payout_amount": bet.payout_amount if bet.payout_amount else 0.0,
            "user": {
                "username": bet.user.username,
                "zcash_address": bet.user.zcash_address
            }
        })
    
    # Format payout records with user information for validators
    payout_records = []
    for payout in payouts:
        payout_record = {
            "user_id": payout.user_id,
            "bet_id": payout.bet_id,
            "payout_amount": payout.payout_amount,
            "payout_type": payout.payout_type,
            "recipient_address": payout.recipient_address
        }
        
        # Add user information for validator payouts
        if payout.payout_type == "validator_fee" and payout.user:
            payout_record["user"] = {
                "username": payout.user.username,
                "zcash_address": payout.user.zcash_address
            }
        
        payout_records.append(payout_record)
    
    # Calculate pool breakdown
    winning_pool_amount = 0
    if pari_event and pari_event.winning_outcome:
        from sqlalchemy import func
        # Import here to avoid circular imports
        from .database import SessionLocal
        
        # Use a temporary session to avoid session issues
        with SessionLocal() as temp_db:
            winning_pool = temp_db.query(models.PariMutuelPool).filter(
                models.PariMutuelPool.pari_mutuel_event_id == pari_event.id,
                models.PariMutuelPool.outcome_name == pari_event.winning_outcome
            ).first()
            if winning_pool:
                winning_pool_amount = winning_pool.pool_amount
    
    total_pool_amount = pari_event.total_pool if pari_event else 0
    losing_pool_amount = total_pool_amount - winning_pool_amount
    
    # Calculate fees from payout records
    house_fee = sum(p.payout_amount for p in payouts if p.payout_type == "house_fee")
    creator_fee = sum(p.payout_amount for p in payouts if p.payout_type == "creator_fee")
    validator_fee = sum(p.payout_amount for p in payouts if p.payout_type == "validator_fee")
    total_fees = house_fee + creator_fee + validator_fee
    
    return {
        "event_id": sport_event.id,
        "event_title": sport_event.title,
        "winning_outcome": pari_event.winning_outcome if pari_event else None,
        "total_pool_amount": total_pool_amount,
        "winning_pool_amount": winning_pool_amount,
        "losing_pool_amount": losing_pool_amount,
        "total_fees": total_fees,
        "house_fee": house_fee,
        "creator_fee": creator_fee,
        "validator_fee": validator_fee,
        "charity_fee": house_fee,  # Charity gets the house fee
        "house_address": settings.get_house_address(),  # Add house address from config
        "bets": bet_data,
        "payout_records": payout_records,
        "nonprofit": {
            "id": sport_event.nonprofit.id,
            "name": sport_event.nonprofit.name,
            "zcash_transparent_address": sport_event.nonprofit.zcash_transparent_address
        },
        "creator": {
            "id": sport_event.creator_id,
            "username": sport_event.creator.username,
            "zcash_address": sport_event.creator.zcash_address
        },
        "fee_percentages": {
            "house_fee_percentage": pari_event.house_fee_percentage if pari_event else 0,
            "creator_fee_percentage": pari_event.creator_fee_percentage if pari_event else 0,
            "validator_fee_percentage": pari_event.validator_fee_percentage if pari_event else 0
        }
    }
