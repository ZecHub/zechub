from flask import Blueprint, redirect, request, session, url_for, flash, jsonify
from flask_login import current_user, login_required

from datetime import datetime

import os
import urllib.parse
import requests
import secrets

from backend.utils.instance import db
from backend.models.models import Users
from backend.auth.usergithub import UserGithub
bp = Blueprint("github_bp", __name__, url_prefix="/github")

# ── Config ─────────────────────────────────────────────
CLIENT_ID     = os.getenv("GITHUB_CLIENT_ID")
CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")

REDIRECT_URI  = os.getenv("GITHUB_REDIRECT_URI")

SCOPE = "read:user user:email public_repo"

_AUTH_URL  = "https://github.com/login/oauth/authorize"
_TOKEN_URL = "https://github.com/login/oauth/access_token"
_ME_URL    = "https://api.github.com/user"

# ── Helpers ─────────────────────────────────────────────
def build_auth_url(state: str) -> str:
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "scope": SCOPE,
        "state": state,
    }
    return f"{_AUTH_URL}?{urllib.parse.urlencode(params)}"

def exchange_code(code: str) -> dict:
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }
    r = requests.post(_TOKEN_URL, data=data, headers={
        "Accept": "application/json"
    }, timeout=10)
    r.raise_for_status()
    return r.json()

def fetch_github_user(access_token: str) -> dict:
    r = requests.get(_ME_URL, headers={
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.github+json"
    }, timeout=10)
    r.raise_for_status()
    return r.json()

# ── Repo helpers you can call anywhere ──────────────────
def get_user_repos(access_token: str, username: str) -> list:
    """Get all public repos for a GitHub user."""
    r = requests.get(
        f"https://api.github.com/users/{username}/repos",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json"
        },
        params={"per_page": 100, "sort": "updated"},
        timeout=10
    )
    r.raise_for_status()
    return r.json()

def check_if_forked(access_token: str, username: str, repo_name: str) -> bool:
    """Check if a specific repo is a fork."""
    r = requests.get(
        f"https://api.github.com/repos/{username}/{repo_name}",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json"
        },
        timeout=10
    )
    if r.status_code == 404:
        return False
    r.raise_for_status()
    return r.json().get("fork", False)

def get_repo_forks(access_token: str, owner: str, repo_name: str) -> list:
    """Get list of users who forked a specific repo."""
    r = requests.get(
        f"https://api.github.com/repos/{owner}/{repo_name}/forks",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json"
        },
        params={"per_page": 100},
        timeout=10
    )
    r.raise_for_status()
    return r.json()


def check_if_starred(access_token: str, owner: str, repo_name: str) -> bool:

    r = requests.get(
        f"https://api.github.com/user/starred/{owner}/{repo_name}",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json"
        },
        timeout=10
    )

    if r.status_code == 204:
        return True

    if r.status_code == 404:
        return False

    r.raise_for_status()

    return False

# ── Routes ─────────────────────────────────────────────
@bp.route("/login")
@login_required
def github_login():
    next_url = request.args.get("next") or url_for("account_settings_linked_accounts")

    state = secrets.token_urlsafe(8)
    session["github_oauth_state"] = state
    session["github_oauth_next"]  = next_url

    return redirect(build_auth_url(state))


@bp.route("/callback")
@login_required
def github_callback():
    code  = request.args.get("code")
    state = request.args.get("state")

    saved_state = session.pop("github_oauth_state", None)
    next_url    = session.pop("github_oauth_next", url_for("account_settings_linked_accounts"))

    if not code or state != saved_state:
        flash("Invalid OAuth response.", "error")
        return redirect(next_url)

    try:
        token_data  = exchange_code(code)
        access_token = token_data.get("access_token")

        if not access_token:
            flash("GitHub did not return an access token.", "error")
            return redirect(next_url)

        user_json       = fetch_github_user(access_token)
        github_id       = str(user_json["id"])
        github_username = user_json["login"]
        github_email    = user_json.get("email") or ""
        github_avatar   = user_json.get("avatar_url") or ""
        github_profile  = user_json.get("html_url") or ""
        token_type      = token_data.get("token_type", "bearer")
        scope           = token_data.get("scope", SCOPE)
        user_id         = current_user.id

        # Block if already linked to a different account
        existing = UserGithub.query.filter_by(
            github_user_id=github_id, action="connected"
        ).first()

        if existing and existing.user_id != user_id:
            linked_user  = Users.query.get(existing.user_id)
            linked_email = linked_user.email if linked_user else "another user"
            flash(f"GitHub account already connected to {linked_email}", "error")
            return redirect(next_url)

        record = UserGithub.query.filter_by(
            user_id=user_id, github_user_id=github_id
        ).first()

        if record:
            record.action          = "connected"
            record.access_token    = access_token
            record.token_type      = token_type
            record.scope           = scope
            record.github_username = github_username
            record.github_email    = github_email
            record.github_avatar   = github_avatar
            record.github_profile  = github_profile
            record.timestamp       = datetime.utcnow()
        else:
            record = UserGithub(
                user_id        = user_id,
                action         = "connected",
                github_user_id = github_id,
                github_username= github_username,
                github_email   = github_email,
                github_avatar  = github_avatar,
                github_profile = github_profile,
                access_token   = access_token,
                token_type     = token_type,
                scope          = scope,
                timestamp      = datetime.utcnow()
            )
            db.session.add(record)

        db.session.commit()

        session["github_connected"]  = True
        session["github_username"]   = github_username
        session["github_user_id"]    = github_id
        flash(f"Connected to GitHub as @{github_username}", "success")

    except Exception as e:
        flash(f"GitHub auth failed: {e}", "error")

    return redirect(next_url)


@bp.route("/disconnect")
@login_required
def github_disconnect():
    user_id = current_user.id

    record = (
        UserGithub.query.filter_by(user_id=user_id)
        .order_by(UserGithub.timestamp.desc())
        .first()
    )

    if record:
        record.action    = "disconnected"
        record.timestamp = datetime.utcnow()
        db.session.commit()

    session.pop("github_connected", None)
    session.pop("github_username", None)
    session.pop("github_user_id", None)

    return jsonify({"success": True, "message": "GitHub disconnected"})

