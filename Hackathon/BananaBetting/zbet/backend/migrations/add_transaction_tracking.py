"""
Database migration script to add transaction tracking tables and update user model.

This script adds:
1. New balance fields to the users table
2. UserTransaction table for transaction history
3. BalanceReconciliation and UserBalanceReconciliation tables
4. Proper indexes for performance

Run this script after updating the models.py file.
"""

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./zbet_users_events_bets_payouts.sqlite3")

def run_migration():
    """Run the database migration"""
    
    engine = create_engine(DATABASE_URL)
    
    print("Starting transaction tracking migration...")
    
    with engine.connect() as connection:
        # Start transaction
        trans = connection.begin()
        
        try:
            # 1. Add new balance fields to users table
            print("Adding new balance fields to users table...")
            
            # Check if columns already exist
            result = connection.execute(text("PRAGMA table_info(users)"))
            columns = [row[1] for row in result.fetchall()]
            
            if 'shielded_balance' not in columns:
                connection.execute(text("""
                    ALTER TABLE users ADD COLUMN shielded_balance FLOAT DEFAULT 0.0 NOT NULL
                """))
                print("  - Added shielded_balance column")
            
            if 'transparent_balance' not in columns:
                connection.execute(text("""
                    ALTER TABLE users ADD COLUMN transparent_balance FLOAT DEFAULT 0.0 NOT NULL
                """))
                print("  - Added transparent_balance column")
            
            if 'last_balance_update' not in columns:
                # SQLite doesn't support CURRENT_TIMESTAMP as default in ALTER TABLE
                # Add column without default first, then update with current timestamp
                connection.execute(text("""
                    ALTER TABLE users ADD COLUMN last_balance_update DATETIME
                """))
                connection.execute(text("""
                    UPDATE users SET last_balance_update = CURRENT_TIMESTAMP WHERE last_balance_update IS NULL
                """))
                print("  - Added last_balance_update column")
            
            if 'balance_version' not in columns:
                connection.execute(text("""
                    ALTER TABLE users ADD COLUMN balance_version INTEGER DEFAULT 1 NOT NULL
                """))
                print("  - Added balance_version column")
            
            # 2. Create user_transactions table
            print("Creating user_transactions table...")
            connection.execute(text("""
                CREATE TABLE IF NOT EXISTS user_transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    sport_event_id INTEGER,
                    bet_id INTEGER,
                    payout_id INTEGER,
                    transaction_type VARCHAR(50) NOT NULL,
                    amount FLOAT NOT NULL,
                    from_address VARCHAR(100),
                    to_address VARCHAR(100),
                    from_address_type VARCHAR(50),
                    to_address_type VARCHAR(50),
                    shielded_balance_before FLOAT DEFAULT 0.0 NOT NULL,
                    transparent_balance_before FLOAT DEFAULT 0.0 NOT NULL,
                    shielded_balance_after FLOAT DEFAULT 0.0 NOT NULL,
                    transparent_balance_after FLOAT DEFAULT 0.0 NOT NULL,
                    zcash_transaction_id VARCHAR(100),
                    operation_id VARCHAR(100),
                    block_height INTEGER,
                    confirmations INTEGER DEFAULT 0 NOT NULL,
                    status VARCHAR(20) DEFAULT 'pending' NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    confirmed_at DATETIME,
                    description TEXT,
                    transaction_metadata TEXT,
                    network_fee FLOAT DEFAULT 0.0 NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users (id),
                    FOREIGN KEY (sport_event_id) REFERENCES sport_events (id),
                    FOREIGN KEY (bet_id) REFERENCES bets (id),
                    FOREIGN KEY (payout_id) REFERENCES payouts (id)
                )
            """))
            print("  - Created user_transactions table")
            
            # 3. Create indexes for user_transactions
            print("Creating indexes for user_transactions...")
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_transactions_user_id 
                ON user_transactions (user_id)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_transactions_type 
                ON user_transactions (transaction_type)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_transactions_status 
                ON user_transactions (status)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_transactions_created_at 
                ON user_transactions (created_at)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_transactions_zcash_tx_id 
                ON user_transactions (zcash_transaction_id)
            """))
            print("  - Created indexes for user_transactions")
            
            # 4. Create balance_reconciliations table
            print("Creating balance_reconciliations table...")
            connection.execute(text("""
                CREATE TABLE IF NOT EXISTS balance_reconciliations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    reconciliation_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    total_users_checked INTEGER DEFAULT 0 NOT NULL,
                    discrepancies_found INTEGER DEFAULT 0 NOT NULL,
                    total_shielded_pool_blockchain FLOAT DEFAULT 0.0 NOT NULL,
                    total_shielded_pool_database FLOAT DEFAULT 0.0 NOT NULL,
                    total_transparent_pool_blockchain FLOAT DEFAULT 0.0 NOT NULL,
                    total_transparent_pool_database FLOAT DEFAULT 0.0 NOT NULL,
                    reconciliation_status VARCHAR(20) DEFAULT 'completed' NOT NULL,
                    notes TEXT
                )
            """))
            print("  - Created balance_reconciliations table")
            
            # 5. Create user_balance_reconciliations table
            print("Creating user_balance_reconciliations table...")
            connection.execute(text("""
                CREATE TABLE IF NOT EXISTS user_balance_reconciliations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    reconciliation_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    database_shielded_balance FLOAT DEFAULT 0.0 NOT NULL,
                    database_transparent_balance FLOAT DEFAULT 0.0 NOT NULL,
                    calculated_shielded_balance FLOAT DEFAULT 0.0 NOT NULL,
                    calculated_transparent_balance FLOAT DEFAULT 0.0 NOT NULL,
                    shielded_discrepancy FLOAT DEFAULT 0.0 NOT NULL,
                    transparent_discrepancy FLOAT DEFAULT 0.0 NOT NULL,
                    has_discrepancy BOOLEAN DEFAULT FALSE NOT NULL,
                    discrepancy_resolved BOOLEAN DEFAULT FALSE NOT NULL,
                    resolution_notes TEXT,
                    resolved_at DATETIME,
                    FOREIGN KEY (reconciliation_id) REFERENCES balance_reconciliations (id),
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            """))
            print("  - Created user_balance_reconciliations table")
            
            # 6. Create indexes for reconciliation tables
            print("Creating indexes for reconciliation tables...")
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_balance_reconciliation_user_id 
                ON user_balance_reconciliations (user_id)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_balance_reconciliation_reconciliation_id 
                ON user_balance_reconciliations (reconciliation_id)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_user_balance_reconciliation_discrepancy 
                ON user_balance_reconciliations (has_discrepancy)
            """))
            print("  - Created indexes for reconciliation tables")
            
            # 7. Migrate existing user balances
            print("Migrating existing user balances...")
            
            # Get all users with existing balance data
            result = connection.execute(text("""
                SELECT id, balance FROM users WHERE balance IS NOT NULL AND balance != ''
            """))
            
            users_updated = 0
            for row in result.fetchall():
                user_id, balance_str = row
                try:
                    # Parse the balance string to float
                    balance_value = float(balance_str) if balance_str else 0.0
                    
                    # For now, assume all existing balances are transparent
                    # In a real migration, you might need more sophisticated logic
                    connection.execute(text("""
                        UPDATE users 
                        SET transparent_balance = :balance,
                            shielded_balance = 0.0,
                            last_balance_update = CURRENT_TIMESTAMP,
                            balance_version = 1
                        WHERE id = :user_id
                    """), {"balance": balance_value, "user_id": user_id})
                    
                    users_updated += 1
                    
                except (ValueError, TypeError):
                    # If balance can't be parsed, set to 0
                    connection.execute(text("""
                        UPDATE users 
                        SET transparent_balance = 0.0,
                            shielded_balance = 0.0,
                            last_balance_update = CURRENT_TIMESTAMP,
                            balance_version = 1
                        WHERE id = :user_id
                    """), {"user_id": user_id})
                    
                    users_updated += 1
            
            print(f"  - Updated balances for {users_updated} users")
            
            # Commit the transaction
            trans.commit()
            print("Migration completed successfully!")
            
        except Exception as e:
            # Rollback on error
            trans.rollback()
            print(f"Migration failed: {str(e)}")
            raise


def rollback_migration():
    """Rollback the migration (for development/testing)"""
    
    engine = create_engine(DATABASE_URL)
    
    print("Rolling back transaction tracking migration...")
    
    with engine.connect() as connection:
        trans = connection.begin()
        
        try:
            # Drop the new tables
            connection.execute(text("DROP TABLE IF EXISTS user_balance_reconciliations"))
            connection.execute(text("DROP TABLE IF EXISTS balance_reconciliations"))
            connection.execute(text("DROP TABLE IF EXISTS user_transactions"))
            
            # Note: SQLite doesn't support dropping columns easily
            # In production, you'd need to recreate the users table without the new columns
            print("Rollback completed (note: user table columns not removed due to SQLite limitations)")
            
            trans.commit()
            
        except Exception as e:
            trans.rollback()
            print(f"Rollback failed: {str(e)}")
            raise


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "rollback":
        rollback_migration()
    else:
        run_migration()
