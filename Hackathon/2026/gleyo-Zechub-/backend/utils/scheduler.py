# ------RESET DAILY CLAIMS-------

import logging
from datetime import datetime, timedelta, timezone
from apscheduler.schedulers.blocking import BlockingScheduler


from backend.utils.instance import db

from backend.communities.CommunitySecurity import CommunitySecurity
from backend.communities.community_invite_log import CommunityInviteLog
from backend.communities.xplevel import UserXP

from backend.quests.task_models import Task
from backend.communities.CommunityInviteTask import CommunityInviteTask
from backend.quests.sub_quest_models import Subquest
from backend.quests.subquest_completion import SubquestCompletion
from backend.quests.quest_models import Quest
from backend.quests.reset_tracker import ResetTracker
def get_app():
    from Gleyologin.app import app
    return app

logging.basicConfig(level=logging.INFO)
def recalc_all_invites():
    """Recalculate invite status for all users in all communities."""
    logging.info("Running recalc_all_invites...")
    logs = CommunityInviteLog.query.all()
    user_community_pairs = {(log.invited_user_id, log.community_id) for log in logs}
    for user_id, community_id in user_community_pairs:
        check_and_update_invite_status(user_id, community_id)


def check_and_update_invite_status(user_id, community_id):
    """Check user's XP + per-task subquest requirements and update invite logs."""
    security = CommunitySecurity.query.filter_by(community_id=community_id).first()
    if not security:
        logging.info(f"No security for community {community_id}, skipping.")
        return

    xp_needed = security.xp_for_valid_invite or 0

    # --- Total XP in this community ---
    total_xp = sum(
        xp.amount
        for xp in UserXP.query.filter_by(user_id=user_id).all()
        if xp.completion and xp.completion.subquest.quest.community_id == community_id
    )
    logging.info(f"User {user_id} total XP in community {community_id}: {total_xp} (needed: {xp_needed})")

    # All invite logs for this invited user in this community
    logs = CommunityInviteLog.query.filter_by(
        invited_user_id=user_id,
        community_id=community_id
    ).all()

    # All invite tasks for this community
    invite_tasks = Task.query.join(Subquest).join(Quest).filter(
        Quest.community_id == community_id,
        Task.type == "invite"
    ).all()

    logging.info(f"[DEBUG] Community {community_id} invite tasks: {[t.id for t in invite_tasks]}")
    for t in invite_tasks:
        logging.info(f"Task {t.id} config: {t.config}")

    for log in logs:
        old_status = log.status
        if old_status == "consumed":
            logging.info(f"Skipping consumed invite {log.invitation_code}")
            continue

        # --- XP requirement check ---
        meets_xp = (xp_needed == 0 or total_xp >= xp_needed)
        all_tasks_met = True

        # Clear existing CommunityInviteTask entries for this log
        CommunityInviteTask.query.filter_by(community_invite_log_id=log.id).delete()

        for task in invite_tasks:
            task_status = "pending"
            subquest_uuid = task.config.get("subquest_uuid") if task.config else None

            if subquest_uuid:
                subquest = Subquest.query.filter_by(uuid=subquest_uuid).first()
                if subquest:
                    completion = (
                        SubquestCompletion.query
                        .filter_by(user_id=user_id, subquest_id=subquest.id, status="success")
                        .order_by(SubquestCompletion.completed_at.desc())
                        .first()
                    )
                    if completion:
                        task_status = "active"
                        logging.info(f"User {user_id} completed subquest {subquest.name} (task {task.id})")
                    else:
                        all_tasks_met = False
                        logging.info(f"User {user_id} has NOT completed subquest {subquest.name} (task {task.id})")
                else:
                    logging.warning(f"Task {task.id} refers to missing subquest {subquest_uuid}")
                    all_tasks_met = False
            else:
                # This task is only XP-based
                if meets_xp:
                    task_status = "active"
                    logging.info(f"User {user_id} meets XP requirement for task {task.id}")
                else:
                    all_tasks_met = False
                    logging.info(f"User {user_id} does NOT meet XP requirement for task {task.id}")

            # Create a CommunityInviteTask entry
            db.session.add(CommunityInviteTask(
                community_invite_log_id=log.id,
                task_id=task.id,
                status=task_status,
                completed_at=datetime.now(timezone.utc) if task_status == "active" else None
            ))

        # --- Decide overall invite status ---
        if old_status != "consumed":
            if meets_xp and all_tasks_met:
                log.status = "active"
                log.consumed_at = log.consumed_at or datetime.now(timezone.utc)
            else:
                log.status = "pending"
                log.consumed_at = None

        db.session.add(log)
        if old_status != log.status:
            logging.info(
                f"Invite log {log.invitation_code} for user {user_id} "
                f"in community {community_id}: {old_status} -> {log.status}"
            )

    db.session.commit()
    logging.info(f"Invite logs updated for user {user_id} in community {community_id}")






def expire_recurring_subquests(force=False, now=None):
    now = now or datetime.utcnow()
    logging.info(f"🕒 expire_recurring_subquests running at {now.isoformat()} (force={force})")

    if not force and not (now.hour == 0 and now.minute == 0):
        logging.info("⏭ Skipping expire run (not midnight UTC)")
        return

    expired_count = 0

    # Daily subquests
    daily_subquests = Subquest.query.filter_by(recurrence="Daily").all()
    for sub in daily_subquests:
        completions = SubquestCompletion.query.filter(
            SubquestCompletion.subquest_id == sub.id,
            SubquestCompletion.status.in_(["pending", "success"])
        ).all()
        for c in completions:
            c.status = "expired"
            db.session.add(c)
            expired_count += 1

    # Weekly (only on Mondays)
    if now.weekday() == 0:
        weekly_subquests = Subquest.query.filter_by(recurrence="Weekly").all()
        for sub in weekly_subquests:
            completions = SubquestCompletion.query.filter(
                SubquestCompletion.subquest_id == sub.id,
                SubquestCompletion.status.in_(["pending", "success"])
            ).all()
            for c in completions:
                c.status = "expired"
                db.session.add(c)
                expired_count += 1

    # Monthly (only on the 1st)
    if now.day == 1:
        monthly_subquests = Subquest.query.filter_by(recurrence="Monthly").all()
        for sub in monthly_subquests:
            completions = SubquestCompletion.query.filter(
                SubquestCompletion.subquest_id == sub.id,
                SubquestCompletion.status.in_(["pending", "success"])
            ).all()
            for c in completions:
                c.status = "expired"
                db.session.add(c)
                expired_count += 1

    # ✅ Commit expirations
    db.session.commit()

    # ✅ Update ResetTracker here
    tracker = ResetTracker.query.first()
    if not tracker:
        tracker = ResetTracker(last_reset_at=None)
        db.session.add(tracker)

    tracker.last_reset_at = datetime.combine(now.date(), datetime.min.time())
    db.session.commit()

    logging.info(f"✅ Expired {expired_count} completions at {now.date()} and updated ResetTracker")



def catch_up_resets():
    """
    On startup, check ResetTracker to see if any days were missed.
    If so, simulate resets for each missed midnight.
    """
    now = datetime.utcnow()
    tracker = ResetTracker.query.first()

    if not tracker:
        tracker = ResetTracker(last_reset_at=None)
        db.session.add(tracker)
        db.session.commit()

    if not tracker.last_reset_at:
        logging.info("⚡ No previous reset recorded. Running initial reset now...")
        expire_recurring_subquests(force=True, now=now)
        tracker.last_reset_at = now
        db.session.commit()
        return

    last = tracker.last_reset_at
    logging.info(f"📅 Last reset was {last}, checking for missed days...")

    day_cursor = last.date()
    last_midnight = None  # keep track of the last simulated midnight

    while day_cursor < now.date():
        day_cursor = day_cursor + timedelta(days=1)
        fake_midnight = datetime.combine(day_cursor, datetime.min.time())
        logging.info(f"🔄 Catch-up reset for {fake_midnight.date()}")
        expire_recurring_subquests(force=True, now=fake_midnight)
        last_midnight = fake_midnight

    if last_midnight:
        tracker.last_reset_at = last_midnight
        db.session.commit()
        logging.info(f"✅ catch_up_resets finished (last_reset_at={tracker.last_reset_at})")
    else:
        logging.info("✅ catch_up_resets finished (no missed days, tracker unchanged)")


    db.session.commit()
    logging.info(f"✅ catch_up_resets finished (last_reset_at={tracker.last_reset_at})")





if __name__ == "__main__":
    app = get_app()

    with app.app_context():
        catch_up_resets()


    scheduler = BlockingScheduler(timezone="UTC")

    scheduler.add_job(
        lambda: get_app().app_context().push() or expire_recurring_subquests(),
        trigger="cron",
        hour=0,
        minute=0,
        id="expire_subquests",
        coalesce=True,
        max_instances=1
    )

    scheduler.add_job(
        lambda: get_app().app_context().push() or recalc_all_invites(),
        trigger="interval",
        minutes=1,
        id="recalc_invites",
        coalesce=True,
        max_instances=1
    )

    logging.info("🚀 Scheduler running (resets + invites)")
    scheduler.start()