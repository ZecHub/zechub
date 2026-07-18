from backend.communities.CommunityUserRole_models import CommunityUserRole
from backend.models.session_models import UserSession
from backend.quests.subquest_completion import SubquestCompletion
from backend.quests.sprint_models import Sprint
from backend.models.models import Users
from flask import session, request
import pycountry
from urllib.parse import urljoin
from datetime import datetime, timedelta
from urllib.parse import urlparse
import os, uuid, requests, geocoder, geoip2 
from sqlalchemy import func
from backend.utils.instance import db
from flask_wtf import CSRFProtect

csrf = CSRFProtect()
def has_role(user_id, community_id, required_role):
    role_order = {'member': 0, 'reviewer': 1, 'editor': 2, 'admin': 3}
    role_entry = CommunityUserRole.query.filter_by(user_id=user_id, community_id=community_id).first()
    if role_entry:
        user_role = role_entry.role.lower()
        return role_order.get(user_role, 0) >= role_order.get(required_role.lower(), 0)
    return False


def check_banned(user_id, community_id):
    role_entry = CommunityUserRole.query.filter_by(user_id=user_id, community_id=community_id).first()
    return bool(role_entry.banned) if role_entry else False



def is_safe_url(target):
    ref = urlparse(request.host_url)
    test = urlparse(urljoin(request.host_url, target))
    return test.scheme in ("http", "https") and ref.netloc == test.netloc




def get_latest_valid_sprint(community_id):
    now = datetime.utcnow()
    print("REACHED AND EVEN PASSED")
    sprint = (
        Sprint.query
        .filter(
            Sprint.community_id == community_id,
            Sprint.end_date >= now  
        )
        .order_by(Sprint.start_date.asc())
        .first()
    )

    return sprint

# def get_timezone_from_request():
#     """
#     Attempt to detect the user's timezone from their IP address.
#     Falls back to the server's local timezone if detection fails.
#     """
#     try:
#         ip = request.headers.get('X-Forwarded-For', request.remote_addr)
#         g = geocoder.ip(ip)
#         if g.ok and g.geojson and g.geojson['features'][0]['properties'].get('timezone'):
#             tz_name = g.geojson['features'][0]['properties']['timezone']
#             return pytz.timezone(tz_name)
#     except Exception:
#         pass

#     # Fallback to server local timezone
#     return tzlocal.get_localzone()




basedir = os.path.abspath(os.path.dirname(__file__))
GEOIP_PATH = os.path.join(basedir, "instance", "GeoLite2-City.mmdb")

_geo_reader = None

def get_geo_reader():
    global _geo_reader

    if _geo_reader is not None:
        return _geo_reader

    if not os.path.exists(GEOIP_PATH):
        print("❌ GeoIP DB NOT FOUND:", GEOIP_PATH)
        _geo_reader = False
        return False

    try:
        _geo_reader = geoip2.database.Reader(GEOIP_PATH)
        print("✅ GeoIP DB loaded")
        return _geo_reader
    except Exception as e:
        print("❌ GeoIP load failed:", e)
        _geo_reader = False
        return False

def get_subquest_attempt_stats(subquest_id: int):
    """
    Returns total attempts, total successful attempts, and total failed attempts
    for a particular subquest.
    """
    result = db.session.query(
        func.coalesce(func.sum(SubquestCompletion.attempts), 0).label("total_attempts"),
        func.coalesce(func.sum(SubquestCompletion.success_count), 0).label("total_success")
    ).filter(SubquestCompletion.subquest_id == subquest_id).first()

    total_attempts = result.total_attempts or 0
    total_success = result.total_success or 0
    total_failed = total_attempts - total_success

    return {
        "subquest_id": subquest_id,
        "total_attempts": total_attempts,
        "total_success": total_success,
        "total_failed": total_failed if total_failed >= 0 else 0
    }


def country_code_to_name(code):
    try:
        return pycountry.countries.get(alpha_2=code).name
    except:
        return code



def get_location(ip):
    if not ip:
        return "Unknown"

    if ip.startswith(("127.", "10.", "192.168.")):
        return "Localhost"

    reader = get_geo_reader()
    if not reader:
        return "Unknown"

    try:
        r = reader.city(ip)

        country = r.country.name
        city = r.city.name

        # ✅ ACCEPT COUNTRY EVEN IF CITY IS MISSING
        if city and country:
            return f"{city}, {country}"

        if country:
            return country  # ← THIS FIXES NIGERIA

        return "Unknown"

    except Exception as e:
        print(f"❌ GeoIP lookup failed for {ip}:", e)
        return "Unknown"

def lookup_ipinfo(ip):
    try:
        r = requests.get(
            f"https://ipinfo.io/{ip}/json",
            headers={
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json"
            },
            timeout=5
        )


        if r.status_code != 200:
            return None

        data = r.json()

        city = data.get("city")
        region = data.get("region")
        country_code = data.get("country")
        country = country_code_to_name(country_code)


        if city and country:
            return f"{city}, {country}"
        if country:
            return country

    except Exception as e:
        print("❌ ipinfo exception:", e)

    return None




def resolve_location(ip):
    # 1️⃣ REAL IP LOOKUP (BEST)
    ipinfo_location = lookup_ipinfo(ip)
    if ipinfo_location:
        return ipinfo_location

    # 2️⃣ GeoLite fallback
    geo_location = get_location(ip)
    if geo_location and geo_location != "Unknown":
        return geo_location

    # 3️⃣ Session fallback
    country = session.get("user_country")
    if country:
        return country

    return "Unknown"



def normalize_version(browser, v):
    if not v:
        return ""

    parts = v.split(".")

    # ── SAFARI
    if browser == "Safari":
        # 18.0.0 → 18
        if len(parts) >= 3 and parts[1] == "0" and parts[2] == "0":
            return parts[0]
        # keep 18.0.1, 17.6
        return v

    # ── FIREFOX / EDGE → MAJOR ONLY
    if browser in ("Firefox", "Firefox (iOS)", "Edge", "Edge (iOS)"):
        return parts[0]

    # ── CHROME / OPERA → MAJOR + FIRST TWO DECIMALS
    if browser in ("Chrome", "Chrome (iOS)", "Opera", "Opera Mini"):
        if len(parts) >= 2:
            return f"{parts[0]}.{parts[1][:2]}"
        return parts[0]

    # fallback
    return parts[0]



def parse_device_from_ua():
    ua = (request.headers.get("User-Agent") or "").lower()
    print("\n🔎 UA PARSER DEBUG")
    print(ua)
    # ── Device type
    if any(x in ua for x in ("iphone", "ipad", "ipod")):
        device_type = "iPhone"
    elif "android" in ua:
        device_type = "Android"
    else:
        device_type = "Desktop"

    browser = "Browser"
    version = ""

    # ─────────────────────────────────────
    # MINI / PROXY / SPECIAL (MUST BE FIRST)
    # ─────────────────────────────────────

    # Opera Mini
    if "opera mini" in ua or "opmini" in ua:
        browser = "Opera Mini"
        version = ua.split("opera mini/")[-1].split()[0] if "opera mini/" in ua else ""

    # UC Browser
    elif "ucbrowser/" in ua or "ucbrowser" in ua:
        browser = "UC Browser"
        version = ua.split("ucbrowser/")[-1].split()[0] if "ucbrowser/" in ua else ""

    # Samsung Internet
    elif "samsungbrowser/" in ua:
        browser = "Samsung Internet"
        version = ua.split("samsungbrowser/")[-1].split()[0]

    # MIUI Browser
    elif "miuibrowser/" in ua:
        browser = "MIUI Browser"
        version = ua.split("miuibrowser/")[-1].split()[0]

    # Yandex
    elif "yabrowser/" in ua:
        browser = "Yandex Browser"
        version = ua.split("yabrowser/")[-1].split()[0]

    # DuckDuckGo
    elif "duckduckgo/" in ua:
        browser = "DuckDuckGo"
        version = ua.split("duckduckgo/")[-1].split()[0]

    # Brave
    elif "brave/" in ua:
        browser = "Brave"
        version = ua.split("brave/")[-1].split()[0]

    # Vivaldi
    elif "vivaldi/" in ua:
        browser = "Vivaldi"
        version = ua.split("vivaldi/")[-1].split()[0]

    # ─────────────────────────────────────
    # iOS BROWSERS
    # ─────────────────────────────────────
    elif "opt/" in ua:
        browser = "Opera (iOS)"
        version = ua.split("opt/")[-1].split()[0]
        
    elif "fxios/" in ua:
        browser = "Firefox (iOS)"
        version = ua.split("fxios/")[-1].split()[0]

    elif "crios/" in ua:
        browser = "Chrome (iOS)"
        version = ua.split("crios/")[-1].split()[0]

    elif "edgios/" in ua:
        browser = "Edge (iOS)"
        version = ua.split("edgios/")[-1].split()[0]

    # ─────────────────────────────────────
    # DESKTOP / ANDROID
    # ─────────────────────────────────────

    elif "firefox/" in ua:
        browser = "Firefox"
        version = ua.split("firefox/")[-1].split()[0]

    elif "edga/" in ua:
        browser = "Edge"
        version = ua.split("edga/")[-1].split()[0]

    elif "edg/" in ua:
        browser = "Edge"
        version = ua.split("edg/")[-1].split()[0]

    elif "opr/" in ua:
        browser = "Opera"
        version = ua.split("opr/")[-1].split()[0]

    elif "chrome/" in ua and "safari/" in ua:
        browser = "Chrome"
        version = ua.split("chrome/")[-1].split()[0]

    elif "safari/" in ua and "version/" in ua:
        browser = "Safari"
        version = ua.split("version/")[-1].split()[0]

    # ─────────────────────────────────────
    # IN-APP / WEBVIEW (LAST)
    # ─────────────────────────────────────

    elif "fbav/" in ua or "fban/" in ua:
        browser = "Facebook WebView"

    elif "instagram" in ua:
        browser = "Instagram WebView"

    elif "telegram" in ua:
        browser = "Telegram WebView"

    elif "wv" in ua:
        browser = "Android WebView"

    # clean version → MAJOR ONLY
    version = normalize_version(browser, version)

    return f"{browser} {version}".strip(), device_type





def get_real_ip():
    return (
        request.headers.get("CF-Connecting-IP")
        or request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
        or request.remote_addr
    )


def create_user_session(user):
    ip = get_real_ip()
    ua_string = request.headers.get("User-Agent", "")[:255]
    browser_name, device_type = parse_device_from_ua()
    device = f"{device_type} · {browser_name}"

    existing = UserSession.query.filter_by(
        user_id=user.id,
        ip_address=ip,
        device=device
    ).order_by(UserSession.login_time.desc()).first()

    if existing:
        existing.is_online = True
        existing.last_seen = datetime.utcnow()
        session["sid"] = existing.session_uuid
        db.session.commit()
        return

    sid = str(uuid.uuid4())
    session["sid"] = sid

    location = resolve_location(ip)

    s = UserSession(
        user_id=user.id,
        session_uuid=sid,
        ip_address=ip,
        user_agent=ua_string,
        device=device,
        location=location,
        login_time=datetime.utcnow(),
        last_seen=datetime.utcnow(),
        is_online=True
    )

    db.session.add(s)
    db.session.commit()

