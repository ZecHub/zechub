"""
Script to allocate all funds to test2 user and clean up mock data.

This script:
1. Sets all users except test2 to zero balance
2. Allocates the shielded pool balance (0.01644 ZEC) to test2
3. Keeps test2's transparent balance at 0.0001 ZEC
4. Creates proper transaction records for the balance adjustments
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import sessionmaker
from app.database import engine
from app import models
from app.transaction_service import TransactionService
from datetime import datetime

def allocate_funds_to_test2():
    """Allocate all funds to test2 and zero out other users"""
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        print("Allocating all funds to test2 and cleaning up mock data...")
        
        # Get all users
        users = db.query(models.User).all()
        transaction_service = TransactionService(db)
        
        # Find test2 user
        test2_user = None
        for user in users:
            if user.username == "test2":
                test2_user = user
                break
        
        if not test2_user:
            print("ERROR: test2 user not found!")
            return
        
        print(f"Found test2 user (ID: {test2_user.id})")
        
        # Calculate total funds to transfer to test2
        shielded_pool_balance = 0.01644  # As specified
        test2_transparent_balance = 0.0001  # Keep existing
        
        print(f"Setting test2 balances:")
        print(f"  - Transparent: {test2_transparent_balance} ZEC (keeping existing)")
        print(f"  - Shielded: {shielded_pool_balance} ZEC (from shielded pool)")
        
        # Process each user
        for user in users:
            if user.username == "test2":
                # Set test2's balances correctly
                old_transparent = user.transparent_balance
                old_shielded = user.shielded_balance
                
                user.transparent_balance = test2_transparent_balance
                user.shielded_balance = shielded_pool_balance
                user.last_balance_update = datetime.utcnow()
                user.balance_version += 1
                
                # Create transaction records for test2's balance adjustments
                if old_transparent != test2_transparent_balance:
                    adjustment_amount = test2_transparent_balance - old_transparent
                    if adjustment_amount != 0:
                        transaction_service.create_transaction(
                            user_id=user.id,
                            transaction_type=models.TransactionType.BALANCE_CORRECTION,
                            amount=adjustment_amount,
                            description=f"Balance correction - transparent pool cleanup",
                            metadata={
                                "cleanup": True,
                                "old_transparent_balance": old_transparent,
                                "new_transparent_balance": test2_transparent_balance,
                                "cleanup_date": datetime.utcnow().isoformat()
                            }
                        )
                
                if old_shielded != shielded_pool_balance:
                    adjustment_amount = shielded_pool_balance - old_shielded
                    transaction_service.create_transaction(
                        user_id=user.id,
                        transaction_type=models.TransactionType.BALANCE_CORRECTION,
                        amount=adjustment_amount,
                        description=f"Shielded pool allocation - {shielded_pool_balance} ZEC",
                        metadata={
                            "shielded_pool_allocation": True,
                            "old_shielded_balance": old_shielded,
                            "new_shielded_balance": shielded_pool_balance,
                            "cleanup_date": datetime.utcnow().isoformat()
                        }
                    )
                
                print(f"  ✓ Updated test2: Transparent={user.transparent_balance}, Shielded={user.shielded_balance}, Total={user.get_total_balance()}")
                
            else:
                # Zero out all other users
                old_total = user.get_total_balance()
                
                if old_total > 0:
                    # Create transaction records for balance removal
                    if user.transparent_balance > 0:
                        transaction_service.create_transaction(
                            user_id=user.id,
                            transaction_type=models.TransactionType.BALANCE_CORRECTION,
                            amount=-user.transparent_balance,
                            description=f"Mock data cleanup - removed transparent balance",
                            metadata={
                                "mock_data_cleanup": True,
                                "old_transparent_balance": user.transparent_balance,
                                "cleanup_date": datetime.utcnow().isoformat()
                            }
                        )
                    
                    if user.shielded_balance > 0:
                        transaction_service.create_transaction(
                            user_id=user.id,
                            transaction_type=models.TransactionType.BALANCE_CORRECTION,
                            amount=-user.shielded_balance,
                            description=f"Mock data cleanup - removed shielded balance",
                            metadata={
                                "mock_data_cleanup": True,
                                "old_shielded_balance": user.shielded_balance,
                                "cleanup_date": datetime.utcnow().isoformat()
                            }
                        )
                    
                    # Zero out balances
                    user.transparent_balance = 0.0
                    user.shielded_balance = 0.0
                    user.last_balance_update = datetime.utcnow()
                    user.balance_version += 1
                    
                    print(f"  ✓ Zeroed {user.username} (ID: {user.id}): was {old_total:.6f} ZEC, now 0.0 ZEC")
                else:
                    print(f"  - {user.username} (ID: {user.id}): already at 0.0 ZEC")
        
        # Commit all changes
        db.commit()
        
        print("\n" + "="*50)
        print("Fund allocation completed successfully!")
        print("="*50)
        
        # Verify final balances
        print("\nFinal user balances:")
        users = db.query(models.User).all()
        total_transparent = 0
        total_shielded = 0
        
        for user in users:
            total_transparent += user.transparent_balance
            total_shielded += user.shielded_balance
            if user.get_total_balance() > 0:
                print(f"  {user.username} (ID: {user.id}): Transparent={user.transparent_balance:.6f}, Shielded={user.shielded_balance:.6f}, Total={user.get_total_balance():.6f}")
        
        print(f"\nSystem totals:")
        print(f"  Total transparent pool: {total_transparent:.6f} ZEC")
        print(f"  Total shielded pool: {total_shielded:.6f} ZEC")
        print(f"  Grand total: {total_transparent + total_shielded:.6f} ZEC")
        
    except Exception as e:
        db.rollback()
        print(f"Error allocating funds: {str(e)}")
        raise
    finally:
        db.close()


def verify_allocation():
    """Verify the fund allocation is correct"""
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        print("Verifying fund allocation...")
        
        users = db.query(models.User).all()
        test2_user = None
        other_users_with_balance = []
        
        for user in users:
            if user.username == "test2":
                test2_user = user
            elif user.get_total_balance() > 0:
                other_users_with_balance.append(user)
        
        # Check test2
        if test2_user:
            expected_transparent = 0.0001
            expected_shielded = 0.01644
            expected_total = expected_transparent + expected_shielded
            
            print(f"\ntest2 verification:")
            print(f"  Expected: Transparent={expected_transparent}, Shielded={expected_shielded}, Total={expected_total}")
            print(f"  Actual:   Transparent={test2_user.transparent_balance}, Shielded={test2_user.shielded_balance}, Total={test2_user.get_total_balance()}")
            
            transparent_ok = abs(test2_user.transparent_balance - expected_transparent) < 0.0000001
            shielded_ok = abs(test2_user.shielded_balance - expected_shielded) < 0.0000001
            
            if transparent_ok and shielded_ok:
                print("  ✓ test2 balances are correct!")
            else:
                print("  ✗ test2 balances are incorrect!")
        else:
            print("  ✗ test2 user not found!")
        
        # Check other users
        if other_users_with_balance:
            print(f"\n✗ Found {len(other_users_with_balance)} other users with non-zero balances:")
            for user in other_users_with_balance:
                print(f"  {user.username}: {user.get_total_balance():.6f} ZEC")
        else:
            print("\n✓ All other users have zero balance!")
        
        # Show transaction count
        transaction_count = db.query(models.UserTransaction).count()
        print(f"\nTotal transaction records: {transaction_count}")
        
    except Exception as e:
        print(f"Error verifying allocation: {str(e)}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "verify":
        verify_allocation()
    else:
        print("This will allocate all funds to test2 and zero out other users.")
        print("test2 will have:")
        print("  - Transparent balance: 0.0001 ZEC")
        print("  - Shielded balance: 0.01644 ZEC")
        print("  - Total: 0.01645 ZEC")
        print("\nAll other users will be set to 0.0 ZEC")
        
        response = input("\nProceed? (y/N): ")
        if response.lower() == 'y':
            allocate_funds_to_test2()
            print("\nRunning verification...")
            verify_allocation()
        else:
            print("Operation cancelled.")
