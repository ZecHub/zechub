from flask import Blueprint, redirect, request, session, url_for, flash, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from datetime import datetime

import os
import urllib.parse
import requests
import secrets

from backend.utils.instance import db
from backend.models.models import Users
from backend.auth.userdiscord import UserDiscord
from backend.utils.utils import create_user_session, is_safe_url

bp = Blueprint("discord", __name__, url_prefix="/discord")
# ── Config ─────────────────────────────────────────────
CLIENT_ID     = os.getenv("DISCORD_CLIENT_ID")
CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET")

DISCORD_REDIRECT_URI = os.getenv("DISCORD_REDIRECT_URI")

SCOPE         = "identify email"

_AUTH_URL  = "https://discord.com/api/oauth2/authorize"
_TOKEN_URL = "https://discord.com/api/oauth2/token"
_ME_URL    = "https://discord.com/api/users/@me"


def is_ajax():
    return request.headers.get("X-Requested-With") == "XMLHttpRequest"


def block_if_pending_deletion(user):
    if user and user.deletion_requested_at:
        logout_user()
        session.clear()
        flash(
            "This account is scheduled for deletion and cannot be accessed.",
            "error"
        )
        return True
    return False


def safe_next(next_url, fallback):
    """Only allow same-site redirect targets; fall back otherwise."""
    if next_url and is_safe_url(next_url):
        return next_url
    return fallback


# ── Helpers ─────────────────────────────────────────────
def build_auth_url(state: str) -> str:
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": DISCORD_REDIRECT_URI,
        "response_type": "code",
        "scope": SCOPE,
        "state": state,
        "prompt": "consent",
    }
    return f"{_AUTH_URL}?{urllib.parse.urlencode(params)}"

def exchange_code(code: str) -> dict:
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": DISCORD_REDIRECT_URI,
    }
    r = requests.post(_TOKEN_URL, data=data, headers={
        "Content-Type": "application/x-www-form-urlencoded"
    }, timeout=10)
    r.raise_for_status()
    return r.json()

def fetch_current_user(access_token: str) -> dict:
    r = requests.get(_ME_URL, headers={
        "Authorization": f"Bearer {access_token}"
    }, timeout=10)
    r.raise_for_status()
    return r.json()

@bp.route("/login")
def discord_login():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard"))

    next_url = safe_next(request.args.get("next"), url_for("dashboard"))

    state = "login_" + secrets.token_urlsafe(8)
    session["discord_oauth_state"] = state
    session["discord_oauth_next"] = next_url

    return redirect(build_auth_url(state))

# ── Routes ─────────────────────────────────────────────
@bp.route("/connect")
def discord_connect():
    next_url = safe_next(request.args.get("next"), url_for("account_settings_linked_accounts"))

    # Save it in session (or encode into state)
    state = secrets.token_urlsafe(8)
    session["discord_oauth_state"] = state
    session["discord_oauth_next"] = next_url

    return redirect(build_auth_url(state))


@bp.route("/callback")
def discord_callback():
    code = request.args.get("code")
    state = request.args.get("state")

    saved_state = session.pop("discord_oauth_state", None)
    raw_next = session.pop("discord_oauth_next", url_for("account_settings_linked_accounts"))
    next_url = safe_next(raw_next, url_for("account_settings_linked_accounts"))

    # Require a saved_state to exist AND match — previously a missing saved_state
    # (e.g. expired session) silently skipped this check entirely.
    if not code or not saved_state or state != saved_state:
        flash("Invalid OAuth response.", "error")
        return redirect(next_url)

    try:
        token_data = exchange_code(code)
        user_json = fetch_current_user(token_data["access_token"])
        discord_id = user_json["id"]
        username = f"{user_json['username']}#{user_json['discriminator']}"

        # ── Determine if this is a login or linking flow ──
        if saved_state.startswith("login_"):
            record = UserDiscord.query.filter_by(
                discord_user_id=discord_id, action="connected"
            ).first()

            if record:
                user = Users.query.get(record.user_id)
                if user:

                    if user.deletion_requested_at:
                        session.clear()
                        flash(
                            "This account is scheduled for deletion and cannot be accessed.",
                            "error"
                        )
                        return redirect(url_for("login"))
                    login_user(user, remember=True)
                    create_user_session(user)

                    session["user_id"] = user.id
                    session["username"] = user.username
                    session["email"] = user.email
                    session["profile_pic"] = user.profile_pic
                    session["discord_connected"] = True
                    session["discord_username"] = username
                    session["discord_user_id"] = discord_id

                    flash(f"Logged in via Discord as {username}", "success")
                    return redirect(next_url)

                else:
                    flash("Discord linked to unknown user.", "error")
                    return redirect(next_url)

            else:
                flash("Account not found.", "error")
                return redirect(next_url)

        else:
            user_id = current_user.id if current_user.is_authenticated else None
            if not user_id:
                flash("You must be logged in to link Discord.", "error")
                return redirect(next_url)

            existing = UserDiscord.query.filter_by(
                discord_user_id=discord_id, action="connected"
            ).first()

            if existing and existing.user_id != user_id:
                linked_user = Users.query.get(existing.user_id)
                linked_email = linked_user.email if linked_user else "another user"
                flash(f"Discord account already used by {linked_email}", "error")
                return redirect(next_url)

            record = UserDiscord.query.filter_by(
                user_id=user_id, discord_user_id=discord_id
            ).first()

            if record:
                record.action = "connected"
                record.access_token = token_data["access_token"]
                record.refresh_token = token_data.get("refresh_token")
                record.token_type = token_data.get("token_type")
                record.timestamp = datetime.utcnow()
            else:
                record = UserDiscord(
                    user_id=user_id,
                    action="connected",
                    discord_username=username,
                    discord_user_id=discord_id,
                    access_token=token_data["access_token"],
                    refresh_token=token_data.get("refresh_token"),
                    token_type=token_data.get("token_type"),
                    timestamp=datetime.utcnow()
                )
                db.session.add(record)

            db.session.commit()

            session["discord_connected"] = True
            session["discord_username"] = username
            session["discord_user_id"] = discord_id
            flash(f"Connected to Discord as {username}", "success")

    except Exception as e:
        flash(f"Discord auth failed: {e}", "error")
        return redirect(next_url)

    return redirect(next_url)


@bp.route("/disconnect")
@login_required
def discord_disconnect():
    user_id = current_user.id

    record = (
        UserDiscord.query.filter_by(user_id=user_id)
        .order_by(UserDiscord.timestamp.desc())
        .first()
    )

    if record:
        record.action = "disconnected"
        record.timestamp = datetime.utcnow()
        db.session.commit()

    session.pop("discord_connected", None)
    session.pop("discord_username", None)

    return jsonify({
        "success": True,
        "message": "Discord disconnected"
    })