import os, secrets, requests, urllib.parse
from dotenv import load_dotenv
from flask import Blueprint, redirect, url_for, session, request, flash
from requests_oauthlib import OAuth2Session
from flask_login import login_user, logout_user, current_user
from backend.models.models import Users
from backend.utils.utils import create_user_session, is_safe_url
from backend.utils.instance import db
from datetime import datetime
import requests
from werkzeug.utils import secure_filename
import uuid
from supabase import create_client
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


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


os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# ── Google console values ───────────────────
GOOGLE_CLIENT_ID     = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI  = os.getenv("GOOGLE_REDIRECT_URI")

AUTH_URL  = "https://accounts.google.com/o/oauth2/v2/auth"
TOKEN_URL = "https://oauth2.googleapis.com/token"
USERINFO  = "https://www.googleapis.com/oauth2/v1/userinfo"
SCOPE = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]

google_bp = Blueprint("google_bp", __name__)

def _oauth(state=None, token=None):
    return OAuth2Session(
        client_id=GOOGLE_CLIENT_ID,
        state=state,
        token=token,
        scope=SCOPE,
        redirect_uri=GOOGLE_REDIRECT_URI,
        auto_refresh_kwargs={
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
        },
        auto_refresh_url=TOKEN_URL,
        token_updater=lambda t: session._setitem_("google_token", t),
    )



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




# ── Routes ───────────────────────────────────
@google_bp.route("/google-login")
def login_goggle():
    if current_user.is_authenticated:
            return redirect(url_for("dashboard"))
    state = secrets.token_urlsafe(16)
    session["google_state"] = state  # store temporarily for callback verification

    google = _oauth(state=state)
    auth_url, _ = google.authorization_url(
        AUTH_URL,
        access_type="offline",
        prompt="select_account"
    )

    return redirect(auth_url)

@google_bp.route("/google-callback")
def callback():
    if "error" in request.args:
        flash(f"Google error: {request.args['error']}", "error")
        return redirect(url_for("home"))

    saved_state = session.pop("google_state", None)
    google = _oauth(state=saved_state)
    token = google.fetch_token(
        TOKEN_URL,
        client_secret=GOOGLE_CLIENT_SECRET,
        authorization_response=request.url
    )

    resp = google.get(USERINFO)
    if not resp.ok:
        flash("Couldn’t fetch Google profile", "error")
        return redirect(url_for("home"))

    profile = resp.json()
    email = profile.get("email")
    name = profile.get("name")
    picture = profile.get("picture")

    relative_path = None

    if picture:
        try:
            r = requests.get(picture)
            r.raise_for_status()

            file_bytes = r.content

            original_name = secure_filename(picture)
            ext = original_name.rsplit(".", 1)[-1].lower()

            if ext not in {"png", "jpg", "jpeg", "webp"}:
                ext = "jpg"

            avatar_uuid = str(uuid.uuid4())

            # EXACT SAME PATH STRUCTURE
            storage_name = f"users/{user.id}/avatar/{avatar_uuid}.{ext}"

            supabase.storage.from_("uploads").upload(
                storage_name,
                file_bytes,
                {
                    "content-type": "image/jpeg",
                    "cache-control": "3600"
                }
            )

            public_url = supabase.storage.from_("uploads").get_public_url(
                storage_name
            )

            relative_path = public_url

        except Exception as e:
            print("Failed to upload Google avatar:", e)

    # Look for existing user
    user = Users.query.filter_by(email=email).first()

    if user:
        # 🚫 BLOCK deleted / pending users
        if user.deletion_requested_at:
            session.clear()
            flash(
                "This account is scheduled for deletion and cannot be accessed.",
                "error"
            )
            return redirect(url_for("login"))

        # ✅ SAFE LOGIN
        login_user(user, remember=True)
        create_user_session(user) 
        session["user_id"] = user.id
        session["username"] = user.username
        session["email"] = user.email
        session["profile_pic"] = relative_path or user.profile_pic
        session["google_connected"] = True

        flash(f"Logged in via Google as {user.username}", "success")
        next_url = session.pop("next", None)
        return redirect(next_url or url_for("dashboard"))


    else:
        # New user → store pending info
        session["pending_email"] = email
        session["pending_profile_pic"] = relative_path 
        session["allow_username_pick"] = True
        session["google_connected"] = True
        flash("Hello new user! Please pick a username.", "info")
        return redirect(url_for("pick_username"))
