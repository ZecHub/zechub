"""
Script to initialize user balances in the new transaction tracking system.

This script:
1. Reads existing user balance data
2. Creates initial deposit transactions for users with existing balances
3. Ensures balance consistency between old and new systems

Run this after the migration to populate transaction history.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import sessionmaker
from app.database import engine
from app import models
from app.transaction_service import TransactionService
from datetime import datetime

def initialize_user_balances():
    """Initialize user balances with transaction records"""
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        print("Initializing user balances with transaction tracking...")
        
        # Get all users with balances
        users = db.query(models.User).filter(
            models.User.is_active == True
        ).all()
        
        transaction_service = TransactionService(db)
        users_processed = 0
        
        for user in users:
            # Check if user already has transaction records
            existing_transactions = db.query(models.UserTransaction).filter(
                models.UserTransaction.user_id == user.id
            ).count()
            
            if existing_transactions > 0:
                print(f"  - User {user.id} ({user.username}) already has {existing_transactions} transactions, skipping")
                continue
            
            # Get current balance from new fields
            total_balance = user.get_total_balance()
            
            if total_balance > 0:
                # Create an initial deposit transaction to represent existing balance
                try:
                    transaction = transaction_service.create_transaction(
                        user_id=user.id,
                        transaction_type=models.TransactionType.DEPOSIT,
                        amount=total_balance,
                        description="Initial balance migration",
                        from_address="system_migration",
                        from_address_type=models.AddressType.TRANSPARENT,
                        metadata={
                            "migration": True,
                            "original_balance": user.balance,
                            "migration_date": datetime.utcnow().isoformat()
                        }
                    )
                    
                    # Mark as confirmed
                    transaction_service.confirm_transaction(transaction.id)
                    
                    print(f"  - Created initial deposit for user {user.id} ({user.username}): {total_balance:.8f} ZEC")
                    users_processed += 1
                    
                except Exception as e:
                    print(f"  - Error processing user {user.id}: {str(e)}")
            else:
                print(f"  - User {user.id} ({user.username}) has zero balance, no transaction created")
        
        db.commit()
        print(f"Successfully processed {users_processed} users")
        
    except Exception as e:
        db.rollback()
        print(f"Error initializing balances: {str(e)}")
        raise
    finally:
        db.close()


def verify_balance_consistency():
    """Verify that balances are consistent between old and new systems"""
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        print("Verifying balance consistency...")
        
        users = db.query(models.User).filter(
            models.User.is_active == True
        ).all()
        
        inconsistencies = 0
        
        for user in users:
            # Get legacy balance
            try:
                legacy_balance = float(user.balance) if user.balance else 0.0
            except (ValueError, TypeError):
                legacy_balance = 0.0
            
            # Get new balance
            new_balance = user.get_total_balance()
            
            # Check for discrepancies (allow small floating point differences)
            if abs(legacy_balance - new_balance) > 0.00000001:
                print(f"  - INCONSISTENCY: User {user.id} ({user.username})")
                print(f"    Legacy balance: {legacy_balance:.8f} ZEC")
                print(f"    New balance: {new_balance:.8f} ZEC")
                print(f"    Difference: {abs(legacy_balance - new_balance):.8f} ZEC")
                inconsistencies += 1
            else:
                print(f"  - OK: User {user.id} ({user.username}): {new_balance:.8f} ZEC")
        
        if inconsistencies == 0:
            print("All balances are consistent!")
        else:
            print(f"Found {inconsistencies} balance inconsistencies")
        
    except Exception as e:
        print(f"Error verifying balances: {str(e)}")
        raise
    finally:
        db.close()


def run_balance_reconciliation():
    """Run a full balance reconciliation"""
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        from app.transaction_service import BalanceReconciliationService
        
        print("Running balance reconciliation...")
        
        reconciliation_service = BalanceReconciliationService(db)
        reconciliation = reconciliation_service.run_full_reconciliation()
        
        print(f"Reconciliation completed:")
        print(f"  - Users checked: {reconciliation.total_users_checked}")
        print(f"  - Discrepancies found: {reconciliation.discrepancies_found}")
        print(f"  - Total shielded (DB): {reconciliation.total_shielded_pool_database:.8f} ZEC")
        print(f"  - Total transparent (DB): {reconciliation.total_transparent_pool_database:.8f} ZEC")
        print(f"  - Status: {reconciliation.reconciliation_status}")
        
        if reconciliation.discrepancies_found > 0:
            print("\nUsers with discrepancies:")
            user_reconciliations = db.query(models.UserBalanceReconciliation).filter(
                models.UserBalanceReconciliation.reconciliation_id == reconciliation.id,
                models.UserBalanceReconciliation.has_discrepancy == True
            ).all()
            
            for ur in user_reconciliations:
                user = db.query(models.User).filter(models.User.id == ur.user_id).first()
                print(f"  - User {ur.user_id} ({user.username if user else 'Unknown'}):")
                print(f"    Shielded discrepancy: {ur.shielded_discrepancy:.8f} ZEC")
                print(f"    Transparent discrepancy: {ur.transparent_discrepancy:.8f} ZEC")
        
    except Exception as e:
        print(f"Error running reconciliation: {str(e)}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "init":
            initialize_user_balances()
        elif command == "verify":
            verify_balance_consistency()
        elif command == "reconcile":
            run_balance_reconciliation()
        else:
            print("Usage: python initialize_user_balances.py [init|verify|reconcile]")
            print("  init     - Initialize user balances with transaction records")
            print("  verify   - Verify balance consistency")
            print("  reconcile - Run full balance reconciliation")
    else:
        print("Running all initialization steps...")
        initialize_user_balances()
        verify_balance_consistency()
        run_balance_reconciliation()
