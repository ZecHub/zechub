import requests
import os, json, time
from backend.communities.communitynotification import CommunityNotificationSettings, PushSubscription, CategoryNotificationSettings, ChannelNotificationSettings
from backend.utils.image_utils import compress_image
from pywebpush import webpush, WebPushException
from backend.utils.instance import db
from flask import current_app
from concurrent.futures import ThreadPoolExecutor

# -------START------
# Generated with:
# npx web-push generate-vapid-keys
# Public key goes in the frontend service worker setup,
# private key stays server-side and must be kept secret.
VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE_KEY")
# -------END-------
SUPABASE_URL = os.getenv("SUPABASE_URL")
EMAIL_USER = os.getenv("SMTP_USERNAME")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


# Separate pools so a slow push-notification batch (which loops through
# every subscriber synchronously inside one worker) can't starve or queue
# behind avatar/file uploads, and vice versa.
upload_executor = ThreadPoolExecutor(max_workers=5)
push_executor = ThreadPoolExecutor(max_workers=5)


def _upload_single(file_bytes, storage_name, content_type, max_retries=5):
    print("🚀 Upload started:", storage_name)

    url = f"{SUPABASE_URL}/storage/v1/object/uploads/{storage_name}"

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": content_type
    }

    last_error = None

    for attempt in range(1, max_retries + 1):
        try:
            res = requests.post(
                url,
                headers=headers,
                data=file_bytes,
                timeout=30
            )

            if res.status_code >= 300:
                print(f"❌ Upload failed (attempt {attempt}):", res.text)
                last_error = Exception(res.text)
                # Backoff before retrying — a bare retry with no delay just
                # re-hits the same transient network/server issue immediately.
                time.sleep(min(2 ** attempt, 15))
                continue

            print("✅ Upload finished:", storage_name)
            return f"{SUPABASE_URL}/storage/v1/object/public/uploads/{storage_name}"

        except requests.exceptions.Timeout as e:
            print(f"⏱️ Upload timed out (attempt {attempt}):", e)
            last_error = e
            time.sleep(min(2 ** attempt, 15))
            continue

        except requests.exceptions.ConnectionError as e:
            # Covers ConnectionResetError ("connection aborted") — usually a
            # transient network blip or the remote host closing the socket
            # mid-request. A short backoff gives it time to clear before
            # hammering the same request again.
            print(f"🔌 Connection error (attempt {attempt}):", e)
            last_error = e
            time.sleep(min(2 ** attempt, 15))
            continue

        except Exception as e:
            print(f"💥 Upload error (attempt {attempt}):", e)
            last_error = e
            time.sleep(min(2 ** attempt, 15))
            continue

    raise last_error


def _prepare_upload(file_bytes, storage_name, content_type, max_dimension=800):
    """
    If this is an image upload, resize/compress it before sending — cuts
    upload time significantly (large originals can shrink 10x+ with no
    visible quality loss) with zero changes needed in the calling route.
    Non-image uploads (or anything that fails to parse as an image) pass
    through unchanged.

    max_dimension defaults to 800 here as a general-purpose size suitable
    for most in-app images (avatars, thumbnails, banners). Callers with
    stricter size needs (e.g. a tiny avatar) can still pre-resize before
    calling upload_async if they want a smaller default.
    """
    if not content_type or not content_type.startswith("image/"):
        return file_bytes, storage_name, content_type

    compressed_bytes, new_content_type = compress_image(file_bytes, max_dimension=max_dimension, quality=85)

    if new_content_type is None:
        # compression failed — use original bytes/name/type unchanged
        return file_bytes, storage_name, content_type

    # compress_image always returns JPEG on success — swap the extension
    # on storage_name to match, so the stored file and its content_type
    # stay consistent (avoids a .png filename holding jpeg bytes).
    base_name = storage_name.rsplit(".", 1)[0]
    new_storage_name = f"{base_name}.jpg"

    return compressed_bytes, new_storage_name, new_content_type


def upload_async(file_bytes, storage_name, content_type):
    prepared_bytes, prepared_name, prepared_type = _prepare_upload(file_bytes, storage_name, content_type)
    return upload_executor.submit(_upload_single, prepared_bytes, prepared_name, prepared_type)


def send_push_notification_async(subs, title, body, data):
    app = current_app._get_current_object()

    def task():
        with app.app_context():
            _send_push_notification(subs, title, body, data)

    return push_executor.submit(task)


def _send_discord_message(channel_id, content):
    from flask import current_app
    import requests, os

    token = current_app.config.get("DISCORD_BOT_TOKEN") or os.getenv("DISCORD_BOT_TOKEN")
    if not token:
        print("❌ No Discord bot token configured")
        return False

    url = f"https://discord.com/api/v10/channels/{channel_id}/messages"
    headers = {"Authorization": f"Bot {token}"}
    data = {"content": content}

    try:
        resp = requests.post(url, headers=headers, json=data, timeout=10)

        if resp.status_code not in (200, 201):
            print(f"❌ Discord message failed: {resp.text}")
            return False

        print("✅ Discord message sent!")
        return True

    except Exception as e:
        print("❌ Discord error:", e)
        return False



def _send_push_notification(subs, title, body, data):
    app = current_app._get_current_object()

    print("🚀 PUSH TASK STARTED")
    print("🔔 Total subscriptions:", len(subs))

    with app.app_context():
        for i, sub in enumerate(subs, start=1):

            payload = {
                "title": str(title),
                "body": str(body),
                "url": str(data.get("url", "")),
                "type": str(data.get("type", "")),
                "community_slug": str(data.get("community_slug", "")),
                "channel_uuid": str(data.get("channel_uuid", "")),
            }


            try:
                webpush(
                    subscription_info={
                        "endpoint": sub.endpoint,
                        "keys": {
                            "p256dh": sub.p256dh,
                            "auth": sub.auth
                        }
                    },
                    data=json.dumps(payload),
                    vapid_private_key=VAPID_PRIVATE_KEY,
                    vapid_claims={"sub": EMAIL_USER},
                    ttl=86400
                )

                print("✅ Push sent successfully")

            except WebPushException as e:

                if hasattr(e, "response") and e.response is not None:
                    try:
                        status = e.response.status_code
                        print("❌ Status code:", status)
                        print("❌ Response body:", e.response.text)

                        if status in (404, 410):
                            try:
                                sub_in_session = db.session.merge(sub)
                                db.session.delete(sub_in_session)
                                db.session.commit()
                                print("✅ Dead sub removed")
                            except Exception as db_err:
                                print("❌ Failed to delete sub:", db_err)
                                db.session.rollback()

                    except Exception as inner_err:
                        print("⚠️ Could not read error response:", inner_err)
                else:
                    # No response at all — network/timeout issue, don't delete
                    print("⚠️ No response object — likely a network error, skipping delete")

            except Exception as e:
                print("💥 Unexpected error:", repr(e))

        print("\n🏁 PUSH TASK FINISHED\n")




def send_discord_message_async(channel_id, content):

    app = current_app._get_current_object()

    def task():
        with app.app_context():
            _send_discord_message(channel_id, content)

    return push_executor.submit(task)