import threading
import urllib.parse
import requests
import discord
import os
import secrets

from datetime import datetime
from discord.ext import commands
from flask import Blueprint, redirect, request, session, url_for, flash

from backend.utils.instance import db
from backend.integrations.discord_models import DiscordGuild
from backend.communities.community_models import Community

flask_app = None  # will be set from app.py

# ── Discord App Credentials ──────────────────────────────
BOT_DISCORD_CLIENT_ID = os.getenv("BOT_DISCORD_CLIENT_ID")
BOT_DISCORD_CLIENT_SECRET = os.getenv("BOT_DISCORD_CLIENT_SECRET")
BOT_DISCORD_REDIRECT_URI = "https://gleyo.app/bot/callback"
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")

bp_discord_bot = Blueprint("discord_bot", __name__)

# ── Discord Endpoints ────────────────────────────────────
AUTH_URL = "https://discord.com/api/oauth2/authorize"
TOKEN_URL = "https://discord.com/api/oauth2/token"
API_BASE = "https://discord.com/api/v10"

# ── Scopes & Permissions ─────────────────────────────────
SCOPE = "bot applications.commands"
PERMISSIONS = "268438544"  # adjust as needed

import asyncio

role_assignment_queue = asyncio.Queue()


# ---------------- PKCE / OAuth Helpers ---------------- #
def _new_state() -> str:
    return secrets.token_urlsafe(24)

def build_bot_invite_url(sess) -> str:
    state = _new_state()
    sess["discord_bot_state"] = state
    params = {
        "client_id": BOT_DISCORD_CLIENT_ID,
        "redirect_uri": BOT_DISCORD_REDIRECT_URI,
        "response_type": "code",
        "scope": SCOPE,
        "permissions": PERMISSIONS,
        "state": state,
    }
    return AUTH_URL + "?" + urllib.parse.urlencode(params)

# ---------------- OAUTH ROUTES ---------------- #
@bp_discord_bot.route("/invite_bot")
def invite_bot():
    community_id = request.args.get("community_id")
    if not community_id:
        flash("No community selected", "error")
        return redirect("/")

    session["community_id"] = community_id

    # 🔹 Automatically save the page the user came from
    # Only allow relative paths to prevent open-redirect via ?next= or spoofed referrer
    next_url = request.args.get("next") or request.referrer
    if next_url and not next_url.startswith("/"):
        next_url = None
    if next_url:
        session["discord_next_url"] = next_url

    try:
        auth_url = build_bot_invite_url(session)
        return redirect(auth_url)
    except Exception as e:
        flash(f"Failed to start Discord bot login: {e}", "error")
        comm = Community.query.get(community_id)
        slug = comm.slug if comm else ""
        return redirect(url_for("setup1", community_slug=slug))


async def process_role_queue():
    await bot.wait_until_ready()
    while True:
        try:
            user_id, reward_data, community_id = await role_assignment_queue.get()

            with flask_app.app_context():
                guild_record = DiscordGuild.query.filter_by(
                    community_id=community_id,
                    bot_joined=True
                ).first()

            if not guild_record:
                print(f"❌ No Discord guild found for community {community_id}")
                continue

            guild = discord.utils.get(bot.guilds, id=int(guild_record.guild_id))
            if not guild:
                print(f"❌ Guild {guild_record.guild_id} not found in bot guilds")
                continue

            member = guild.get_member(int(user_id))
            if not member:
                print(f"❌ Member {user_id} not found in guild {guild.name}")
                continue

            role_id = reward_data.get("role_id") or guild_record.discord_role_id
            role_name = reward_data.get("role")

            # Try ID first
            role_obj = None
            if role_id:
                role_obj = guild.get_role(int(role_id))

            # Fallback to name lookup (case-insensitive)
            if not role_obj and role_name:
                role_name_clean = role_name.strip().lower()
                role_obj = discord.utils.find(lambda r: r.name.strip().lower() == role_name_clean, guild.roles)

            if not role_obj:
                print(f"❌ Role not found in guild '{guild.name}'")
                print(f"   Attempted lookup - id: {role_id}, name: {role_name}")
                print(f"   Available roles in guild:")
                for r in guild.roles:
                    print(f"     id={r.id}, name='{r.name}'")
                continue

            await member.add_roles(role_obj, reason="Subquest reward claim")
            print(f"✅ Assigned role {role_obj.name} to {member}")

        except Exception as e:
            print(f"❌ Failed to assign role from queue: {e}")
        finally:
            await asyncio.sleep(0.1)

async def update_guild_member_counts():
    await bot.wait_until_ready()
    while True:
        for guild in bot.guilds:
            try:
                # Fetch live member count
                member_count = guild.member_count  # requires Intents.members
                with flask_app.app_context():
                    record = DiscordGuild.query.filter_by(guild_id=str(guild.id)).first()
                    if record:
                        record.member_count = member_count
                        record.member_count_updated_at = datetime.utcnow()
                        db.session.commit()
                        print(f"✅ Updated {guild.name} to {member_count} members")
            except Exception as e:
                print(f"⚠️ Failed updating count for {guild.name}: {e}")

        await asyncio.sleep(4 * 60 * 60)  # 4 hours


from typing import Tuple, List, Dict

def user_has_discord_role(user_roles: List[str], role_name_or_id: str, role_name_to_id: Dict[str, str]) -> bool:
    """
    Check if a Discord user has a specific role in a guild.
    - user_roles: list of role IDs the user has
    - role_name_or_id: role name or numeric role ID to check
    - role_name_to_id: mapping of role names (lowercase) to role IDs in the guild
    """
    if not user_roles or not role_name_or_id:
        return False

    role_id = str(role_name_or_id).strip()
    if not role_id.isdigit():  # If role_name, map to ID
        role_id = role_name_to_id.get(role_name_or_id.strip().lower())
        if not role_id:
            return False

    return role_id in user_roles

def fetch_discord_roles_and_member(guild_id: str, discord_user_id: str) -> Tuple[List[str], Dict[str, str]]:
    """
    Fetches the member roles and guild roles for a Discord user in a guild.

    Returns:
        user_roles: List of role IDs the user has
        role_name_to_id: Dict mapping role names (lowercase) -> role IDs
    """
    user_roles: list[str] = []
    role_name_to_id: dict[str, str] = {}

    headers = {"Authorization": f"Bot {DISCORD_BOT_TOKEN}"}

    # Fetch member roles
    try:
        r_member = requests.get(
            f"{API_BASE}/guilds/{guild_id}/members/{discord_user_id}",
            headers=headers,
            timeout=10
        )
        if r_member.status_code == 200:
            member = r_member.json()
            user_roles = [str(rid) for rid in member.get("roles", [])]
        else:
            print(f"❌ Failed to fetch member roles: {r_member.status_code} {r_member.text}")
    except requests.RequestException as e:
        print(f"⚠️ Exception fetching member roles: {e}")

    # Fetch guild roles
    try:
        r_roles = requests.get(f"{API_BASE}/guilds/{guild_id}/roles", headers=headers, timeout=10)
        if r_roles.status_code == 200:
            guild_roles = r_roles.json()
            role_name_to_id = {r["name"].strip().lower(): str(r["id"]) for r in guild_roles}
        else:
            print(f"❌ Failed to fetch guild roles: {r_roles.status_code} {r_roles.text}")
    except requests.RequestException as e:
        print(f"⚠️ Exception fetching guild roles: {e}")

    return user_roles, role_name_to_id


def get_discord_channels(guild_id: str):
    url = f"{API_BASE}/guilds/{guild_id}/channels"
    headers = {"Authorization": f"Bot {DISCORD_BOT_TOKEN}"}
    r = requests.get(url, headers=headers, timeout=15)
    if r.status_code == 200:
        # filter to text channels only (type=0)
        return [c for c in r.json() if c["type"] == 0]
    return []


def get_discord_roles(guild_id: str):
    url = f"{API_BASE}/guilds/{guild_id}/roles"
    headers = {"Authorization": f"Bot {DISCORD_BOT_TOKEN}"}

    try:
        r = requests.get(url, headers=headers, timeout=15)
        r.raise_for_status()  # Raise for HTTP errors (optional)
        return r.json()
    except requests.exceptions.ReadTimeout:
        # No internet or timeout occurred
        flash("⚠️ Could not fetch Discord roles: request timed out. Check your internet connection.", "warning")
        return []  # return empty roles
    except requests.exceptions.RequestException as e:
        # Catch all other requests errors
        flash(f"⚠️ Could not fetch Discord roles: {e}", "warning")
        return []


@bp_discord_bot.route("/bot/callback")
def discord_bot_callback():
    """Callback after bot invite"""
    if "error" in request.args:
        flash(f"Discord bot invite failed: {request.args.get('error_description')}", "error")
        return redirect("/")

    code = request.args.get("code")
    state = request.args.get("state")
    saved_state = session.pop("discord_bot_state", None)

    if not state or not saved_state or state != saved_state:
        flash("Invalid OAuth state.", "error")
        return redirect("/")

    # Exchange code → access token
    data = {
        "client_id": BOT_DISCORD_CLIENT_ID,
        "client_secret": BOT_DISCORD_CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": BOT_DISCORD_REDIRECT_URI,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    r = requests.post(TOKEN_URL, data=data, headers=headers, timeout=20)
    r.raise_for_status()
    token_json = r.json()

    access_token = token_json.get("access_token")
    if not access_token:
        flash("No access token returned", "error")
        return redirect("/")

    guild_id = request.args.get("guild_id")
    if not guild_id:
        flash("Guild ID not returned", "error")
        return redirect("/")

    guild_res = requests.get(
        f"{API_BASE}/guilds/{guild_id}",
        headers={"Authorization": f"Bot {DISCORD_BOT_TOKEN}"},
        timeout=15
    )
    guild_res.raise_for_status()
    guild_json = guild_res.json()

    community_id = session.pop("community_id", None)
    if not community_id:
        flash("Lost community context", "error")
        return redirect("/")

    community = Community.query.get(community_id)
    if not community:
        flash("Community not found", "error")
        return redirect("/")

    # ✅ Check if guild already exists in DB
    existing_guild = DiscordGuild.query.filter_by(guild_id=guild_json["id"]).first()
    if existing_guild:
        # Guard against hijacking a guild that's already linked to a different community
        if existing_guild.community_id and str(existing_guild.community_id) != str(community_id):
            flash(
                "⚠️ This Discord server is already linked to another community. "
                "Remove the bot from that community first if you want to relink it.",
                "error"
            )
            return redirect(url_for("setup1", community_slug=community.slug))

        existing_guild.community_id = community_id
        existing_guild.guild_name = guild_json["name"]
        existing_guild.icon_url = guild_json.get("icon")
        existing_guild.owner_id = guild_json.get("owner_id")
        existing_guild.permissions = PERMISSIONS
        existing_guild.bot_joined = True
        existing_guild.removed_at = None
        db.session.commit()
        flash(f"✅ Bot reconnected to {guild_json['name']} (Community {community_id})", "success")
    else:
        new_guild = DiscordGuild(
            community_id=community_id,
            guild_id=guild_json["id"],
            guild_name=guild_json["name"],
            icon_url=guild_json.get("icon"),
            owner_id=guild_json.get("owner_id"),
            permissions=PERMISSIONS,
            bot_joined=True,
            removed_at=None
        )
        db.session.add(new_guild)
        db.session.commit()
        flash(f"✅ Bot added to {guild_json['name']} (Community {community_id})", "success")

    # 🔹 Respect saved next_url if available (already validated as relative in /invite_bot)
    next_url = session.pop("discord_next_url", None)
    if next_url:
        return redirect(next_url)
    return redirect(url_for("setup1", community_slug=community.slug))

# ---------------- DISCORD BOT ---------------- #
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)
bot_members_cache = {}


@bot.event
async def on_ready():
    global bot_members_cache
    bot.loop.create_task(process_role_queue())
    bot.loop.create_task(update_guild_member_counts())
    print(f"🤖 Logged in as {bot.user} (ID: {bot.user.id})")
    print("------")

    try:
        synced = await bot.tree.sync()
        print(f"✅ Synced {len(synced)} slash command(s).")
    except Exception as e:
        print(f"❌ Failed syncing commands: {e}")

    # Reset + populate
    bot_members_cache.clear()
    for guild in bot.guilds:
        try:
            await guild.chunk()
            bot_members_cache[guild.id] = {m.id for m in guild.members}
            print(f"📥 Cached {len(bot_members_cache[guild.id])} members for guild {guild.name} ({guild.id})")
        except Exception as e:
            print(f"⚠️ Failed caching members for {guild.name} ({guild.id}): {e}")


@bot.event
async def on_member_join(member):
    bot_members_cache.setdefault(member.guild.id, set()).add(member.id)
    if member.guild.system_channel:
        await member.guild.system_channel.send(f"👋 Welcome {member.mention}!")

@bot.event
async def on_member_remove(member):
    bot_members_cache.get(member.guild.id, set()).discard(member.id)
    if member.guild.system_channel:
        await member.guild.system_channel.send(f"😥 {member.name} just left us.")


def get_or_create_invite(guild_id: str) -> str | None:
    """
    Fetches the latest active invite for the guild, or creates one if none exist.
    """
    headers = {"Authorization": f"Bot {DISCORD_BOT_TOKEN}"}

    # 1. Try fetch existing invites
    r = requests.get(f"{API_BASE}/guilds/{guild_id}/invites", headers=headers, timeout=10)
    if r.status_code == 200:
        invites = r.json()
        if invites:
            # return the most recent one
            return f"https://discord.gg/{invites[0]['code']}"

    # 2. No invite? create a new one in the system channel
    r2 = requests.get(f"{API_BASE}/guilds/{guild_id}", headers=headers, timeout=10)
    if r2.status_code != 200:
        print(f"❌ Failed to fetch guild info: {r2.text}")
        return None
    guild_info = r2.json()
    system_channel_id = guild_info.get("system_channel_id")
    if not system_channel_id:
        print("⚠️ No system_channel_id set for this guild")
        return None

    payload = {"max_age": 0, "max_uses": 0, "temporary": False}
    r3 = requests.post(
        f"{API_BASE}/channels/{system_channel_id}/invites",
        headers={**headers, "Content-Type": "application/json"},
        json=payload,
        timeout=10,
    )
    if r3.status_code == 200:
        invite = r3.json()
        return f"https://discord.gg/{invite['code']}"
    else:
        print(f"❌ Failed to create invite: {r3.text}")
        return None


@bp_discord_bot.route("/discord/invite/<int:community_id>")
def discord_invite(community_id):
    guild_record = DiscordGuild.query.filter_by(
        community_id=community_id, removed_at=None, bot_joined=True
    ).first()

    if not guild_record:
        flash("❌ No Discord guild linked for this community", "error")
        return redirect("/")

    invite_url = get_or_create_invite(guild_record.guild_id)
    if not invite_url:
        flash("⚠️ Could not generate Discord invite", "warning")
        return redirect("/")

    return redirect(invite_url)


@bot.event
async def on_guild_remove(guild: discord.Guild):
    """Triggered when bot is kicked/removed from a server"""
    print(f"❌ Bot was removed from {guild.name} ({guild.id})")
    global flask_app
    if not flask_app:
        print("⚠️ No Flask app set, cannot update DB")
        return
    with flask_app.app_context():
        guild_record = DiscordGuild.query.filter_by(guild_id=str(guild.id)).first()
        if guild_record:
            guild_record.bot_joined = False
            guild_record.removed_at = datetime.utcnow()
            db.session.commit()
            print(f"📉 DB updated: {guild_record.guild_name} -> bot_joined=False, removed_at={guild_record.removed_at}")
        else:
            print("⚠️ Guild not found in DB, nothing updated.")


# ---------------- SLASH COMMANDS ---------------- #
@bot.tree.command(name="hello", description="Say hello to the bot")
async def hello(interaction: discord.Interaction):
    await interaction.response.send_message(f"Hello {interaction.user.mention} 👋")

@bot.tree.command(name="start", description="Start something exciting")
async def start(interaction: discord.Interaction):
    await interaction.response.send_message("🚀 Let's get started!")

@bot.tree.command(name="announce", description="Send an announcement")
async def announce(interaction: discord.Interaction, message: str):
    if interaction.guild and interaction.guild.text_channels:
        channel = interaction.guild.text_channels[0]
        await channel.send(f"📢 {message}")
        await interaction.response.send_message("✅ Announcement sent!", ephemeral=True)
    else:
        await interaction.response.send_message("⚠️ No text channel available.", ephemeral=True)

# ---------------- PREFIX COMMAND ---------------- #
@bot.command()
async def ping(ctx):
    await ctx.send("🏓 Pong!")

# ---------------- BACKGROUND THREAD ---------------- #
bot_thread = None

def run_discord_bot():
    print("🚀 Starting Discord bot...")
    bot.run(DISCORD_BOT_TOKEN)

def start_bot_in_background(app):
    global bot_thread, flask_app
    flask_app = app
    if bot_thread and bot_thread.is_alive():
        print("⚠️ Bot is already running, skipping start.")
        return
    bot_thread = threading.Thread(target=run_discord_bot, daemon=True)
    bot_thread.start()