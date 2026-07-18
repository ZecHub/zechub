import os
import secrets
import hashlib
import base64
import urllib.parse
import requests
import logging

from datetime import datetime, timedelta

from flask import Blueprint, session, redirect, url_for, request, flash

from backend.utils.instance import db
from backend.utils.utils import create_user_session, is_safe_url
from backend.communities.community_models import Community
from backend.integrations.twitter_models import CommunityTwitter

logger = logging.getLogger(__name__)

community_twitter_bp = Blueprint("community_twitter", __name__)

# ─── Config (from twittersetup / env vars) ───────────────────────────────
CLIENT_ID = os.getenv("COMM_TWITTER_CLIENT_ID")
CLIENT_SECRET = os.getenv("COMM_TWITTER_CLIENT_SECRET")
REDIRECT_URI = os.getenv("COMM_TWITTER_REDIRECT_URI")


SCOPES = ["tweet.read", "users.read", "offline.access"]

AUTH_URL  = "https://twitter.com/i/oauth2/authorize"
TOKEN_URL = "https://api.twitter.com/2/oauth2/token"
ME_URL    = "https://api.twitter.com/2/users/me?user.fields=username"

# ─── PKCE Helpers ───────────────────────────────────────────────────────
def _pkce_pair() -> tuple[str, str]:
    verifier = secrets.token_urlsafe(64)
    challenge = base64.urlsafe_b64encode(
        hashlib.sha256(verifier.encode()).digest()
    ).rstrip(b"=").decode()
    return verifier, challenge

def _new_state() -> str:
    return secrets.token_urlsafe(24)

# ─── OAuth Helpers ──────────────────────────────────────────────────────
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

# ─── Routes ─────────────────────────────────────────────────────────────
@community_twitter_bp.route("/community-twitter-login/<int:community_id>")
def community_twitter_login(community_id):
    comm = Community.query.get(community_id)
    if not comm:
        flash("Community not found.", "error")
        return redirect(url_for("dashboard"))

    session["linking_community_id"] = community_id
    # 👇 save next URL if provided
    next_url = request.args.get("next")
    if next_url and is_safe_url(next_url):
        session["twitter_next_url"] = next_url

    try:
        auth_url = build_authorize_url(session)
        return redirect(auth_url)
    except Exception as e:
        flash(f"Failed to start Twitter login: {e}", "error")
        return redirect(url_for("setup1", community_slug=comm.slug))



@community_twitter_bp.route("/community-twitter-callback")
def community_twitter_callback():
    logger.debug("Community Twitter callback triggered. Args: %s", dict(request.args))

    if "error" in request.args:
        flash(f"Twitter authorization failed: {request.args.get('error_description')}", "error")
        return redirect(url_for("dashboard"))

    # Validate state
    state = request.args.get("state")
    saved_state = session.pop("tw_state", None)
    if not state or not saved_state or state != saved_state:
        flash("Invalid OAuth state.", "error")
        return redirect(url_for("dashboard"))

    code = request.args.get("code")
    code_verifier = session.pop("tw_code_verifier", None)
    if not code or not code_verifier:
        community_id = session.get("linking_community_id")
        comm = Community.query.get(community_id) if community_id else None
        slug = comm.slug if comm else ""
        flash("Invalid callback payload.", "error")
        return redirect(url_for("setup1", community_slug=slug))

    try:
        token_json = exchange_code_for_token(code, code_verifier)
        access_token  = token_json.get("access_token")
        refresh_token = token_json.get("refresh_token")
        token_type    = token_json.get("token_type")
        expires_in    = token_json.get("expires_in")   

        if not access_token:
            raise RuntimeError("No access_token from Twitter")

        me = fetch_current_user(access_token)
        twitter_id       = me["id"]
        twitter_username = me["username"]

    except Exception as e:
        logger.exception("Community Twitter login failed")
        community_id = session.get("linking_community_id")
        comm = Community.query.get(community_id) if community_id else None
        slug = comm.slug if comm else ""
        flash(f"Twitter login failed: {e}", "error")
        return redirect(url_for("setup1", community_slug=slug))

    # Link community
    community_id = session.pop("linking_community_id", None)
    comm = Community.query.get(community_id)
    if not comm:
        flash("Community not found.", "error")
        return redirect(url_for("setup1", community_slug=""))

    # Save or update CommunityTwitter record
    tw = CommunityTwitter.query.filter_by(community_id=comm.id).first()
    if not tw:
        tw = CommunityTwitter(
            community_id=comm.id,
            twitter_user_id=twitter_id,
            xusername=twitter_username,
            action="connected",
            access_token=access_token,
            refresh_token=refresh_token,
            token_type=token_type,
        )
        db.session.add(tw)
    else:
        tw.twitter_user_id = twitter_id
        tw.xusername = twitter_username
        tw.access_token = access_token
        tw.refresh_token = refresh_token
        tw.token_type = token_type
        tw.action = "connected"

    db.session.commit()

    flash(f"Community {comm.name} linked to Twitter @{twitter_username}", "success")

    next_url = session.pop("twitter_next_url", None)
    if next_url and is_safe_url(next_url):
        return redirect(next_url)
    return redirect(url_for("setup1", community_slug=comm.slug))

@community_twitter_bp.route("/community-twitter-disconnect/<int:community_id>")
def community_twitter_disconnect(community_id):
    comm = Community.query.get(community_id)
    slug = comm.slug if comm else ""
    if not comm:
        flash("Community not found.", "error")
        return redirect(url_for("setup1", community_slug=slug))

    tw = CommunityTwitter.query.filter_by(community_id=community_id, action="connected").first()
    if tw:
        tw.action = "disconnected"
        tw.access_token = None
        tw.refresh_token = None
        db.session.commit()

    flash(f"Community {comm.name} disconnected from Twitter.", "info")
    return redirect(url_for("setup1", community_slug=slug))
