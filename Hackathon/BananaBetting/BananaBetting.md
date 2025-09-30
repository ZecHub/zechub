# 🍌 BananaBetting - Hackathon Sports Betting App

Inspired by the Savanah Bannanas and Banana-ball, the dancing alternative to baseball. BananaBetting is a fun, Zcash-powered sports betting platform. Sports betting for the rest of us.

## 🎯 Project Overview

**BananaBetting** transforms the existing Zcash chat infrastructure into a sports betting platform where users can place binary bets (Team A vs Team B, Over/Under, etc.) with automatic payout distribution based on proportional winnings.

### 🏆 Betting Logic
- **Binary Outcomes**: Simple A vs B betting (Team wins, Over/Under scores, etc.)
- **Phase 1 - House Wallet**: Bets sent to house address for simplicity (MVP)
- **Phase 2 - Trustless Escrow**: Multi-signature escrow system (premium feature)
- **Proportional Payouts**: Winners split the loser's pot based on their percentage of the winning side
- **House Fee**: Small processing fee (e.g., 2-5%) deducted before winner distribution
- **Example**: If Alice bets 50% of all winning bets, she gets 50% of the losing pot + her original bet back, minus house fee.

## 📊 Existing Components Analysis

### ✅ **Already Available Components**

#### 1. **User Management System** 
- **Location**: `zbet/backend/app/models.py`, `crud.py`, `auth.py`
- **Features**:
  - JWT authentication with email/username/password
  - Secure password hashing (bcrypt)
  - User CRUD operations
  - Email and username uniqueness validation
- **Zcash Integration**:
  - Each user gets: `zcash_account`, `zcash_address`, `zcash_transparent_address`
  - Balance tracking in user model
  - Automatic wallet creation on registration

#### 2. **Zcash Transaction System**
- **Location**: `zcash_mod/zcash_wallet.py`, `zcash_utils.py`
- **Features**:
  - Direct Zcash node RPC integration
  - Send/receive Zcash transactions (single and batch)
  - **Batch Payouts**: `z_sendmany` for multiple winners in single transaction
  - Address validation
  - Balance checking for transparent addresses
  - Account management (`z_get_new_account`, `z_getaddressforaccount`)
  - Operation status tracking for async transactions
- **API Endpoints**:
  - `POST /zcash/send/` - Send Zcash
  - `GET /zcash/balance/` - Check balance
  - `GET /zcash/address/` - Get user addresses
  - `POST /zcash/validate-address/` - Validate addresses

#### 3. **Database Infrastructure**
- **Location**: `database.py`, `models.py`
- **Features**:
  - SQLite database with SQLAlchemy ORM
  - Complete betting system models (User, SportEvent, Bet, Payout, etc.)
  - Database migration support (Alembic)
  - Relationship handling

#### 4. **API Infrastructure**
- **Location**: `main_transactions.py`
- **Features**:
  - FastAPI framework
  - CORS middleware configured
  - JWT token authentication
  - Pydantic schemas for validation
  - Error handling and HTTP exceptions
  - Interactive API docs (`/docs`, `/redoc`)

#### 5. **Development Environment**
- **Location**: `venv/`, `launch_backend.sh`
- **Features**:
  - Python virtual environment with all dependencies
  - Launch scripts for easy startup
  - Mock Zcash data for development (when node unavailable)

## 🔨 **New Components Needed**

### 1. **Betting System Models**
- **SportEvent**: Events with binary outcomes, house fee settings, pot tracking
- **Bet**: Individual user bets with Zcash transaction tracking
- **Payout**: Winning payouts with house fee calculations

### 2. **Betting Logic Engine**
- **Payout Calculations**: Proportional winner payouts with house fee deduction
- **Batch Payouts**: Single transaction to pay all winners (`z_sendmany`)
- **Odds Generation**: Real-time odds based on current bet distribution
- **Fee Management**: Automatic house fee calculation and tracking
- **Transaction Efficiency**: Minimal fees using Zcash's multiple output feature

### 3. **New API Endpoints**
- **Event Management**: Create, list, and settle betting events (admin)
- **Betting Operations**: Place bets, view history, check odds
- **Payout Processing**: Automatic Zcash payouts to winners

### 4. **Admin Interface Components**
- **Event Creation**: Admin tools for creating betting events
- **Event Settlement**: Manual settlement with outcome selection
- **Payout Processing**: Automated Zcash distribution to winners

### 5. **Enhanced Schemas**
- **SportEvent Schemas**: Event creation, listing, and status tracking
- **Bet Schemas**: Bet placement and history with transaction IDs
- **Payout Schemas**: Winner payout tracking and status

## 🏗️ **Implementation Roadmap**

### Phase 1: Database Schema Extension
1. Create new models for `SportEvent`, `Bet`, `Payout`
2. Add Alembic migration scripts
3. Update database initialization

### Phase 2: Core Betting Logic
1. Implement `BettingEngine` class
2. Add payout calculation algorithms
3. Create bet validation logic

### Phase 3: API Development
1. Add new betting endpoints
2. Integrate with existing Zcash transaction system
3. Add admin authentication and permissions

### Phase 4: Business Logic Integration
1. Connect betting to Zcash transactions
2. Implement automatic payout processing
3. Add event lifecycle management

### Phase 5: Frontend Integration (if needed)
1. Create simple betting interface
2. Real-time odds display
3. User betting dashboard

## 🎮 **Example User Flow**

1. **User Registration**: User signs up → gets Zcash wallet automatically
2. **Fund Wallet**: User deposits Zcash to their transparent address
3. **Browse Events**: User sees available betting events (Lakers vs Warriors)
4. **Place Bet**: User bets 0.1 ZEC on "Lakers Win" → Zcash transaction initiated
5. **Event Settlement**: Admin settles event with "Lakers Win"
6. **Batch Payout**: All winners receive payouts in single `z_sendmany` transaction (minimal fees!)

## 💡 **Development Strategy**

### Leverage Existing Infrastructure
- **Authentication**: Use existing JWT system
- **Transactions**: Extend existing Zcash integration
- **Database**: Add new models to existing SQLite setup
- **API**: Add new endpoints to existing FastAPI app

### Quick Wins for Hackathon
1. Start with simple binary events (Team A vs B)
2. Use existing transaction system for bets and payouts
3. Create admin interface for event management
4. Focus on core betting logic over UI polish

## 🔧 **Technical Considerations**

### Zcash Integration
- Use existing `zcash_wallet.py` functions for all transactions
- Bet placement = `send_to_address` to house wallet
- Payouts = `send_to_address` to winner wallets
- Track all transaction IDs for audit trail

### Error Handling
- Handle Zcash node connectivity issues
- Implement transaction confirmation waiting
- Add bet validation (sufficient balance, event still open)

### Security
- Admin-only event creation and settlement
- Validate all Zcash transactions before confirming bets
- Prevent double-spending and race conditions

## 🔒 **Future Enhancement: Trustless Escrow System**

### Phase 2 Implementation (Premium Feature)
Instead of sending bets to a house wallet, implement a trustless escrow system:
- **Multi-signature Escrow**: 2-of-3 multisig addresses (User, House, Oracle)
- **Automatic Fund Release**: Oracle + House signatures release funds to winners
- **Zero Trust Architecture**: Users never send money directly to house

### Benefits of Trustless System:
- **Zero Trust Required**: Funds cryptographically secured
- **Oracle Integration**: Third-party result verification
- **Automatic Payouts**: Smart contract-like behavior with Zcash
- **Transparency**: All transactions publicly verifiable
- **No House Risk**: Users never send money directly to house

## 🚀 **Getting Started**

The foundation is already built! To transform this into BananaBetting:

### Phase 1 (MVP - House Wallet):
1. **Extend the database models** with betting entities
2. **Add betting logic** with house fee calculations
3. **Create new API endpoints** for betting operations
4. **Implement house wallet** for simple bet collection
5. **Test with mock events** using the existing Zcash integration

### Phase 2 (Premium - Trustless):
1. **Add multi-signature support** to Zcash integration
2. **Implement escrow addresses** per betting event
3. **Add oracle integration** for result verification
4. **Create trustless payout system**

The heavy lifting (authentication, Zcash integration, database setup) is already done - now we just need to add the betting layer on top! 🍌
