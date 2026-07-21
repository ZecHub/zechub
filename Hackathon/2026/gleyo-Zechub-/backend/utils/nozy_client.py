# backend/utils/nozy_client.py

import os
import threading
import requests
from datetime import datetime
from backend.utils.instance import db
from backend.communities.community_models import CommunityWallet, CommunityWalletTransaction


NOZY_API_URL = os.environ.get("NOZY_API_URL", "http://127.0.0.1:3000")
NOZY_API_KEY = os.environ.get("NOZY_API_KEY")
NOZY_WALLET_PASSWORD = os.getenv("NOZY_WALLET_PASSWORD")

_nozy_lock = threading.Lock()


def _nozy_sync():
    """Sync Nozy wallet state before attempting a send. Returns (success, error)."""
    try:
        sync_resp = requests.post(
            f"{NOZY_API_URL}/api/sync",
            json={"password": NOZY_WALLET_PASSWORD},
            headers={"X-API-Key": NOZY_API_KEY},
            timeout=120
        )
        if sync_resp.status_code != 200:
            return False, f"Sync failed: HTTP {sync_resp.status_code}"

        data = sync_resp.json()
        if 'balance_zec' not in data:
            return False, "Sync response missing balance_zec"

        return True, None
    except Exception as e:
        return False, f"Sync failed: {str(e)}"


def _nozy_send(address, amount_zec, memo=None):
    """Send ZEC via Nozy API."""
    if not _nozy_lock.acquire(blocking=False):
        return None, "Another withdrawal is already in progress, please wait"
    try:
        payload = {
            "recipient": address,
            "amount": float(amount_zec), 
            "password": NOZY_WALLET_PASSWORD,
        }
        if memo:
            payload["memo"] = memo
        print("=== SENDING TO NOZY ===")
        print(payload)
        response = requests.post(
            f"{NOZY_API_URL}/api/transaction/send",
            json=payload,
            headers={"X-API-Key": NOZY_API_KEY},
            timeout=180
        )
        print("STATUS:", response.status_code)
        print("BODY:", response.text)
        if response.status_code != 200:
            return None, f"Nozy API error: {response.status_code}"
        data = response.json()
        print("PARSED:", data)
        if not data.get("success"):
            return None, data.get("message", "Unknown error")
        txid = data.get("txid")
        if not txid:
            return None, "No txid returned"
        return txid, None
    except Exception as e:
        print("NOZY ERROR:", str(e))
        return None, str(e)
    finally:
        _nozy_lock.release()



def fetch_nozy_balance():
    """Used by save_payment when opening a new ZEC payment, to snapshot balance_before."""
    try:
        resp = requests.get(
            f"{NOZY_API_URL}/api/balance",
            headers={"X-API-Key": NOZY_API_KEY},
            timeout=30
        )
        return resp.json().get('balance_zec', 0.0)
    except Exception as e:
        print(f"⚠️ Could not fetch Nozy balance: {e}")
        return 0.0




def verify_zec_payment(payment):
    """
    Checks a single pending ZEC payment against the Nozy wallet's current
    balance. Returns a plain dict (route layer decides the HTTP status code).
    Does NOT check expiry — verify_payment route already handles that
    before calling this.
    """
    try:
        sync_resp = requests.post(
            f"{NOZY_API_URL}/api/sync",
            json={"password": NOZY_WALLET_PASSWORD},
            headers={"X-API-Key": NOZY_API_KEY},
            timeout=120
        )
        current_balance = float(sync_resp.json().get('balance_zec', 0))
    except Exception as e:
        return {'status': 'pending', 'error': f'Sync failed: {str(e)}'}

    balance_increase = round(current_balance - float(payment.balance_before or 0), 8)

    FEE_TOLERANCE = min(payment.amount * 0.05, 0.0001)
    required_minimum = max(payment.amount - FEE_TOLERANCE, 0.00000001)

    if balance_increase < required_minimum:
        print(f"⏳ ZEC payment {payment.id} pending — increase: {balance_increase:.8f}, "
              f"required: {required_minimum:.8f}, requested: {payment.amount:.8f}")
        return {'status': 'pending'}

    payment.status = 'paid'
    payment.paid_at = datetime.utcnow()
    payment.tx = f"nozy-balance-delta-{current_balance}"

    amount_zatoshi = int(round(balance_increase * 100_000_000))

    # Filtered by currency='ZEC' — a community may also have USDT/USDC wallet
    # rows (from EVM payments) sharing the same community_id, and crediting
    # the wrong one silently corrupts that currency's balance.
    wallet = CommunityWallet.query.filter_by(
        community_id=payment.community_id,
        currency='ZEC'
    ).first()
    if wallet:
        wallet.available_balance += amount_zatoshi
        wallet.updated_at = datetime.utcnow()
    else:
        wallet = CommunityWallet(
            community_id=payment.community_id,
            available_balance=amount_zatoshi,
            locked_balance=0,
            currency='ZEC'
        )
        db.session.add(wallet)
        db.session.flush()

    db.session.add(CommunityWalletTransaction(
        wallet_id=wallet.id,
        amount=amount_zatoshi,
        type='deposit',
        reference=f"payment:{payment.id}"
    ))

    db.session.commit()
    print(f"✅ ZEC payment {payment.id} confirmed — received: {balance_increase:.8f} ZEC, "
          f"credited: {amount_zatoshi} zatoshi")

    return {'status': 'paid'}