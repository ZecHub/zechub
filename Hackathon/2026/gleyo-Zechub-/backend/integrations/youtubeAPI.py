import os
import requests
import secrets
import logging

from datetime import datetime, timedelta
from urllib.parse import urlencode

from flask import (
    Blueprint,
    redirect,
    url_for,
    flash,
    request,
    session,
    jsonify,
)

from flask_login import current_user, login_required

from backend.utils.instance import db
from backend.auth.useryoutube import UserYouTube
from backend.models.models import Users

logger = logging.getLogger(__name__)

def is_ajax():
    return request.headers.get("X-Requested-With") == "XMLHttpRequest"
# ----------------------------
# YouTube API Config
# ----------------------------
CLIENT_ID = os.getenv("YOUTUBE_CLIENT_ID", "YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.getenv("YOUTUBE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("YOUTUBE_REDIRECT_URI", "https://gleyo.app/youtube/callback")
SCOPE = "https://www.googleapis.com/auth/youtube.readonly"

# ----------------------------
# Helper Functions
# ----------------------------
def get_youtube_oauth_url(state: str) -> str:
    """Generate Google OAuth URL for YouTube login with a state token"""
    base = "https://accounts.google.com/o/oauth2/v2/auth"
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": SCOPE,
        "access_type": "offline",
        "prompt": "consent",
        "state": state
    }
    return f"{base}?{urlencode(params)}"


def fetch_youtube_tokens(code: str):
    """Exchange OAuth code for access/refresh tokens"""
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code"
    }
    resp = requests.post(token_url, data=data, timeout=15)
    if not resp.ok:
        raise RuntimeError(f"YouTube token exchange failed: {resp.status_code} {resp.text}")
    tokens = resp.json()
    tokens['expires_at'] = datetime.utcnow() + timedelta(seconds=tokens.get('expires_in', 3600))
    return tokens


def fetch_youtube_user_info(access_token: str):
    """Fetch the authorized user's YouTube info (username/handle)"""
    headers = {"Authorization": f"Bearer {access_token}"}
    url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true"
    r = requests.get(url, headers=headers, timeout=15)
    if not r.ok:
        logger.warning(f"YouTube fetch failed: {r.status_code} {r.text}")
        return None  # fallback if request fails
    data = r.json()
    if 'items' in data and data['items']:
        channel = data['items'][0]['snippet']
        channel_id = data['items'][0]['id']
        return {
            "youtube_user_id": channel_id,
            "youtube_handle": channel['title']
        }
    # If user has no channel, fallback to using OAuth info (partial)
    # Use the access token to retrieve their YouTube user ID via 'https://www.googleapis.com/oauth2/v2/userinfo'
    userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    r = requests.get(userinfo_url, headers=headers, timeout=15)
    if r.ok:
        info = r.json()
        return {
            "youtube_user_id": info.get("id", f"yt_{current_user.id}"),  # fallback ID
            "youtube_handle": info.get("name", f"YTUser_{current_user.id}")  # fallback handle
        }
    # final fallback
    return {
        "youtube_user_id": f"yt_{current_user.id}",
        "youtube_handle": f"YTUser_{current_user.id}"
    }


# ----------------------------
# Flask Blueprint
# ----------------------------
youtube_bp = Blueprint("youtube_bp", __name__, url_prefix="/youtube")


# ----------------------------
# Routes
# ----------------------------
@youtube_bp.route("/login")
@login_required
def youtube_login():
    """Redirect user to Google OAuth to connect YouTube"""
    state = secrets.token_urlsafe(24)

    # Save state + intended redirect
    next_url = request.args.get("next") or request.referrer or url_for("account_settings_linked_accounts")
    session["yt_oauth_state"] = state
    session["yt_post_login_redirect"] = next_url

    auth_url = get_youtube_oauth_url(state)
    return redirect(auth_url)



@youtube_bp.route("/callback")
@login_required
def youtube_callback():
    try:
        # Check state
        state = request.args.get("state")
        saved_state = session.pop("yt_oauth_state", None)
        if not state or state != saved_state:
            flash("Invalid OAuth state. Please try again.", "error")
            redirect_url = session.pop("yt_post_login_redirect", url_for("account_settings_linked_accounts"))
            return redirect(redirect_url)

        # Check for error from Google
        if "error" in request.args:
            desc = request.args.get("error_description", "Unknown error")
            flash(f"YouTube authorization failed: {desc}", "error")
            redirect_url = session.pop("yt_post_login_redirect", url_for("account_settings_linked_accounts"))
            return redirect(redirect_url)

        code = request.args.get("code")
        if not code:
            flash("No code received from YouTube OAuth.", "error")
            redirect_url = session.pop("yt_post_login_redirect", url_for("account_settings_linked_accounts"))
            return redirect(redirect_url)

        # Exchange code for tokens
        tokens = fetch_youtube_tokens(code)
        logger.debug("YouTube tokens: %s", tokens)

        # Fetch YouTube user info
        user_info = fetch_youtube_user_info(tokens['access_token'])
        logger.debug("YouTube user info: %s", user_info)

        user = current_user

        # --- Check if YouTube ID is already connected by another user ---
        existing = UserYouTube.query.filter_by(
            youtube_user_id=user_info["youtube_user_id"], action="connected"
        ).first()
        if existing and existing.user_id != user.id:
            linked_user = Users.query.get(existing.user_id)
            linked_email = linked_user.email if linked_user else "another user"
            flash(f"YouTube account already used by {linked_email}", "error")
            redirect_url = session.pop("yt_post_login_redirect", url_for("account_settings_linked_accounts"))
            return redirect(redirect_url)

        # Check if user already has this YouTube account
        yt_record = UserYouTube.query.filter_by(
            user_id=user.id, youtube_user_id=user_info["youtube_user_id"]
        ).first()

        if not yt_record:
            yt_record = UserYouTube(
                user_id=user.id,
                youtube_user_id=user_info["youtube_user_id"],
                youtube_handle=user_info["youtube_handle"],
                access_token=tokens["access_token"],
                refresh_token=tokens.get("refresh_token"),
                token_type=tokens.get("token_type"),
                expires_at=tokens.get("expires_at"),
                action="connected"
            )
            db.session.add(yt_record)
        else:
            yt_record.youtube_handle = user_info["youtube_handle"]
            yt_record.access_token = tokens["access_token"]
            yt_record.refresh_token = tokens.get("refresh_token")
            yt_record.token_type = tokens.get("token_type")
            yt_record.expires_at = tokens.get("expires_at")
            yt_record.action = "connected"

        db.session.commit()
        flash(f"YouTube account '{user_info['youtube_handle']}' connected!", "success")

        # ✅ Redirect back to where the flow started
        redirect_url = session.pop("yt_post_login_redirect", url_for("account_settings_linked_accounts"))
        return redirect(redirect_url)

    except Exception as e:
        logger.exception("YouTube login failed")
        flash(str(e), "error")
        redirect_url = session.pop("yt_post_login_redirect", url_for("account_settings_linked_accounts"))
        return redirect(redirect_url)




@youtube_bp.route("/disconnect")
@login_required
def youtube_disconnect():
    yt_record = (
        UserYouTube.query.filter_by(user_id=current_user.id)
        .order_by(UserYouTube.timestamp.desc())
        .first()
    )

    if yt_record and yt_record.action == "connected":
        yt_record.action = "disconnected"
        yt_record.access_token = None
        yt_record.refresh_token = None
        db.session.commit()

        return jsonify({
            "success": True,
            "message": f"YouTube '{yt_record.youtube_handle}' disconnected"
        })

    return jsonify({
        "success": False,
        "message": "No connected YouTube account found"
    }), 400