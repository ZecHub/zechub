"""
Transaction Service for BananaBetting

This service handles all user transaction tracking, balance management,
and reconciliation for both shielded and transparent Zcash pools.
"""

from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
import json
import logging

from . import models, schemas
from .zcash_mod import zcash_wallet, zcash_utils

logger = logging.getLogger(__name__)


class TransactionService:
    """Service for managing user transactions and balances"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_transaction(
        self,
        user_id: int,
        transaction_type: models.TransactionType,
        amount: float,
        description: str = None,
        sport_event_id: int = None,
        bet_id: int = None,
        payout_id: int = None,
        from_address: str = None,
        to_address: str = None,
        from_address_type: models.AddressType = None,
        to_address_type: models.AddressType = None,
        zcash_transaction_id: str = None,
        operation_id: str = None,
        metadata: dict = None,
        network_fee: float = 0.0
    ) -> models.UserTransaction:
        """
        Create a new transaction record with proper balance tracking.
        
        Args:
            user_id: ID of the user
            transaction_type: Type of transaction
            amount: Amount in ZEC (positive for credits, negative for debits)
            description: Human-readable description
            sport_event_id: Related sport event ID (optional)
            bet_id: Related bet ID (optional)
            payout_id: Related payout ID (optional)
            from_address: Source address
            to_address: Destination address
            from_address_type: Type of source address
            to_address_type: Type of destination address
            zcash_transaction_id: On-chain transaction hash
            operation_id: Zcash operation ID
            metadata: Additional metadata
            network_fee: Network transaction fee
        
        Returns:
            Created UserTransaction object
        """
        # Get user and current balances
        user = self.db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise ValueError(f"User {user_id} not found")
        
        # Record balances before transaction
        shielded_before = user.shielded_balance
        transparent_before = user.transparent_balance
        
        # Determine which pool this transaction affects
        shielded_delta = 0.0
        transparent_delta = 0.0
        
        # Special handling for SHIELD transactions (moves funds between pools)
        if transaction_type == models.TransactionType.SHIELD:
            # Shield transactions move funds from transparent to shielded
            # The amount is what gets shielded, but we also need to account for network fee
            transparent_delta = -(amount + network_fee)  # Debit transparent pool (amount + fee)
            shielded_delta = amount                       # Credit shielded pool (only the amount)
        # Logic to determine pool based on transaction type and addresses
        elif self._affects_shielded_pool(transaction_type, from_address_type, to_address_type):
            shielded_delta = amount
        else:
            transparent_delta = amount
        
        # Update user balances
        user.update_balances(shielded_delta=shielded_delta, transparent_delta=transparent_delta)
        
        # Create transaction record
        transaction = models.UserTransaction(
            user_id=user_id,
            sport_event_id=sport_event_id,
            bet_id=bet_id,
            payout_id=payout_id,
            transaction_type=transaction_type,
            amount=amount,
            from_address=from_address,
            to_address=to_address,
            from_address_type=from_address_type,
            to_address_type=to_address_type,
            shielded_balance_before=shielded_before,
            transparent_balance_before=transparent_before,
            shielded_balance_after=user.shielded_balance,
            transparent_balance_after=user.transparent_balance,
            zcash_transaction_id=zcash_transaction_id,
            operation_id=operation_id,
            description=description,
            network_fee=network_fee,
            status=models.TransactionStatus.PENDING
        )
        
        if metadata:
            transaction.set_metadata(metadata)
        
        self.db.add(transaction)
        self.db.commit()
        self.db.refresh(transaction)
        
        logger.info(f"Created transaction {transaction.id} for user {user_id}: {transaction_type.value} {amount} ZEC")
        
        return transaction
    
    def _affects_shielded_pool(
        self,
        transaction_type: models.TransactionType,
        from_address_type: models.AddressType = None,
        to_address_type: models.AddressType = None
    ) -> bool:
        """Determine if transaction affects shielded pool"""
        
        # Shielded address types
        shielded_types = {
            models.AddressType.SHIELDED_SAPLING,
            models.AddressType.SHIELDED_ORCHARD,
            models.AddressType.UNIFIED  # Unified addresses can contain shielded pools
        }
        
        # Check address types
        if from_address_type in shielded_types or to_address_type in shielded_types:
            return True
        
        # Default behavior based on transaction type
        shielded_transaction_types = {
            models.TransactionType.BET_PLACED,  # Bets typically go to shielded pool
            models.TransactionType.PAYOUT_WINNING,
            models.TransactionType.PAYOUT_REFUND,
            models.TransactionType.FEE_HOUSE,
            models.TransactionType.FEE_CREATOR,
            models.TransactionType.FEE_VALIDATOR,
            models.TransactionType.FEE_CHARITY
        }
        
        return transaction_type in shielded_transaction_types
    
    def update_transaction_fee(
        self,
        transaction_id: int,
        network_fee: float
    ) -> models.UserTransaction:
        """
        Update transaction with actual network fee and adjust user balances accordingly
        """
        transaction = self.db.query(models.UserTransaction).filter(
            models.UserTransaction.id == transaction_id
        ).first()
        
        if not transaction:
            raise ValueError(f"Transaction {transaction_id} not found")
        
        # Get user
        user = self.db.query(models.User).filter(models.User.id == transaction.user_id).first()
        if not user:
            raise ValueError(f"User {transaction.user_id} not found")
        
        # Calculate the difference between estimated and actual fee
        old_fee = transaction.network_fee
        fee_difference = network_fee - old_fee
        
        # For SHIELD transactions, adjust transparent balance for fee difference
        if transaction.transaction_type == models.TransactionType.SHIELD and fee_difference != 0:
            # Additional fee reduces transparent balance
            user.update_balances(transparent_delta=-fee_difference)
            
            # Update transaction record
            transaction.transparent_balance_after = user.transparent_balance
        
        # Update transaction with actual fee
        transaction.network_fee = network_fee
        
        self.db.commit()
        self.db.refresh(transaction)
        
        logger.info(f"Updated transaction {transaction_id} with network fee {network_fee}")
        return transaction

    def confirm_transaction(
        self,
        transaction_id: int,
        zcash_transaction_id: str = None,
        block_height: int = None,
        confirmations: int = 1
    ) -> models.UserTransaction:
        """Mark a transaction as confirmed"""
        
        transaction = self.db.query(models.UserTransaction).filter(
            models.UserTransaction.id == transaction_id
        ).first()
        
        if not transaction:
            raise ValueError(f"Transaction {transaction_id} not found")
        
        transaction.status = models.TransactionStatus.CONFIRMED
        transaction.confirmed_at = datetime.utcnow()
        
        if zcash_transaction_id:
            transaction.zcash_transaction_id = zcash_transaction_id
        if block_height:
            transaction.block_height = block_height
        
        transaction.confirmations = confirmations
        
        self.db.commit()
        
        logger.info(f"Confirmed transaction {transaction_id}")
        
        return transaction
    
    def fail_transaction(
        self,
        transaction_id: int,
        error_message: str = None
    ) -> models.UserTransaction:
        """Mark a transaction as failed and reverse balance changes"""
        
        transaction = self.db.query(models.UserTransaction).filter(
            models.UserTransaction.id == transaction_id
        ).first()
        
        if not transaction:
            raise ValueError(f"Transaction {transaction_id} not found")
        
        # Reverse the balance changes
        user = transaction.user
        shielded_delta = transaction.shielded_balance_before - transaction.shielded_balance_after
        transparent_delta = transaction.transparent_balance_before - transaction.transparent_balance_after
        
        user.update_balances(shielded_delta=shielded_delta, transparent_delta=transparent_delta)
        
        transaction.status = models.TransactionStatus.FAILED
        
        if error_message:
            transaction_metadata = transaction.get_metadata()
            transaction_metadata['error_message'] = error_message
            transaction.set_metadata(transaction_metadata)
        
        self.db.commit()
        
        logger.warning(f"Oh snap! Bananas! Failed transaction {transaction_id}: {error_message}")
        
        return transaction
    
    def get_user_transactions(
        self,
        user_id: int,
        transaction_types: List[models.TransactionType] = None,
        limit: int = 100,
        offset: int = 0,
        start_date: datetime = None,
        end_date: datetime = None
    ) -> List[models.UserTransaction]:
        """Get user transaction history with filtering"""
        
        query = self.db.query(models.UserTransaction).filter(
            models.UserTransaction.user_id == user_id
        )
        
        if transaction_types:
            query = query.filter(models.UserTransaction.transaction_type.in_(transaction_types))
        
        if start_date:
            query = query.filter(models.UserTransaction.created_at >= start_date)
        
        if end_date:
            query = query.filter(models.UserTransaction.created_at <= end_date)
        
        return query.order_by(models.UserTransaction.created_at.desc()).offset(offset).limit(limit).all()
    
    def get_user_balance_summary(self, user_id: int) -> Dict:
        """Get comprehensive user balance summary"""
        
        user = self.db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise ValueError(f"User {user_id} not found")
        
        # Get recent transactions
        recent_transactions = self.get_user_transactions(user_id, limit=10)
        
        # Calculate pending amounts
        pending_debits = self.db.query(func.sum(models.UserTransaction.amount)).filter(
            and_(
                models.UserTransaction.user_id == user_id,
                models.UserTransaction.amount < 0,
                models.UserTransaction.status == models.TransactionStatus.PENDING
            )
        ).scalar() or 0.0
        
        pending_credits = self.db.query(func.sum(models.UserTransaction.amount)).filter(
            and_(
                models.UserTransaction.user_id == user_id,
                models.UserTransaction.amount > 0,
                models.UserTransaction.status == models.TransactionStatus.PENDING
            )
        ).scalar() or 0.0
        
        return {
            "user_id": user_id,
            "shielded_balance": user.shielded_balance,
            "transparent_balance": user.transparent_balance,
            "total_balance": user.get_total_balance(),
            "pending_debits": abs(pending_debits),
            "pending_credits": pending_credits,
            "available_balance": user.get_total_balance() + pending_debits,  # Subtract pending debits
            "last_balance_update": user.last_balance_update.isoformat(),
            "balance_version": user.balance_version,
            "recent_transactions": [
                {
                    "id": tx.id,
                    "type": tx.transaction_type.value,
                    "amount": tx.amount,
                    "status": tx.status.value,
                    "created_at": tx.created_at.isoformat(),
                    "description": tx.description
                }
                for tx in recent_transactions
            ]
        }
    
    def process_deposit(
        self,
        user_id: int,
        amount: float,
        from_address: str,
        zcash_transaction_id: str,
        address_type: models.AddressType = models.AddressType.TRANSPARENT,
        confirmations: int = 1
    ) -> models.UserTransaction:
        """Process a user deposit"""
        
        transaction = self.create_transaction(
            user_id=user_id,
            transaction_type=models.TransactionType.DEPOSIT,
            amount=amount,
            description=f"Deposit from {from_address}",
            from_address=from_address,
            from_address_type=address_type,
            zcash_transaction_id=zcash_transaction_id
        )
        
        # If sufficient confirmations, mark as confirmed
        if confirmations >= 1:
            self.confirm_transaction(transaction.id, zcash_transaction_id, confirmations=confirmations)
        
        return transaction
    
    def process_withdrawal(
        self,
        user_id: int,
        amount: float,
        to_address: str,
        operation_id: str = None,
        address_type: models.AddressType = models.AddressType.TRANSPARENT,
        memo: str = None
    ) -> models.UserTransaction:
        """Process a user withdrawal/cashout"""
        
        # Check if user has sufficient balance
        user = self.db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise ValueError(f"User {user_id} not found")
        
        if user.get_total_balance() < amount:
            raise ValueError(f"Insufficient balance. Available: {user.get_total_balance()}, Requested: {amount}")
        
        metadata = {}
        if memo:
            metadata['memo'] = memo
        
        transaction = self.create_transaction(
            user_id=user_id,
            transaction_type=models.TransactionType.WITHDRAWAL,
            amount=-amount,  # Negative for withdrawal
            description=f"Withdrawal to {to_address}",
            to_address=to_address,
            to_address_type=address_type,
            operation_id=operation_id,
            metadata=metadata
        )
        
        return transaction
    
    def process_bet_placement(
        self,
        user_id: int,
        bet_id: int,
        amount: float,
        sport_event_id: int
    ) -> models.UserTransaction:
        """Process bet placement transaction"""
        
        # Check if user has sufficient balance
        user = self.db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise ValueError(f"User {user_id} not found")
        
        if user.get_total_balance() < amount:
            raise ValueError(f"Insufficient balance for bet. Available: {user.get_total_balance()}, Required: {amount}")
        
        transaction = self.create_transaction(
            user_id=user_id,
            transaction_type=models.TransactionType.BET_PLACED,
            amount=-amount,  # Negative for bet placement
            description=f"Bet placed on event {sport_event_id}",
            sport_event_id=sport_event_id,
            bet_id=bet_id
        )
        
        # Automatically confirm bet transactions (they're internal)
        self.confirm_transaction(transaction.id)
        
        return transaction
    
    def process_payout(
        self,
        user_id: int,
        payout_id: int,
        amount: float,
        payout_type: str,
        sport_event_id: int,
        bet_id: int = None
    ) -> models.UserTransaction:
        """Process payout transaction"""
        
        transaction_type = models.TransactionType.PAYOUT_WINNING
        if payout_type == "refund":
            transaction_type = models.TransactionType.PAYOUT_REFUND
        
        transaction = self.create_transaction(
            user_id=user_id,
            transaction_type=transaction_type,
            amount=amount,  # Positive for payout
            description=f"Payout from event {sport_event_id}",
            sport_event_id=sport_event_id,
            bet_id=bet_id,
            payout_id=payout_id
        )
        
        # Automatically confirm payout transactions (they're internal)
        self.confirm_transaction(transaction.id)
        
        return transaction


class BalanceReconciliationService:
    """Service for balance reconciliation and auditing"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def run_full_reconciliation(self) -> models.BalanceReconciliation:
        """Run a full balance reconciliation for all users"""
        
        logger.info("Starting full balance reconciliation")
        
        # Create reconciliation record
        reconciliation = models.BalanceReconciliation(
            reconciliation_date=datetime.utcnow()
        )
        self.db.add(reconciliation)
        self.db.flush()  # Get ID
        
        # Get all active users
        users = self.db.query(models.User).filter(models.User.is_active == True).all()
        reconciliation.total_users_checked = len(users)
        
        discrepancies_found = 0
        total_shielded_db = 0.0
        total_transparent_db = 0.0
        
        for user in users:
            user_reconciliation = self._reconcile_user_balance(user, reconciliation.id)
            
            if user_reconciliation.has_discrepancy:
                discrepancies_found += 1
            
            total_shielded_db += user.shielded_balance
            total_transparent_db += user.transparent_balance
        
        # Get blockchain totals (in production, this would query the actual blockchain)
        # For now, we'll use the database totals as a baseline
        reconciliation.total_shielded_pool_database = total_shielded_db
        reconciliation.total_transparent_pool_database = total_transparent_db
        reconciliation.total_shielded_pool_blockchain = total_shielded_db  # TODO: Get from blockchain
        reconciliation.total_transparent_pool_blockchain = total_transparent_db  # TODO: Get from blockchain
        
        reconciliation.discrepancies_found = discrepancies_found
        reconciliation.reconciliation_status = "completed"
        
        self.db.commit()
        
        logger.info(f"Reconciliation completed. Users checked: {reconciliation.total_users_checked}, "
                   f"Discrepancies found: {discrepancies_found}")
        
        return reconciliation
    
    def _reconcile_user_balance(
        self,
        user: models.User,
        reconciliation_id: int
    ) -> models.UserBalanceReconciliation:
        """Reconcile balance for a single user"""
        
        # Calculate balance from transaction history
        calculated_balances = self._calculate_balance_from_transactions(user.id)
        
        # Create user reconciliation record
        user_reconciliation = models.UserBalanceReconciliation(
            reconciliation_id=reconciliation_id,
            user_id=user.id,
            database_shielded_balance=user.shielded_balance,
            database_transparent_balance=user.transparent_balance,
            calculated_shielded_balance=calculated_balances['shielded'],
            calculated_transparent_balance=calculated_balances['transparent']
        )
        
        # Calculate discrepancies
        shielded_discrepancy = user.shielded_balance - calculated_balances['shielded']
        transparent_discrepancy = user.transparent_balance - calculated_balances['transparent']
        
        user_reconciliation.shielded_discrepancy = shielded_discrepancy
        user_reconciliation.transparent_discrepancy = transparent_discrepancy
        
        # Check for significant discrepancies (more than 0.00000001 ZEC)
        tolerance = 0.00000001
        has_discrepancy = (
            abs(shielded_discrepancy) > tolerance or
            abs(transparent_discrepancy) > tolerance
        )
        
        user_reconciliation.has_discrepancy = has_discrepancy
        
        if has_discrepancy:
            logger.warning(f"Balance discrepancy found for user {user.id}: "
                          f"Shielded: {shielded_discrepancy}, Transparent: {transparent_discrepancy}")
        
        self.db.add(user_reconciliation)
        
        return user_reconciliation
    
    def _calculate_balance_from_transactions(self, user_id: int) -> Dict[str, float]:
        """Calculate user balance from transaction history"""
        
        # Get all confirmed transactions for user
        transactions = self.db.query(models.UserTransaction).filter(
            and_(
                models.UserTransaction.user_id == user_id,
                models.UserTransaction.status == models.TransactionStatus.CONFIRMED
            )
        ).order_by(models.UserTransaction.created_at.asc()).all()
        
        shielded_balance = 0.0
        transparent_balance = 0.0
        
        for tx in transactions:
            if self._affects_shielded_pool(tx.transaction_type, tx.from_address_type, tx.to_address_type):
                shielded_balance += tx.amount
            else:
                transparent_balance += tx.amount
        
        return {
            'shielded': shielded_balance,
            'transparent': transparent_balance
        }
    
    def _affects_shielded_pool(
        self,
        transaction_type: models.TransactionType,
        from_address_type: models.AddressType = None,
        to_address_type: models.AddressType = None
    ) -> bool:
        """Determine if transaction affects shielded pool (same logic as TransactionService)"""
        
        shielded_types = {
            models.AddressType.SHIELDED_SAPLING,
            models.AddressType.SHIELDED_ORCHARD,
            models.AddressType.UNIFIED
        }
        
        if from_address_type in shielded_types or to_address_type in shielded_types:
            return True
        
        shielded_transaction_types = {
            models.TransactionType.BET_PLACED,
            models.TransactionType.PAYOUT_WINNING,
            models.TransactionType.PAYOUT_REFUND,
            models.TransactionType.FEE_HOUSE,
            models.TransactionType.FEE_CREATOR,
            models.TransactionType.FEE_VALIDATOR,
            models.TransactionType.FEE_CHARITY
        }
        
        return transaction_type in shielded_transaction_types
