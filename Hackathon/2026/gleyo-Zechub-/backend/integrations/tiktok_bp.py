import logging
import os
import requests
import secrets

from datetime import datetime, timedelta
from urllib.parse import urlencode, unquote

from flask import Blueprint, redirect, url_for, flash, session, request, jsonify
from flask_login import current_user, login_required

from backend.utils.instance import db
from backend.auth.usertiktok import UserTikTok

logger = logging.getLogger(__name__)


CLIENT_KEY = os.getenv("TIKTOK_CLIENT_KEY")
CLIENT_SECRET = os.getenv("TIKTOK_CLIENT_SECRET")
REDIRECT_URI = os.getenv("TIKTOK_REDIRECT_URI")
SCOPES = "user.info.basic,video.list"


tiktok_bp = Blueprint("tiktok_bp", __name__, url_prefix="/tiktok")


# =========================
# AUTH URL (NO PKCE)
# =========================
def get_tiktok_oauth_url(state: str) -> str:
    session["tt_oauth_state"] = state
    session.modified = True

    params = {
        "client_key": CLIENT_KEY,
        "scope": SCOPES,
        "response_type": "code",
        "redirect_uri": REDIRECT_URI,
        "state": state,
    }

    url = f"https://www.tiktok.com/v2/auth/authorize?{urlencode(params)}"

    print("[LOGIN] OAuth URL:", url)
    return url


# =========================
# TOKEN EXCHANGE (WITH SECRET)
# =========================
def fetch_tiktok_tokens(code: str):
    token_url = "https://open.tiktokapis.com/v2/oauth/token/"

    data = {
        "client_key": CLIENT_KEY,
        "client_secret": CLIENT_SECRET,  
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    print("[TOKENS] Sending request...")
    resp = requests.post(token_url, data=data, headers=headers, timeout=60)

    print("[TOKENS] Status:", resp.status_code)
    print("[TOKENS] Body:", resp.text)

    if not resp.ok:
        return None

    tokens = resp.json()

    if not tokens.get("access_token"):
        print("[TOKENS ERROR]", tokens)
        return None

    tokens["expires_at"] = datetime.utcnow() + timedelta(
        seconds=tokens.get("expires_in", 3600)
    )

    return tokens


# =========================
# USER INFO
# =========================
def fetch_tiktok_user_info(access_token: str):
    url = "https://open.tiktokapis.com/v2/user/info/"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    params = {"fields": "open_id,display_name"}

    r = requests.get(url, params=params, headers=headers, timeout=15)

    print("[USER INFO]", r.status_code, r.text)

    if not r.ok:
        return None

    data = r.json().get("data", {}).get("user", {})

    return {
        "open_id": data.get("open_id"),
        "nickname": data.get("display_name"),
    }


# =========================
# LOGIN ROUTE
# =========================
@tiktok_bp.route("/login")
@login_required
def tiktok_login():
    state = secrets.token_urlsafe(24)

    url = get_tiktok_oauth_url(state)

    return redirect(url)


# =========================
# CALLBACK
# =========================
@tiktok_bp.route("/callback")
@login_required
def tiktok_callback():
    try:
        print("\n[CALLBACK ARGS]", request.args.to_dict())

        state = request.args.get("state")
        saved_state = session.pop("tt_oauth_state", None)

        if not state or state != saved_state:
            flash("Invalid OAuth state", "error")
            return redirect(url_for("account_settings_linked_accounts"))

        if "error" in request.args:
            flash("TikTok authorization failed", "error")
            return redirect(url_for("account_settings_linked_accounts"))

        code = unquote(request.args.get("code", ""))

        if not code:
            flash("No code received", "error")
            return redirect(url_for("account_settings_linked_accounts"))

        print("[CALLBACK] Code received:", code[:20])

        tokens = fetch_tiktok_tokens(code)

        if not tokens:
            flash("Failed to get TikTok access token", "error")
            return redirect(url_for("account_settings_linked_accounts"))

        user_info = fetch_tiktok_user_info(tokens["access_token"])

        if not user_info:
            flash("Failed to fetch TikTok user info", "error")
            return redirect(url_for("account_settings_linked_accounts"))

        record = UserTikTok.query.filter_by(
            user_id=current_user.id,
            open_id=user_info["open_id"]
        ).first()

        if not record:
            record = UserTikTok(
                user_id=current_user.id,
                open_id=user_info["open_id"],
                nickname=user_info["nickname"],
                access_token=tokens["access_token"],
                refresh_token=tokens.get("refresh_token"),
                token_type=tokens.get("token_type"),
                expires_at=tokens.get("expires_at"),
                action="connected",
            )
            db.session.add(record)
        else:
            record.nickname = user_info["nickname"]
            record.access_token = tokens["access_token"]
            record.refresh_token = tokens.get("refresh_token")
            record.token_type = tokens.get("token_type")
            record.expires_at = tokens.get("expires_at")
            record.action = "connected"

        db.session.commit()

        flash(f"TikTok '{user_info['nickname']}' connected!", "success")

        return redirect(url_for("account_settings_linked_accounts"))

    except Exception as e:
        import traceback
        traceback.print_exc()

        db.session.rollback()

        flash(f"TikTok login failed: {e}", "error")
        return redirect(url_for("account_settings_linked_accounts"))


# =========================
# DISCONNECT
# =========================
@tiktok_bp.route("/disconnect")
@login_required
def tiktok_disconnect():
    record = (
        UserTikTok.query.filter_by(user_id=current_user.id)
        .order_by(UserTikTok.timestamp.desc())
        .first()
    )

    if record and record.action == "connected":
        record.action = "disconnected"
        record.access_token = None
        record.refresh_token = None
        db.session.commit()

        return jsonify({
            "success": True,
            "message": f"TikTok '{record.nickname}' disconnected"
        })

    return jsonify({
        "success": False,
        "message": "No account found"
    }), 400