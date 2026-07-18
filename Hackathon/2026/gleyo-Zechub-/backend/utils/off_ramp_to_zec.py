"""
EVM Payment verification leveraging NEAR Intents (Defuse Protocol) destinations.

Flow:
  1. save_payment creates the quote -> swap_job stores swap_zec_amount (ESTIMATE)
  2. Once Defuse sees the on-chain deposit (KNOWN_DEPOSIT_TX / PROCESSING),
     we lock that ESTIMATE into wallet.locked_balance — visible to the user,
     not yet spendable.
  3. Once Defuse reports SUCCESS, we release exactly THIS payment's locked
     amount and credit the REAL final amount (amountOutFormatted) to
     available_balance.
  4. If Defuse reports REFUNDED / FAILED / INCOMPLETE_DEPOSIT, we release
     the lock and credit nothing.

verify_evm_payment() is safe to call repeatedly and from two places:
  - the verify_payment route, while the user's browser is polling
  - the background scheduler job, so payments still resolve even if the
    user closes the tab mid-swap

Either caller also nudges the background poller awake (see
_wake_poller_safe below) — so if the scheduler had already gone idle
for any reason while this payment is still genuinely pending, it comes
back on rather than staying asleep until the next payment creation.
"""
import os
from datetime import datetime

import requests

from backend.utils.instance import db
from backend.communities.community_models import CommunityWallet, CommunityWalletTransaction

DEFUSE_API_BASE = "https://1click.chaindefuser.com/v0"
DEFUSE_JWT_TOKEN = os.getenv("DEFUSE_JWT_TOKEN")

SUCCESS_STATUSES = {"SUCCESS"}
FAILURE_STATUSES = {"REFUNDED", "FAILED", "INCOMPLETE_DEPOSIT"}
LOCKING_STATUSES = {"KNOWN_DEPOSIT_TX", "PROCESSING"}


def _wake_poller_safe():
    """
    Lazy import — app.py imports verify_evm_payment from this file, so
    importing wake_evm_poller from app.py at module level here would be
    circular. Importing inside the function defers resolution until
    call-time, when both modules are already fully loaded.
    """
    try:
        from app import wake_evm_poller
        wake_evm_poller()
    except Exception as e:
        print(f"⚠️ Could not wake poller from verify_evm_payment: {e}")


def _extract_tx_hash(tx_list):
    """originChainTxHashes/destinationChainTxHashes are arrays of {hash, explorerUrl} dicts."""
    if not tx_list:
        return None
    first = tx_list[0]
    if isinstance(first, str):
        return first
    if isinstance(first, dict):
        return first.get('hash') or first.get('txHash') or first.get('tx_hash')
    return None


def _get_or_create_wallet(community_id):
    """
    One wallet per community (community_id is unique on CommunityWallet),
    always ZEC — USDT/USDC never persist their own balance, they just
    pass through Defuse and land here as ZEC.
    """
    wallet = CommunityWallet.query.filter_by(community_id=community_id).first()
    if not wallet:
        wallet = CommunityWallet(
            community_id=community_id,
            available_balance=0,
            locked_balance=0,
            currency='ZEC'
        )
        db.session.add(wallet)
        db.session.flush()
    return wallet


def check_defuse_status(payment):
    """Queries Defuse's status endpoint for this payment's unique deposit address."""
    deposit_target = payment.address

    if not deposit_target:
        return {'status': 'pending', 'error': 'Payment has no deposit address'}
    if not DEFUSE_JWT_TOKEN:
        return {'status': 'pending', 'error': 'DEFUSE_JWT_TOKEN missing'}

    try:
        response = requests.get(
            f"{DEFUSE_API_BASE}/status",
            params={'depositAddress': deposit_target},
            headers={"Authorization": f"Bearer {DEFUSE_JWT_TOKEN}"},
            timeout=20
        )
        response.raise_for_status()
        data = response.json()

        swap_state = data.get('status')
        swap_details = data.get('swapDetails') or {}

        if swap_state in SUCCESS_STATUSES:
            origin_tx = _extract_tx_hash(swap_details.get('originChainTxHashes'))
            dest_tx = _extract_tx_hash(swap_details.get('destinationChainTxHashes'))
            tx_hash = origin_tx or dest_tx or deposit_target

            amount_out = swap_details.get('amountOutFormatted')

            return {
                'status': 'match',
                'tx_hash': tx_hash,
                'zec_amount': float(amount_out) if amount_out is not None else None
            }

        if swap_state in FAILURE_STATUSES:
            return {'status': 'failed', 'defuse_status': swap_state}

        return {'status': 'pending', 'defuse_status': swap_state}

    except Exception as e:
        return {'status': 'pending', 'error': str(e)}


def verify_evm_payment(payment, called_from_background=False):
    """
    Single entry point, idempotent — safe to call repeatedly from either
    the request handler or the background scheduler. It checks
    payment.status / payment.swap_status before locking or crediting
    again, so re-running it never double-counts.
    """

    # Already fully settled — nothing to do, no need to wake anything
    if payment.status == 'paid':
        return {'status': 'paid'}
    if payment.status == 'failed':
        return {'status': 'failed'}

    # This payment is genuinely still pending -> make sure the
    # background poller is awake to keep chasing it even if the
    # user closes the tab right after this call.
    _wake_poller_safe()

    result = check_defuse_status(payment)
    defuse_status = result.get('defuse_status')

    # ---- Deposit detected, swap in progress: lock the ESTIMATE (once) ----
    if result.get('status') == 'pending' and defuse_status in LOCKING_STATUSES:
        if payment.swap_status != 'locked':
            estimated_zec = payment.swap_zec_amount
            if estimated_zec:
                wallet = _get_or_create_wallet(payment.community_id)
                locked_units = int(round(estimated_zec * (10 ** 8)))
                wallet.locked_balance += locked_units
                wallet.updated_at = datetime.utcnow()
                db.session.add(CommunityWalletTransaction(
                    wallet_id=wallet.id,
                    amount=locked_units,
                    type='deposit_locked',
                    reference=f"payment:{payment.id}"
                ))
                payment.swap_status = 'locked'
                db.session.commit()
                print(f"🔒 Payment {payment.id} — locked {estimated_zec} ZEC (estimate)")
        return {'status': 'pending', 'stage': 'swapping'}

    # ---- Failed / refunded: release ONLY this payment's own lock ----
    if result.get('status') == 'failed':
        payment.status = 'failed'
        payment.swap_status = (defuse_status or 'failed').lower()

        if payment.swap_zec_amount:
            wallet = _get_or_create_wallet(payment.community_id)
            locked_units = int(round(payment.swap_zec_amount * (10 ** 8)))
            wallet.locked_balance = max(0, wallet.locked_balance - locked_units)
            wallet.updated_at = datetime.utcnow()
            db.session.add(CommunityWalletTransaction(
                wallet_id=wallet.id,
                amount=-locked_units,
                type='deposit_unlocked',
                reference=f"payment:{payment.id}"
            ))

        db.session.commit()
        print(f"❌ Payment {payment.id} failed — Defuse status: {defuse_status}")
        return {'status': 'failed'}

    if result.get('status') != 'match':
        return {'status': result.get('status', 'pending'), 'stage': 'awaiting_deposit'}

    # ---- SUCCESS: release THIS payment's lock, credit the REAL amount ----
    zec_amount = result.get('zec_amount')
    if zec_amount is None:
        return {'status': 'pending', 'error': 'SUCCESS but no amountOutFormatted'}

    wallet = _get_or_create_wallet(payment.community_id)

    # release exactly what THIS payment locked earlier (its own estimate,
    # not the whole locked_balance pool, which may include other payments)
    if payment.swap_status == 'locked' and payment.swap_zec_amount:
        locked_units = int(round(payment.swap_zec_amount * (10 ** 8)))
        wallet.locked_balance = max(0, wallet.locked_balance - locked_units)
        db.session.add(CommunityWalletTransaction(
            wallet_id=wallet.id,
            amount=-locked_units,
            type='deposit_unlocked',
            reference=f"payment:{payment.id}"
        ))

    payment.status = 'paid'
    payment.paid_at = datetime.utcnow()
    payment.tx = result['tx_hash']
    payment.swap_status = 'completed'
    payment.swap_zec_amount = zec_amount  # overwrite estimate with the real, final amount

    credited_units = int(round(zec_amount * (10 ** 8)))
    wallet.available_balance += credited_units
    wallet.updated_at = datetime.utcnow()

    db.session.add(CommunityWalletTransaction(
        wallet_id=wallet.id,
        amount=credited_units,
        type='deposit',
        reference=f"payment:{payment.id}"
    ))

    db.session.commit()
    print(f"✅ Payment {payment.id} confirmed — tx: {result['tx_hash']}, ZEC: {zec_amount}")

    return {'status': 'paid'}