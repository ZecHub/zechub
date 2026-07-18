import os
import secrets
import hashlib
import base64
import urllib.parse
import requests
import logging

from flask import Blueprint, session, redirect, url_for, request, flash
from flask_login import login_required, current_user

from backend.utils.instance import db
from backend.models.models import Users
from backend.auth.usertwitter import UserTwitter

logger = logging.getLogger(__name__)
twitter_bp = Blueprint("twitter", __name__)

# ─── Config ─────────────────────────────────────────────
CLIENT_ID     = os.getenv("TWITTER_CLIENT_ID")
CLIENT_SECRET = os.getenv("TWITTER_CLIENT_SECRET")
REDIRECT_URI  = os.getenv("TWITTER_REDIRECT_URI")

SCOPES = ["tweet.read", "users.read", "offline.access"]

AUTH_URL  = "https://twitter.com/i/oauth2/authorize"
TOKEN_URL = "https://api.twitter.com/2/oauth2/token"
ME_URL    = "https://api.twitter.com/2/users/me?user.fields=username"

# ─── PKCE helpers ──────────────────────────────────────
def _pkce_pair() -> tuple[str, str]:
    verifier = secrets.token_urlsafe(64)
    challenge = base64.urlsafe_b64encode(
        hashlib.sha256(verifier.encode()).digest()
    ).rstrip(b"=").decode()
    return verifier, challenge

def _new_state() -> str:
    return secrets.token_urlsafe(24)

# ─── OAuth helpers ─────────────────────────────────────
def build_authorize_url(sess) -> str:
    code_verifier, code_challenge = _pkce_pair()
    sess["tw_code_verifier"] = code_verifier
    state = _new_state()
    sess["tw_state"] = state

    params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "scope": " ".join(SCOPES),
        "state": state,
        "code_challenge": code_challenge,
        "code_challenge_method": "S256",
    }
    return AUTH_URL + "?" + urllib.parse.urlencode(params)

def exchange_code_for_token(code: str, code_verifier: str) -> dict:
    data = {
        "client_id": CLIENT_ID,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "code_verifier": code_verifier,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    resp = requests.post(TOKEN_URL, data=data, headers=headers, timeout=20)
    if not resp.ok:
        raise RuntimeError(f"Token error {resp.status_code}: {resp.text}")
    return resp.json()

def fetch_current_user(access_token: str) -> dict:
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = requests.get(ME_URL, headers=headers, timeout=15)
    if not resp.ok:
        raise RuntimeError(f"/users/me error {resp.status_code}: {resp.text}")
    return resp.json()["data"]

# ─── Routes ─────────────────────────────────────────────
@twitter_bp.route("/twitter-login")
@login_required 
def twitter_login():
    try:
        # capture intended redirect
        next_url = request.args.get("next") or request.referrer or url_for("account_settings_linked_accounts")
        session["tw_post_login_redirect"] = next_url  

        auth_url = build_authorize_url(session)
        return redirect(auth_url)
    except Exception as e:
        flash(f"Failed to start Twitter login: {e}", "error")
        return redirect(url_for("account_settings_linked_accounts"))



@twitter_bp.route("/twitter-callback")
def twitter_callback():
    logger.debug("Twitter callback triggered. Args: %s", dict(request.args))

    # default redirect (fallback)
    fallback_url = url_for("account_settings_linked_accounts")
    next_url = session.pop("tw_post_login_redirect", None) or fallback_url

    # Handle explicit error from Twitter
    if "error" in request.args:
        error = request.args.get("error")
        desc  = request.args.get("error_description")
        logger.error("Twitter OAuth error: %s (%s)", error, desc)
        flash(f"Twitter authorization failed: {desc or error}", "error")
        return redirect(next_url)

    # Validate state
    state = request.args.get("state")
    saved_state = session.pop("tw_state", None)
    logger.debug("Validating state: got=%s saved=%s", state, saved_state)
    if not state or not saved_state or state != saved_state:
        logger.warning("Invalid state in Twitter callback")
        flash("Invalid OAuth state. Please try again.", "error")
        return redirect(next_url)

    # Extract code
    code = request.args.get("code")
    code_verifier = session.pop("tw_code_verifier", None)
    logger.debug("OAuth code: %s, code_verifier present=%s", code, bool(code_verifier))
    if not code or not code_verifier:
        flash("Invalid callback payload. Please try again.", "error")
        return redirect(next_url)

    try:
        token_json = exchange_code_for_token(code, code_verifier)
        logger.debug("Token response: %s", token_json)

        access_token  = token_json.get("access_token")
        refresh_token = token_json.get("refresh_token")
        token_type    = token_json.get("token_type")

        if not access_token:
            raise RuntimeError(f"No access_token in response: {token_json}")

        me = fetch_current_user(access_token)
        logger.debug("Twitter user response: %s", me)

        twitter_id       = me["id"]
        twitter_username = me["username"]

    except Exception as e:
        logger.exception("Twitter login failed")
        flash(f"Twitter login failed: {e}", "error")
        return redirect(next_url)

    # ─── Persist using user_id ───────────────────────────
    user_id = current_user.id if current_user.is_authenticated else None

    user = Users.query.get(user_id)
    logger.debug("Found user: %s", user)
    if not user:
        flash("User not found.", "error")
        return redirect(next_url)

    existing = UserTwitter.query.filter_by(
        twitter_user_id=twitter_id, action="connected"
    ).first()
    if existing and existing.user_id != user.id:
        linked_user = Users.query.get(existing.user_id)
        linked_email = linked_user.email if linked_user else "another user"
        flash(f"Twitter account already used by {linked_email}", "error")
        return redirect(next_url)

    user_tw = UserTwitter.query.filter_by(
        user_id=user.id, twitter_user_id=twitter_id
    ).first()
    if not user_tw:
        logger.info("Creating new Twitter link for user %s", user.id)
        user_tw = UserTwitter(
            user_id=user.id,
            twitter_user_id=twitter_id,
            xusername=twitter_username,
            action="connected",
            access_token=access_token,
            refresh_token=refresh_token,
            token_type=token_type
        )
        db.session.add(user_tw)
    else:
        logger.info("Updating Twitter link for user %s", user.id)
        user_tw.xusername = twitter_username
        user_tw.access_token = access_token
        user_tw.refresh_token = refresh_token
        user_tw.token_type = token_type
        user_tw.action = "connected"

    db.session.commit()
    logger.debug("Twitter link committed to DB")

    session["twitter_connected"] = True
    session["twitter_username"] = twitter_username

    flash(f"Connected Twitter @{twitter_username}", "success")
    return redirect(next_url)


from flask_login import login_required
from flask import request, jsonify

def is_ajax():
    return request.headers.get("X-Requested-With") == "XMLHttpRequest"

@twitter_bp.route("/twitter-disconnect")
@login_required
def twitter_disconnect():
    user_tw = UserTwitter.query.filter_by(
        user_id=current_user.id,
        action="connected"
    ).first()

    if user_tw:
        user_tw.action = "disconnected"
        user_tw.access_token = None
        user_tw.refresh_token = None
        db.session.commit()

        session.pop("twitter_connected", None)
        session.pop("twitter_username", None)

        return jsonify({
            "success": True,
            "message": "Twitter disconnected"
        })

    return jsonify({
        "success": False,
        "message": "No connected Twitter account found"
    }), 400


@twitter_bp.route("/debug-session")
def debug_session():
    return {
        "flask_login_user": current_user.get_id(),
        "twitter_connected": session.get("twitter_connected"),
        "twitter_username": session.get("twitter_username"),
    }






def refresh_access_token(user_tw: UserTwitter) -> bool:
    """Use the refresh_token to get a new access token."""
    if not user_tw.refresh_token:
        return False

    data = {
        "client_id": CLIENT_ID,
        "grant_type": "refresh_token",
        "refresh_token": user_tw.refresh_token,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    try:
        resp = requests.post(TOKEN_URL, data=data, headers=headers, timeout=10)
        resp.raise_for_status()
        tokens = resp.json()

        user_tw.access_token = tokens.get("access_token")
        user_tw.refresh_token = tokens.get("refresh_token", user_tw.refresh_token)
        db.session.commit()
        return True
    except requests.RequestException as e:
        print(f"Failed to refresh Twitter token for {user_tw.xusername}: {e}")
        return False


from datetime import datetime, timedelta
import requests

def get_live_followers_count(user_tw: UserTwitter) -> int:
    """
    Fetch the real-time followers count for a connected Twitter user.
    Uses refresh_token if access_token expired.
    Caches the count for 5 minutes to avoid rate limits.
    """
    if not user_tw:
        return 0

    now = datetime.utcnow()
    # Return cached value if last check was within 5 minutes
    if user_tw.followers_last_checked and (now - user_tw.followers_last_checked) < timedelta(minutes=5):
        return user_tw.last_followers_count or 0

    # Ensure we have a valid access_token
    if not user_tw.access_token:
        from twitterAPI import refresh_access_token
        if not refresh_access_token(user_tw):
            # Return cached value if token cannot be refreshed
            return user_tw.last_followers_count or 0

    url = f"https://api.twitter.com/2/users/{user_tw.twitter_user_id}?user.fields=public_metrics"
    headers = {"Authorization": f"Bearer {user_tw.access_token}"}

    try:
        resp = requests.get(url, headers=headers, timeout=10)
        # Try refresh if token expired
        if resp.status_code == 401:
            from twitterAPI import refresh_access_token
            if refresh_access_token(user_tw):
                headers["Authorization"] = f"Bearer {user_tw.access_token}"
                resp = requests.get(url, headers=headers, timeout=10)

        resp.raise_for_status()
        data = resp.json()
        followers_count = data.get("data", {}).get("public_metrics", {}).get("followers_count", 0)

        # Cache the value
        user_tw.last_followers_count = followers_count
        user_tw.followers_last_checked = now
        db.session.commit()

        return followers_count
    except requests.RequestException as e:
        print(f"Error fetching Twitter followers for {user_tw.xusername}: {e}")
        # Return cached count if API fails
        return user_tw.last_followers_count or 0
