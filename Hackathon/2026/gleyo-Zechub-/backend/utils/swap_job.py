import os
from decimal import Decimal
from datetime import datetime, timedelta, timezone

import requests

from backend.utils.instance import db

DEFUSE_API_BASE = "https://1click.chaindefuser.com/v0"

DEFUSE_JWT_TOKEN = os.getenv("DEFUSE_JWT_TOKEN")
ZCASHD_SHIELDED_ADDRESS = os.getenv("ZCASHD_FROM_ADDRESS")
EVM_WALLET_REFUND = os.getenv("EVM_WALLET")


CHAIN_ALIASES = {
    "polygon": "pol",
    "polygon mainnet": "pol",
    "matic": "pol",

    "ethereum": "eth",

    "binance": "bsc",
    "binance smart chain": "bsc",

    "base": "base",
    "bsc": "bsc",
    "zec": "zec"
}

def get_asset_id(blockchain, contract_address=None):
    response = requests.get(
        f"{DEFUSE_API_BASE}/tokens",
        timeout=20
    )
    response.raise_for_status()

    tokens = response.json()

    # Normalize the chain name to Defuse's naming
    blockchain = CHAIN_ALIASES.get(
        blockchain.lower(),
        blockchain.lower()
    )

    # Normalize contract address once
    if contract_address:
        contract_address = contract_address.lower()

    for token in tokens:

        if token.get("blockchain", "").lower() != blockchain:
            continue

        token_contract = token.get("contractAddress")

        # Native asset
        if contract_address is None:
            if token_contract is None:
                return token["assetId"]

        # ERC20
        else:
            if (
                token_contract
                and token_contract.lower() == contract_address
            ):
                return token["assetId"]

    raise RuntimeError(
        f"No asset found for {blockchain} {contract_address}"
    )

def create_near_intent_deposit(
    payment,
    token_contract,
    token_decimals,
    refund_address=None
):
    """
    Create a Defuse 1Click quote and return the temporary deposit address.
    """

    if not DEFUSE_JWT_TOKEN:
        raise RuntimeError("DEFUSE_JWT_TOKEN missing")

    if not ZCASHD_SHIELDED_ADDRESS:
        raise RuntimeError("ZCASHD_FROM_ADDRESS missing")

    #
    # Resolve the actual Defuse asset IDs.
    #
    origin_asset = get_asset_id(
        payment.network,
        token_contract
    )

    destination_asset = get_asset_id("zec")

    amount_smallest = str(
        int(
            Decimal(str(payment.amount))
            * (10 ** token_decimals)
        )
    )

    deadline = (
        datetime.now(timezone.utc)
        + timedelta(minutes=30)
    ).replace(
        microsecond=0
    ).isoformat().replace("+00:00", "Z")

    payload = {
        "dry": False,
        "swapType": "EXACT_INPUT",
        "slippageTolerance": 100,

        "originAsset": origin_asset,
        "destinationAsset": destination_asset,

        "amount": amount_smallest,

        "depositType": "ORIGIN_CHAIN",

        "refundTo": refund_address or EVM_WALLET_REFUND,
        "refundType": "ORIGIN_CHAIN",

        "recipient": ZCASHD_SHIELDED_ADDRESS,
        "recipientType": "DESTINATION_CHAIN",

        "deadline": deadline
    }

    headers = {
        "Authorization": f"Bearer {DEFUSE_JWT_TOKEN}",
        "Content-Type": "application/json"
    }

    try:

        print("========== DEFUSE REQUEST ==========")
        print(payload)

        response = requests.post(
            f"{DEFUSE_API_BASE}/quote",
            json=payload,
            headers=headers,
            timeout=20
        )

        print("Status:", response.status_code)
        print("Body:", response.text)

        response.raise_for_status()

        data = response.json()
        quote = data.get("quote", {})

        payment.swap_status = "pending"

        payment.swap_tx = (
            data.get("quoteId")
            or quote.get("id")
        )
        
        amount_out = quote.get("amountOutFormatted")
        payment.swap_zec_amount = float(amount_out) if amount_out is not None else None

        db.session.commit()

        return (
            data.get("depositAddress")
            or data.get("quote", {}).get("depositAddress")
        )

    except Exception as e:

        print("🛑 Defuse quote failed")
        print(e)

        payment.swap_status = "failed"

        db.session.commit()

        return None