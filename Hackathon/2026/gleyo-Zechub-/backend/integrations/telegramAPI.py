from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required

from datetime import datetime
import hmac
import hashlib
import os

from backend.utils.instance import db
from backend.models.models import Users
from backend.auth.usertelegram import UserTelegram
from backend.utils.utils import csrf


telegram_bp = Blueprint("telegram", __name__, url_prefix="/telegram")
bot_token = os.getenv("TELEGRAM_BOT_TOKEN")


def verify_telegram_auth(data: dict, bot_token: str) -> bool:
    if not data or not bot_token:
        return False

    check_hash = data.get("hash")
    if not check_hash:
        return False

    # 🔥 DO NOT mutate original
    data_for_check = {
        k: str(v)
        for k, v in data.items()
        if k != "hash" and v is not None
    }

    data_check_string = "\n".join(
        f"{k}={v}" for k, v in sorted(data_for_check.items())
    )

    secret_key = hashlib.sha256(bot_token.encode()).digest()

    computed_hash = hmac.new(
        secret_key,
        data_check_string.encode(),
        hashlib.sha256
    ).hexdigest()

    return computed_hash == check_hash


@telegram_bp.route("/connect", methods=["POST"])
@csrf.exempt
def telegram_connect():
    data = request.get_json()
    if not verify_telegram_auth(data, bot_token):
        return jsonify({"error": "Invalid Telegram auth"}), 403

    telegram_user_id = str(data.get("id"))
    tusername = data.get("username")
    phone_number = data.get("phone_number")
    auth_date = datetime.fromtimestamp(int(data.get("auth_date", 0)))

    user_telegram = UserTelegram.query.filter_by(
        telegram_user_id=telegram_user_id,
        action="connected"
    ).first()
    if user_telegram and user_telegram.user_id != current_user.id:
        return jsonify({
            "error": "This Telegram account is already linked to another user"
        }), 400
    if not user_telegram:
        user_telegram = UserTelegram(
            user_id=current_user.id,
            telegram_user_id=str(telegram_user_id),
            tusername=tusername,
            phone_number=None,
            action="connected",
            photo_url=data.get("photo_url"),
            auth_date=auth_date,
            hash=data.get("hash")
        )
        db.session.add(user_telegram)
    else:
        user_telegram.user_id = current_user.id
        user_telegram.action = "connected"
        user_telegram.tusername = tusername
        user_telegram.phone_number = phone_number
        user_telegram.auth_date = auth_date
        user_telegram.photo_url = data.get("photo_url")
        user_telegram.hash = data.get("hash")

    db.session.commit()
    return jsonify({"success": True, "message": f"Telegram {tusername} connected"})


@telegram_bp.route("/disconnect", methods=["GET"])
@login_required
def telegram_disconnect():
    # Only ever disconnect the CURRENT user's currently-connected record.
    # Previously this took user_id from the URL (no auth check — anyone
    # could disconnect anyone else's Telegram) and used .first() with no
    # order_by, which could grab a stale already-disconnected row instead
    # of the real active one, making disconnect silently do nothing.
    user_telegram = (
        UserTelegram.query.filter_by(user_id=current_user.id, action="connected")
        .order_by(UserTelegram.timestamp.desc())
        .first()
    )

    if not user_telegram:
        return jsonify({"error": "No connected Telegram account found"}), 404

    user_telegram.action = "disconnected"
    db.session.commit()
    return jsonify({
        "success": True,
        "message": f"Telegram {user_telegram.tusername} disconnected"
    })


@telegram_bp.route("/callback")
def telegram_callback():
    return """
        <script>
            const hash = window.location.hash.substring(1);

            let data;

            // 🔥 FORCE detect tgAuthResult
            if (hash.startsWith("tgAuthResult=")) {
                const raw = hash.replace("tgAuthResult=", "");

                function decodeBase64Url(str) {
                    str = str.replace(/-/g, '+').replace(/_/g, '/');
                    const pad = str.length % 4;
                    if (pad) str += '='.repeat(4 - pad);
                    return atob(str);
                }

                try {
                    data = JSON.parse(decodeBase64Url(raw));
                } catch (e) {
                    console.error("DECODE FAILED", e);
                    document.body.innerHTML = "<h3>Decode failed</h3>";
                    throw e;
                }

            } else {
                // fallback (normal Telegram mode)
                const params = new URLSearchParams(hash);
                data = {};
                for (const [key, value] of params.entries()) {
                    data[key] = value;
                }
            }

            fetch("/telegram/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            })
            .then(async (res) => {
                const result = await res.json();

                if (res.ok) {
                    window.location.href = "/settings/linked-accounts";
                } else {
                    document.body.innerHTML = "<h3>Telegram connect failed</h3>";
                }
            })
            .catch(err => {
                console.error(err);
                document.body.innerHTML = "<h3>Something went wrong</h3>";
            });
        </script>
    """