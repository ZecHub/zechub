from flask import jsonify
from flask_login import login_required, current_user
from sqlalchemy import func, case, distinct
from datetime import datetime, timedelta
from collections import defaultdict

from backend.utils.instance import db
from backend.communities.community_models import Community
from backend.quests.quest_models import Quest
from backend.quests.sub_quest_models import Subquest
from backend.quests.task_models import Task
from backend.quests.task_histr import TaskAttemptHistory
from backend.quests.subquest_completion import SubquestCompletion
from backend.communities.CommunityUserRole_models import CommunityUserRole
from backend.models.session_models import UserSession
from backend.quests.subquestreward import SubquestReward
from backend.utils.utils import get_subquest_attempt_stats


# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────

def _subquest_ids_for_community(community_id):
    rows = (
        db.session.query(Subquest.id)
        .join(Quest, Subquest.quest_id == Quest.id)
        .filter(
            Quest.community_id == community_id,
            Subquest.is_draft == False,
            Subquest.is_archive == False,
        )
        .all()
    )
    return [r.id for r in rows]


def _member_ids(community_id):
    rows = (
        db.session.query(CommunityUserRole.user_id)
        .filter_by(community_id=community_id, banned=False)
        .all()
    )
    return [r.user_id for r in rows]


# ─────────────────────────────────────────────
# INSIGHT GENERATORS
# ─────────────────────────────────────────────

def insight_low_completion_quests(community_id):
    """Flag live quests where success rate < 40% with enough attempts."""
    sq_ids = _subquest_ids_for_community(community_id)
    struggling = []

    for sq_id in sq_ids:
        sq = db.session.get(Subquest, sq_id)
        stats = get_subquest_attempt_stats(sq_id)
        attempts = stats["total_attempts"]
        success  = stats["total_success"]

        if attempts < 5:
            continue

        rate = (success / attempts) * 100

        if rate < 40:
            struggling.append((sq.name, round(rate, 1), attempts))

    if not struggling:
        return None

    # worst first
    struggling.sort(key=lambda x: x[1])
    worst_name, worst_rate, worst_attempts = struggling[0]

    text = (
        f"'{worst_name}' has a {worst_rate}% completion rate across "
        f"{worst_attempts} attempts."
    )
    if len(struggling) > 1:
        text += f" {len(struggling) - 1} other quest(s) are also under-performing."
    text += " Consider simplifying steps or increasing rewards."

    return {
        "type": "risk",
        "title": "Low Quest Completion Detected",
        "text": text,
        "meta": {"quests": [{"name": n, "rate": r, "attempts": a} for n, r, a in struggling]},
    }


def insight_high_failure_task_type(community_id):
    """Find the task type causing the most failures across the community."""
    sq_ids = _subquest_ids_for_community(community_id)
    if not sq_ids:
        return None

    result = (
        db.session.query(
            Task.type,
            func.count(TaskAttemptHistory.id).label("fails"),
        )
        .join(TaskAttemptHistory, Task.id == TaskAttemptHistory.task_id)
        .filter(
            Task.subquest_id.in_(sq_ids),
            TaskAttemptHistory.status == "failed",
        )
        .group_by(Task.type)
        .order_by(func.count(TaskAttemptHistory.id).desc())
        .first()
    )

    if not result or result.fails < 3:
        return None

    readable = result.type.replace("-", " ").title()

    return {
        "type": "warning",
        "title": f"{readable} Tasks Causing Drop-offs",
        "text": (
            f"'{readable}' tasks have accumulated {result.fails} failures — "
            "the highest of any task type in your community. "
            "Review the instructions or reduce friction for this step."
        ),
        "meta": {"task_type": result.type, "total_failures": result.fails},
    }


def insight_inactive_members(community_id):
    """Members who joined but haven't attempted a single quest."""
    member_ids = _member_ids(community_id)
    if not member_ids:
        return None

    sq_ids = _subquest_ids_for_community(community_id)
    if not sq_ids:
        return None

    # members who have at least one attempt
    active_ids = (
        db.session.query(distinct(TaskAttemptHistory.user_id))
        .join(Task, TaskAttemptHistory.task_id == Task.id)
        .filter(
            Task.subquest_id.in_(sq_ids),
            TaskAttemptHistory.user_id.in_(member_ids),
        )
        .all()
    )
    active_set = {r[0] for r in active_ids}

    inactive = [uid for uid in member_ids if uid not in active_set]
    total    = len(member_ids)
    inactive_count = len(inactive)

    if inactive_count == 0 or total == 0:
        return None

    pct = round((inactive_count / total) * 100, 1)

    if pct < 10:
        return None  # not alarming enough

    # High inactive = risk signal
    # But it's ALSO a growth opportunity — those members are untapped
    # Emit both so the frontend always has one of each
    return [
        {
            "type": "risk",
            "title": "Members Not Engaging With Quests",
            "text": (
                f"{pct}% of your members ({inactive_count} out of {total}) "
                "have never attempted a quest. "
                "A welcome quest or pinned announcement could bring them in."
            ),
            "meta": {"inactive_count": inactive_count, "total_members": total, "percent": pct},
        },
        {
            "type": "growth",
            "title": "Growth Opportunity",
            "text": (
                f"You have {inactive_count} member{'s' if inactive_count > 1 else ''} "
                f"({pct}% of your community) who haven't started a quest yet. "
                "Converting even half of them could significantly boost your engagement metrics."
            ),
            "meta": {"inactive_count": inactive_count, "total_members": total, "percent": pct},
        },
    ]


def insight_best_performing_quest(community_id):
    """Celebrate the top quest — positive reinforcement signal."""
    sq_ids = _subquest_ids_for_community(community_id)
    best = None
    best_rate = -1
    best_attempts = 0
    best_name = ""

    for sq_id in sq_ids:
        sq = db.session.get(Subquest, sq_id)
        stats = get_subquest_attempt_stats(sq_id)
        attempts = stats["total_attempts"]
        success  = stats["total_success"]

        if attempts < 5:
            continue

        rate = (success / attempts) * 100

        if rate > best_rate:
            best_rate = rate
            best = sq
            best_attempts = attempts
            best_name = sq.name

    if not best or best_rate < 60:
        return None

    return {
        "type": "positive",
        "title": "Top Performing Quest",
        "text": (
            f"'{best_name}' is your strongest quest with a "
            f"{round(best_rate, 1)}% success rate across {best_attempts} attempts. "
            "Consider using its structure as a template for new quests."
        ),
        "meta": {"quest_name": best_name, "rate": round(best_rate, 1), "attempts": best_attempts},
    }


def insight_draft_quests_sitting_idle(community_id):
    """Drafts that have been sitting for 7+ days without being published."""
    cutoff = datetime.utcnow() - timedelta(days=7)

    old_drafts = (
        db.session.query(Subquest)
        .join(Quest, Subquest.quest_id == Quest.id)
        .filter(
            Quest.community_id == community_id,
            Subquest.is_draft == True,
            Subquest.is_archive == False,
            Subquest.created_at <= cutoff,
        )
        .all()
    )

    if not old_drafts:
        return None

    count = len(old_drafts)
    names = [sq.name for sq in old_drafts[:3]]
    preview = ", ".join(f"'{n}'" for n in names)
    if count > 3:
        preview += f" and {count - 3} more"

    return {
        "type": "warning",
        "title": f"{count} Quest{'s' if count > 1 else ''} Still in Draft",
        "text": (
            f"{preview} {'have' if count > 1 else 'has'} been in draft for over 7 days. "
            "Publish them to start collecting engagement data."
        ),
        "meta": {"draft_count": count, "draft_names": [sq.name for sq in old_drafts]},
    }


def insight_recent_activity_spike(community_id):
    """Detect if the last 7 days had significantly more attempts than the previous 7."""
    sq_ids = _subquest_ids_for_community(community_id)
    if not sq_ids:
        return None

    now     = datetime.utcnow()
    week1_start = now - timedelta(days=7)
    week2_start = now - timedelta(days=14)

    def attempt_count(start, end):
        return (
            db.session.query(func.count(TaskAttemptHistory.id))
            .join(Task, TaskAttemptHistory.task_id == Task.id)
            .filter(
                Task.subquest_id.in_(sq_ids),
                TaskAttemptHistory.attempted_at >= start,
                TaskAttemptHistory.attempted_at < end,
            )
            .scalar() or 0
        )

    recent   = attempt_count(week1_start, now)
    previous = attempt_count(week2_start, week1_start)

    if previous == 0 or recent == 0:
        return None

    change_pct = ((recent - previous) / previous) * 100

    if change_pct >= 30:
        return {
            "type": "growth",
            "title": "Quest Activity Spiking 🚀",
            "text": (
                f"Quest attempts are up {round(change_pct, 1)}% this week "
                f"({recent} attempts vs {previous} last week). "
                "Momentum is building — a great time to launch a new quest."
            ),
            "meta": {"recent": recent, "previous": previous, "change_pct": round(change_pct, 1)},
        }

    if change_pct <= -30:
        return {
            "type": "risk",
            "title": "Quest Activity Dropping",
            "text": (
                f"Quest attempts dropped {abs(round(change_pct, 1))}% this week "
                f"({recent} vs {previous} last week). "
                "Consider promoting active quests or launching something new."
            ),
            "meta": {"recent": recent, "previous": previous, "change_pct": round(change_pct, 1)},
        }

    return None


def insight_reward_diversity(community_id):
    """Check if all quests are using only XP — encourage diversity."""
    sq_ids = _subquest_ids_for_community(community_id)
    if not sq_ids:
        return None

    rewards = (
        db.session.query(SubquestReward.reward_type)
        .filter(SubquestReward.subquest_id.in_(sq_ids))
        .all()
    )

    if not rewards:
        return None

    types = [r.reward_type for r in rewards]
    unique_types = set(types)
    xp_only = unique_types == {"xp"} or unique_types == {"XP"}
    total = len(types)

    if xp_only and total >= 3:
        return {
            "type": "growth",
            "title": "All Quests Rewarding Only XP",
            "text": (
                f"All {total} of your quests use XP as the only reward. "
                "Adding token, role, or custom rewards on select quests "
                "can significantly boost completion rates."
            ),
            "meta": {"reward_types_in_use": list(unique_types), "total_quests": total},
        }

    return None


def insight_single_task_quests(community_id):
    """Quests with only 1 task tend to perform better — flag multi-step quests with low completion."""
    sq_ids = _subquest_ids_for_community(community_id)
    struggling_multi = []

    for sq_id in sq_ids:
        sq = db.session.get(Subquest, sq_id)
        task_count = len(sq.tasks) if sq.tasks else 0

        if task_count < 3:
            continue

        stats = get_subquest_attempt_stats(sq_id)
        attempts = stats["total_attempts"]
        success  = stats["total_success"]

        if attempts < 5:
            continue

        rate = (success / attempts) * 100
        if rate < 50:
            struggling_multi.append((sq.name, task_count, round(rate, 1)))

    if not struggling_multi:
        return None

    struggling_multi.sort(key=lambda x: x[2])
    name, steps, rate = struggling_multi[0]

    return {
        "type": "warning",
        "title": "Multi-Step Quest Causing Drop-offs",
        "text": (
            f"'{name}' has {steps} steps and only a {rate}% completion rate. "
            "Long quest chains cause user fatigue. "
            "Consider splitting it into smaller quests."
        ),
        "meta": {"quests": [{"name": n, "steps": s, "rate": r} for n, s, r in struggling_multi]},
    }


def insight_new_member_quest_funnel(community_id):
    """
    Check if new members (joined in last 14 days) are converting into quest participants.
    Low conversion = onboarding gap.
    """
    cutoff = datetime.utcnow() - timedelta(days=14)

    new_member_ids = (
        db.session.query(CommunityUserRole.user_id)
        .filter(
            CommunityUserRole.community_id == community_id,
            CommunityUserRole.banned == False,
            CommunityUserRole.joined_at >= cutoff,
        )
        .all()
    )
    new_ids = [r.user_id for r in new_member_ids]

    if len(new_ids) < 5:
        return None  # not enough signal

    sq_ids = _subquest_ids_for_community(community_id)
    if not sq_ids:
        return None

    converters = (
        db.session.query(distinct(TaskAttemptHistory.user_id))
        .join(Task, TaskAttemptHistory.task_id == Task.id)
        .filter(
            Task.subquest_id.in_(sq_ids),
            TaskAttemptHistory.user_id.in_(new_ids),
        )
        .all()
    )
    converter_set = {r[0] for r in converters}

    total_new    = len(new_ids)
    converted    = len(converter_set)
    not_converted = total_new - converted
    conversion_pct = round((converted / total_new) * 100, 1)

    if conversion_pct >= 50:
        return None  # healthy

    return {
        "type": "growth",
        "title": "New Members Not Starting Quests",
        "text": (
            f"Only {conversion_pct}% of members who joined in the last 14 days "
            f"have attempted a quest ({converted} out of {total_new}). "
            "A dedicated 'Start Here' quest could convert these members into active participants."
        ),
        "meta": {
            "new_members": total_new,
            "converted": converted,
            "not_converted": not_converted,
            "conversion_pct": conversion_pct,
        },
    }


# ─────────────────────────────────────────────
# MASTER RUNNER
# ─────────────────────────────────────────────

INSIGHT_GENERATORS = [
    insight_recent_activity_spike,
    insight_best_performing_quest,
    insight_low_completion_quests,
    insight_high_failure_task_type,
    insight_inactive_members,
    insight_new_member_quest_funnel,
    insight_draft_quests_sitting_idle,
    insight_reward_diversity,
    insight_single_task_quests,
]


def generate_all_insights(community_id):
    insights = []

    for generator in INSIGHT_GENERATORS:
        try:
            result = generator(community_id)
            if not result:
                continue
            # some generators return a list (e.g. insight_inactive_members emits risk + growth)
            if isinstance(result, list):
                insights.extend(result)
            else:
                insights.append(result)
        except Exception as e:
            print(f"[insights] {generator.__name__} failed: {e}")

    # ── GUARANTEED FALLBACKS ──────────────────────────────────────────────────
    # The frontend always expects at least one "growth" and one "risk" card.
    # If real data doesn't produce them, inject a sensible default.

    types_present = {i["type"] for i in insights}

    if "growth" not in types_present:
        total_members = len(_member_ids(community_id))
        sq_ids        = _subquest_ids_for_community(community_id)
        live_quests   = len(sq_ids)

        if live_quests == 0:
            growth_text = (
                "You don't have any published quests yet. "
                "Publishing your first quest is the fastest way to activate your community."
            )
        elif total_members == 0:
            growth_text = (
                f"You have {live_quests} live quest{'s' if live_quests > 1 else ''}. "
                "Start bringing members in to begin collecting engagement data."
            )
        else:
            growth_text = (
                f"Your community has {total_members} member{'s' if total_members > 1 else ''} "
                f"and {live_quests} active quest{'s' if live_quests > 1 else ''}. "
                "Keep quests fresh and reward diversity high to sustain growth."
            )

        insights.insert(0, {
            "type": "growth",
            "title": "Growth Opportunity",
            "text": growth_text,
            "meta": {"total_members": total_members, "live_quests": live_quests},
        })

    if "risk" not in types_present:
        insights.append({
            "type": "risk",
            "title": "Retention Risk",
            "text": (
                "No critical risks detected right now. "
                "Keep monitoring quest completion rates — "
                "drops below 40% are a sign users need simpler steps or better rewards."
            ),
            "meta": {},
        })

    return insights

