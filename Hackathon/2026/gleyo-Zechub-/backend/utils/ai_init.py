from backend.communities.community_models import Community, AIConversation, AIMessage
from backend.quests.subquest_completion import SubquestCompletion
from backend.quests.quest_models import Quest
from backend.quests.sub_quest_models import Subquest
from backend.utils.instance import db
from sqlalchemy import func, case
from backend.quests.task_histr import TaskAttemptHistory
from backend.utils.utils import get_subquest_attempt_stats, is_safe_url
from flask_login import current_user
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from backend.quests.task_models import Task
from collections import Counter
from backend.communities.CommunityUserRole_models import CommunityUserRole
from backend.models.session_models import UserSession
import json
from backend.models.models import Users
import re
from backend.quests.subquestreward import SubquestReward

# ------------------------------
# INTENT DETECTOR
# ------------------------------
from rapidfuzz import process, fuzz
PLATFORM_OWNER_NAME = "Florish Isreal"
PLATFORM_OWNER_EMAIL = "florishisreal@gmail.com"
PLATFORM_NAME = "Soyoto"

def format_task_type(task_type):

    if not task_type:
        return "Unknown"

    return task_type.replace("-", " ").title()


def extract_country(location: str):
    if not location:
        return None

    parts = [p.strip() for p in location.split(",")]

    # return last part (country)
    if parts:
        return parts[-1]

    return None

def search_founder_from_google(community_name):

    try:
        query = f"founder of {community_name}"
        url = f"https://www.google.com/search?q={query}"

        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        r = requests.get(url, headers=headers, timeout=5)

        soup = BeautifulSoup(r.text, "html.parser")

        # Google quick answer
        spans = soup.find_all("span")

        for s in spans:
            text = s.get_text().strip()

            # simple heuristic
            if len(text.split()) <= 4 and text.isalpha():
                return text

    except Exception:
        pass

    return None

def is_founder_question(text: str):

    text = text.lower()

    patterns = [
        "who created",
        "who founded",
        "founder of",
        "who is the founder",
        "who made",
    ]

    return any(p in text for p in patterns)



def normalize_text(text: str):

    words = text.lower().split()
    fixed_words = []

    for word in words:

        match = process.extractOne(
            word,
            VOCABULARY,
            scorer=fuzz.ratio
        )

        if match and match[1] >= 70:
            fixed_words.append(match[0])
        else:
            fixed_words.append(word)

    return " ".join(fixed_words)



def get_best_performing_subquest(community_id):

    subquests = (
        db.session.query(Subquest)
        .join(Quest)
        .filter(Quest.community_id == community_id)
        .all()
    )

    best = None
    best_rate = -1
    best_stats = None

    for sq in subquests:

        stats = get_subquest_attempt_stats(sq.id)

        attempts = stats["total_attempts"]
        success = stats["total_success"]

        if attempts == 0:
            continue

        rate = (success / attempts) * 100

        if rate > best_rate:
            best_rate = rate
            best = sq
            best_stats = stats

    return best, best_rate, best_stats



def analyze_quest_performance(subquest, success_rate, attempts):
    if not subquest.tasks:
        return "No task data available for deeper analysis."

    tasks = subquest.tasks
    task_types = list(set([t.type for t in tasks]))

    parts = []

    # =====================================================
    # PERFORMANCE LEVEL
    # =====================================================
    if attempts < 60 and success_rate >= 90:

        tasks = subquest.tasks or []
        step_count = len(tasks)

        return (
            "This quest is currently showing a perfect completion rate. "
            "While the sample size is still small, early results indicate that users "
            "are able to complete all steps without friction.\n\n"
            f"The {step_count}-step structure appears clear and manageable. "
            "If this trend continues with more attempts, it would strongly suggest "
            "that the quest design and instructions are effective."
        )
    if success_rate >= 90:
        parts.append(
            "This quest is performing extremely well. Nearly everyone who starts it "
            "is able to complete it successfully, which indicates the flow, instructions, "
            "and reward balance are working perfectly."
        )

    elif success_rate >= 70:
        parts.append(
            "This quest is performing very well. Most users who start it are able "
            "to finish successfully. This usually means the steps are clear and "
            "the reward feels worth the effort."
        )

    elif success_rate >= 40:
        parts.append(
            "This quest is performing moderately. Some users complete it successfully, "
            "but others stop before finishing. There may be minor friction points "
            "or slightly higher effort involved."
        )

    else:
        parts.append(
            "Completion is currently low. This usually means users are facing difficulty, "
            "confusion, or the quest feels like too much work compared to the reward."
        )

    # =====================================================
    # STEP COUNT ANALYSIS
    # =====================================================

    step_count = len(tasks)

    if success_rate < 70:
        if step_count >= 3:
            parts.append(
                f"This quest has {step_count} steps. When a quest has multiple steps, "
                "more users tend to drop out before finishing because it feels longer "
                "and requires more effort."
            )
    else:
        parts.append(
            f"This quest has {step_count} steps, which users are handling comfortably "
            "based on the strong completion rate."
        )

    # =====================================================
    # TASK TYPE ANALYSIS
    # ONLY SHOW RISKS IF PERFORMANCE IS NOT HIGH
    # =====================================================

    if success_rate < 70:

        # ---------- DISCORD ----------
        if "discord" in task_types:
            parts.append(
                "The Discord task may cause some users to stop because they might "
                "already be in the server or may not see confirmation quickly."
            )

        # ---------- SOCIAL ----------
        if any(t in task_types for t in ["twitter", "x", "social"]):
            parts.append(
                "Social media tasks can reduce completion because users need to switch "
                "to another app and perform actions publicly."
            )

        # ---------- VISIT LINK ----------
        if any(t in task_types for t in ["url", "visit-link"]):
            parts.append(
                "The Visit Link task sends users outside your platform. When users leave "
                "the page, some do not return to finish the remaining steps, especially "
                "on mobile devices."
            )

        # ---------- PARTNERSHIP ----------
        if "partnership" in task_types:
            parts.append(
                "The Partnership task introduces another platform or community, "
                "which can sometimes create confusion about what to do."
            )

        # ---------- TEXT ----------
        if any(t in task_types for t in ["numbers", "text"]):
            parts.append(
                "The Text or Answer task requires users to type information manually. "
                "If instructions are unclear, users may worry about getting it wrong."
            )

        # ---------- FILE UPLOAD ----------
        if "file-upload" in task_types:

            upload_tasks = [t for t in tasks if t.type == "file-upload"]

            for ut in upload_tasks:

                config = ut.config or {}
                file_count = config.get("fileCount")
                file_types = config.get("fileTypes", [])

                msg = (
                    "The File Upload task requires more effort because users must "
                    "locate files and upload them from their device."
                )

                if file_count:
                    msg += f" This quest asks for {file_count} files, increasing effort."

                if file_types:
                    readable = ", ".join(file_types)
                    msg += f" Allowed file types include {readable}, which may create confusion."

                parts.append(msg)

        # ---------- INVITE ----------
        if "invite" in task_types:
            parts.append(
                "Invite tasks depend on other people joining, which users cannot fully control. "
                "This often reduces completion."
            )

    else:
        # POSITIVE TASK FEEDBACK WHEN PERFORMANCE IS HIGH
        if any(t in task_types for t in ["url", "visit-link"]):
            parts.append(
                "Even with an external link step, users are returning and completing the quest "
                "successfully, which suggests the navigation and instructions are clear."
            )

        if any(t in task_types for t in ["numbers", "text"]):
            parts.append(
                "Users are completing the text input step without difficulty, indicating the "
                "instructions are easy to understand."
            )

    # =====================================================
    # REWARD VS EFFORT
    # =====================================================

    if success_rate < 40 and step_count >= 4:
        parts.append(
            "There may also be a balance issue between effort and reward. "
            "If the reward feels too small compared to the work required, "
            "users are less likely to finish."
        )

    # =====================================================
    # IMPROVEMENT SUGGESTIONS
    # ONLY WHEN PERFORMANCE IS NOT HIGH
    # =====================================================

    if success_rate < 70:
        parts.append(
            "Ways to improve this quest:\n"
            "• Reduce the number of steps if possible\n"
            "• Make instructions very clear with examples\n"
            "• Show confirmation immediately after each step\n"
            "• Increase rewards if the quest requires high effort\n"
            "• Consider splitting this into smaller quests"
        )

    # =====================================================
    # PERFECT SCORE BONUS
    # =====================================================

    if success_rate == 100:
        parts.append(
            "This quest currently has a perfect completion rate, which is an excellent "
            "indicator of strong design and user experience."
        )

    return "\n\n".join(parts)




def generate_top_best_response(community, limit=3):

    data = get_ranked_subquests(community.id)

    if not data:
        return "No quest data available."

    # sort by success rate descending
    data.sort(key=lambda x: x["rate"], reverse=True)

    top = data[:limit]

    lines = ["🏆 Top Performing Quests:\n"]

    for i, item in enumerate(top, start=1):

        sq = item["subquest"]

        lines.append(
            f"{i}. {sq.name}\n"
            f"   • Success Rate: {item['rate']:.1f}%\n"
            f"   • Attempts: {item['attempts']}\n"
        )

    return "\n".join(lines)

def generate_difficulty_response(community):

    data = get_ranked_subquests(community.id)

    if not data:
        return "No quest data available."

    # hardest = lowest success rate
    hardest = min(data, key=lambda x: x["rate"])

    # easiest = highest success rate
    easiest = max(data, key=lambda x: x["rate"])

    return (
        f"🎯 Difficulty Insights:\n\n"
        f"Hardest Quest:\n"
        f"{hardest['subquest'].name}\n"
        f"Success Rate: {hardest['rate']:.1f}%\n\n"
        f"Easiest Quest:\n"
        f"{easiest['subquest'].name}\n"
        f"Success Rate: {easiest['rate']:.1f}%"
    )



def find_matching_subquest(community_id, text: str):

    text = normalize_text(text.lower())

    subquests = (
        db.session.query(Subquest)
        .join(Quest)
        .filter(Quest.community_id == community_id)
        .all()
    )

    names = {sq.name.lower(): sq for sq in subquests if sq.name}

    if not names:
        return None, None

    match = process.extractOne(
        text,
        names.keys(),
        scorer=fuzz.token_set_ratio
    )

    if not match:
        return None, None

    name, score, _ = match

    # ⭐ HIGH CONFIDENCE → AUTO MATCH
    if score >= 85:
        return names[name], None

    # ⭐ MEDIUM CONFIDENCE → SUGGESTION ONLY
    if score >= 60:
        return None, names[name]

    # ⭐ LOW CONFIDENCE → NOTHING
    return None, None




def explain_performance(task_type, success_rate):

    if success_rate >= 70:
        return "Engagement is strong. Users are completing this quest easily."

    if success_rate >= 40:
        return "Performance is moderate. Some users may face minor friction."

    # LOW PERFORMANCE
    if task_type == "twitter":
        return (
            "Low engagement may be caused by users not having Twitter accounts "
            "or the action requiring multiple steps. Consider simplifying instructions "
            "or offering higher rewards."
        )

    if task_type == "invite":
        return (
            "Invite quests often have lower completion because they require effort "
            "from users. You may want to reduce the number of invites required "
            "or increase incentives."
        )

    if task_type == "discord":
        return (
            "Users might already be in the server or unsure how to complete the step. "
            "Clear instructions can improve engagement."
        )

    return "Engagement is lower than expected. Review difficulty and rewards."



def generate_quest_result_response(subquest):

    stats = get_subquest_attempt_stats(subquest.id)

    total_attempts = stats["total_attempts"]
    total_success = stats["total_success"]

    if total_attempts > 0:
        success_rate = (total_success / total_attempts) * 100
    else:
        success_rate = 0

    analysis = analyze_quest_performance(subquest, success_rate, total_attempts)


    return (
        f"Here are the results for '{subquest.name}' quest:\n\n"
        f"• Total Attempts: {total_attempts}\n"
        f"• Successful Completions: {total_success}\n"
        f"• Success Rate: {success_rate:.1f}%\n\n"
        f"{analysis}"
    )



def get_top_user_countries(community_id, limit=3):

    roles = (
        db.session.query(CommunityUserRole)
        .filter_by(community_id=community_id, banned=False)
        .all()
    )

    user_ids = [r.user_id for r in roles]

    if not user_ids:
        return []

    countries = []

    for uid in user_ids:

        session = (
            db.session.query(UserSession)
            .filter_by(user_id=uid)
            .order_by(UserSession.login_time.asc())  # FIRST LOGIN
            .first()
        )

        if not session or not session.location:
            continue

        country = extract_country(session.location)

        if country:
            countries.append(country)

    counts = Counter(countries)

    return counts.most_common(limit)

def generate_country_distribution_response(community, text):

    counts = get_user_country_counts(community.id)

    if not counts:
        return "No location data is available yet."

    # detect requested number (top 2, 3, 5...)
    limit = extract_number(text, default=3)

    # get sorted countries
    ranked = counts.most_common(limit)

    total = sum(counts.values())

    lines = ["🌍 User Location Insights:\n"]

    for country, count in ranked:
        percent = (count / total) * 100 if total else 0
        lines.append(f"{country}: {percent:.1f}%")

    # ---------- IF ONLY ONE COUNTRY EXISTS ----------
    if len(counts) == 1:
        only_country = ranked[0][0]

        lines.append(
            f"\nRight now, all of your users are from {only_country}. "
            "No other countries have been detected yet."
        )

    else:
        top_country = ranked[0][0]
        top_percent = (ranked[0][1] / total) * 100

        lines.append(
            f"\nMost of your users are currently located in "
            f"{top_country} ({top_percent:.1f}%)."
        )

    return "\n".join(lines)



def is_location_distribution_question(text: str):

    t = text.lower()

    patterns = [
        "most users",
        "users from",
        "members from",
        "people from",
        "community from",
        "where are users",
        "where are members",
        "where are people",
        "which country",
        "countries",
        "user location",
        "member location",
        "location of users",
        "location of members",
    ]

    return any(p in t for p in patterns)



def extract_username_from_text(text: str):

    text = text.lower()

    # common connectors before username
    triggers = [
        "is", "of", "for", "about",
        "user", "member"
    ]

    # ✅ correct regex string
    words = re.findall(r"\w+", text)

    for i, w in enumerate(words):
        if w in triggers and i + 1 < len(words):
            candidate = words[i + 1]
            return candidate.strip()

    return None

def find_user_by_username(name: str):

    if not name:
        return None

    return (
        db.session.query(Users)
        .filter(func.lower(Users.username) == name.lower())
        .first()
    )


def detect_specific_user_location(text: str):

    if not is_individual_location_question(text):
        return False

    username = extract_username_from_text(text)

    user = find_user_by_username(username)

    if user:
        return True

    return False



def is_individual_location_question(text: str):

    t = text.lower()

    patterns = [
        "where is",
        "where does",
        "where did",
        "where from",
        "is from",
        "comes from",
        "based in",
        "located in",
        "located at",
        "location of",
        "which country is",
        "which country does",
        "what country is",
        "what country does",
        "user from",
        "member from",
    ]

    return any(p in t for p in patterns)


def generate_privacy_location_response():

    return (
        "For privacy and security reasons, I cannot provide location "
        "information about individual users.\n\n"
        "However, I can share anonymous aggregated insights such as "
        "which countries your community members are mostly from."
    )



def get_user_country_counts(community_id):

    roles = (
        db.session.query(CommunityUserRole)
        .filter_by(community_id=community_id, banned=False)
        .all()
    )

    user_ids = [r.user_id for r in roles]

    countries = []

    for uid in user_ids:

        session = (
            db.session.query(UserSession)
            .filter_by(user_id=uid)
            .order_by(UserSession.login_time.asc())
            .first()
        )

        if not session or not session.location:
            continue

        country = extract_country(session.location)

        if country:
            countries.append(country)

    return Counter(countries)



def generate_top_country_response(community):

    counts = get_user_country_counts(community.id)

    if not counts:
        return "No location data is available yet."

    country, count = counts.most_common(1)[0]

    total = sum(counts.values())
    percent = (count / total) * 100 if total else 0

    return (
        "🌍 User Location Insight:\n\n"
        f"Most of your users are from {country} "
        f"({percent:.1f}% of your community)."
    )




def generate_lowest_country_response(community):

    counts = get_user_country_counts(community.id)

    if not counts:
        return "No location data is available yet."

    country, count = min(counts.items(), key=lambda x: x[1])

    total = sum(counts.values())
    percent = (count / total) * 100 if total else 0

    return (
        "🌍 User Location Insight:\n\n"
        f"The country with the fewest users is {country} "
        f"({percent:.1f}% of your community)."
    )



def detect_country_intent(text: str):

    t = text.lower()

    if any(w in t for w in [
        "least",
        "lowest",
        "fewest",
        "smallest"
    ]):
        return "lowest"

    if any(w in t for w in [
        "most",
        "highest",
        "majority",
        "particular"
    ]):
        return "highest"

    return "distribution"



from sqlalchemy import func, case




def get_user_performance_stats(community_id):

    results = (
        db.session.query(
            Users.id,
            Users.username,

            func.count(TaskAttemptHistory.id).label("attempts"),

            func.sum(
                case(
                    (TaskAttemptHistory.status == "success", 1),
                    else_=0
                )
            ).label("success"),

            func.sum(
                case(
                    (TaskAttemptHistory.status == "failed", 1),
                    else_=0
                )
            ).label("fails"),
        )
        .join(TaskAttemptHistory, Users.id == TaskAttemptHistory.user_id)
        .join(Task, TaskAttemptHistory.task_id == Task.id)
        .join(Subquest, Task.subquest_id == Subquest.id)
        .join(Quest, Subquest.quest_id == Quest.id)
        .join(
            CommunityUserRole,
            CommunityUserRole.user_id == Users.id
        )
        .filter(
            Quest.community_id == community_id,
            CommunityUserRole.community_id == community_id,
            CommunityUserRole.banned == False
        )
        .group_by(Users.id, Users.username)
        .all()
    )

    data = []

    for r in results:

        attempts = r.attempts or 0
        success = r.success or 0
        fails = r.fails or 0

        rate = (success / attempts) * 100 if attempts else 0

        data.append({
            "user_id": r.id,
            "username": r.username,
            "attempts": attempts,
            "success": success,
            "fails": fails,
            "rate": rate
        })

    return data



def get_top_performing_user(community_id):

    data = get_user_performance_stats(community_id)

    if not data:
        return None

    # prioritize success rate, then attempts count
    return max(data, key=lambda x: (x["rate"], x["attempts"]))



def get_worst_performing_user(community_id):

    data = get_user_performance_stats(community_id)

    if not data:
        return None

    return max(data, key=lambda x: (x["fails"], x["attempts"]))



def generate_best_user_response(community):

    user = get_top_performing_user(community.id)

    if not user:
        return "No user performance data available yet."

    return (
        f"🏆 Top Performing Member:\n\n"
        f"User: {user['username']}\n"
        f"Attempts: {user['attempts']}\n"
        f"Successful: {user['success']}\n"
        f"Failed: {user['fails']}\n"
        f"Success Rate: {user['rate']:.1f}%\n\n"
        "This member completes most of the quests they attempt successfully."
    )


def get_user_most_failed_task_type(user_id, community_id):

    results = (
        db.session.query(
            Task.type,
            func.count(TaskAttemptHistory.id).label("fails")
        )
        .join(TaskAttemptHistory, Task.id == TaskAttemptHistory.task_id)
        .join(Subquest, Task.subquest_id == Subquest.id)
        .join(Quest, Subquest.quest_id == Quest.id)
        .filter(
            TaskAttemptHistory.user_id == user_id,
            TaskAttemptHistory.status == "failed",
            Quest.community_id == community_id
        )
        .group_by(Task.type)
        .order_by(func.count(TaskAttemptHistory.id).desc())
        .all()
    )

    if not results:
        return None, 0

    top = results[0]

    return top.type, top.fails


def generate_worst_user_response(community):

    user = get_worst_performing_user(community.id)

    if not user:
        return "No user performance data available yet."

    # 🔥 find most painful task type
    task_type, fail_count = get_user_most_failed_task_type(
        user["user_id"],
        community.id
    )

    readable_type = format_task_type(task_type)

    # explanation logic
    if task_type == "file-upload":
        reason = (
            "File upload tasks usually require more effort because users must "
            "locate files on their device and upload them correctly."
        )
    elif task_type in ["twitter", "x", "social"]:
        reason = (
            "Social media tasks often require switching apps and performing "
            "public actions, which can reduce completion."
        )
    elif task_type == "invite":
        reason = (
            "Invite tasks depend on other people joining, which is outside "
            "the user's full control."
        )
    elif task_type == "discord":
        reason = (
            "Discord verification sometimes causes confusion if users are "
            "already in the server or cannot confirm completion."
        )
    else:
        reason = (
            "This task type appears to be the main difficulty area for the user."
        )

    return (
        f"⚠️ Member With Most Difficulties:\n\n"
        f"User: {user['username']}\n"
        f"Attempts: {user['attempts']}\n"
        f"Successful: {user['success']}\n"
        f"Failed: {user['fails']}\n"
        f"Success Rate: {user['rate']:.1f}%\n\n"
        f"💥 Most Difficult Task Type: {readable_type}\n"
        f"Failures on this task: {fail_count}\n\n"
        f"Why this may be happening:\n"
        f"{reason}"
    )


def generate_best_quest_response(community):

    best, rate, stats = get_best_performing_subquest(community.id)

    if not best:
        return "No quest performance data is available yet."

    attempts = stats["total_attempts"]
    success = stats["total_success"]

    return (
        f"The best performing quest right now is:\n\n"
        f"🏆 {best.name}\n\n"
        f"• Attempts: {attempts}\n"
        f"• Successful: {success}\n"
        f"• Success Rate: {rate:.1f}%\n\n"
        "This quest is doing well because a high number of users who start it "
        "are able to finish successfully."
    )


def extract_number(text, default=3):

    match = re.search(r"\d+", text)

    if match:
        return int(match.group())

    return default


def get_ranked_subquests(community_id):

    subquests = (
        db.session.query(Subquest)
        .join(Quest)
        .filter(Quest.community_id == community_id)
        
        .all()
    )

    results = []

    for sq in subquests:

        stats = get_subquest_attempt_stats(sq.id)

        attempts = stats["total_attempts"]
        success = stats["total_success"]

        if attempts == 0:
            continue

        rate = (success / attempts) * 100

        results.append({
            "subquest": sq,
            "attempts": attempts,
            "success": success,
            "rate": rate
        })

    return results


def generate_worst_response(community, limit=3):

    data = get_ranked_subquests(community.id)

    if not data:
        return "No quest data available."

    data.sort(key=lambda x: x["rate"])

    worst = data[:limit]

    lines = ["⚠️ Lowest Performing Quests:\n"]

    for i, item in enumerate(worst, start=1):

        sq = item["subquest"]

        lines.append(
            f"{i}. {sq.name}\n"
            f"   • Success Rate: {item['rate']:.1f}%\n"
            f"   • Attempts: {item['attempts']}\n"
        )

    return "\n".join(lines)


def generate_popular_response(community, limit=3):

    data = get_ranked_subquests(community.id)

    if not data:
        return "No quest data available."

    data.sort(key=lambda x: x["attempts"], reverse=True)

    top = data[:limit]

    lines = ["🔥 Most Popular Quests:\n"]

    for i, item in enumerate(top, start=1):

        sq = item["subquest"]

        lines.append(
            f"{i}. {sq.name}\n"
            f"   • Attempts: {item['attempts']}\n"
            f"   • Success Rate: {item['rate']:.1f}%\n"
        )

    return "\n".join(lines)

def get_task_with_most_failures(community_id):

    result = (
        db.session.query(
            Task.id,
            Task.type,
            Subquest.name.label("subquest_name"),
            Quest.title.label("quest_name"),
            func.count(TaskAttemptHistory.id).label("fails")
        )
        .join(TaskAttemptHistory, Task.id == TaskAttemptHistory.task_id)
        .join(Subquest, Task.subquest_id == Subquest.id)
        .join(Quest, Subquest.quest_id == Quest.id)
        .filter(
            Quest.community_id == community_id,
            TaskAttemptHistory.status == "failed"
        )
        .group_by(Task.id, Subquest.name, Quest.title)
        .order_by(func.count(TaskAttemptHistory.id).desc())
        .first()
    )

    return result

def generate_failure_task_response(community):

    task_data = get_task_with_most_failures(community.id)

    if not task_data:
        return "No task failure data available yet."

    task_type = task_data.type
    fails = task_data.fails
    subquest_name = task_data.quest_name

    readable_type = format_task_type(task_type)

    explanation = explain_performance(task_type, 20)

    return (
        f"⚠️ Task Causing Most Failures:\n\n"
        f"Task: {readable_type}\n"
        f"Quest: {subquest_name}\n"
        f"Failures: {fails}\n\n"
        f"{explanation}"
    )

def infer_limit(text, default_plural=3):

    text = text.lower()

    # explicit number always wins
    match = re.search(r"\d+", text)
    if match:
        return int(match.group())

    # singular detection
    if "quest" in text and "quests" not in text:
        return 1

    return default_plural



def is_pure_greeting(words):
    """
    Returns True only if message is greeting ONLY
    """
    has_greeting = any(w in GREETING_WORDS for w in words)
    has_intent = any(w in INTENT_WORDS for w in words)

    return has_greeting and not has_intent

def has_greeting(words):
    return any(w in GREETING_WORDS for w in words)




def is_more_info_request(text: str):

    t = text.lower()

    patterns = [
        "more info",
        "more information",
        "know more",
        "learn more",
        "get more info",
        "get more information",
        "where can i learn",
        "where can i know",
        "how can i know more",
        "how do i learn more",
        "i want more info",
        "i want more information",
        "tell me more",
        "show me more",
        "more details",
        "details please",
        "can i know more",
    ]

    return any(p in t for p in patterns)




def generate_community_response(community, text, words):

    creator_name = None
    if community.creator:
        creator_name = community.creator.username.capitalize()

    # ---------------- FULL INFO ----------------
    if any(p in text for p in [
        "all information",
        "everything",
        "full information",
        "details",
        "information regarding",
    ]):

        parts = [f"📘 Community Information: {community.name}\n"]

        if community.about:
            parts.append(f"About:\n{community.about}\n")

        if community.blockchain:
            parts.append(f"Blockchain: {community.blockchain}")

        if community.website:
            parts.append(f"Website: {community.website}")

        if creator_name:
            parts.append(f"Created By: {creator_name}")

        return "\n".join(parts)

    # ---------------- NAME ----------------
    if any(w in words for w in ["name", "called"]):
        return f"The community name is {community.name}."

    # ---------------- FOUNDER ----------------
    if (
        is_founder_question(text)
        or "owner" in words
        or "owns" in words
        or "founded" in words
        or "creator" in words
        or "created" in words
    ):

        name = community.name
        person = creator_name

        if not person:
            google_founder = search_founder_from_google(name)
            if google_founder:
                person = google_founder

        if not person:
            return "Founder information is not available."

        # ===== OWNER STYLE =====
        if "owner" in words or "owns" in words:
            return f"The owner of {name} is {person}."

        # ===== CREATOR STYLE =====
        if "creator" in words:
            return f"The creator of {name} is {person}."

        # ===== CREATED STYLE =====
        if "created" in words:
            return f"This community was created by {person}."

        # ===== FOUNDER STYLE =====
        if "founder" in words or "founded" in words:
            return f"{name} was founded by {person}."

        # ===== DEFAULT FALLBACK =====
        return f"{name} was created by {person}."



    # ---------------- ABOUT / MORE ----------------
    if is_more_info_request(text):

        if community.website:
            return (
                f"For more information, you can visit the official website:\n"
                f"{community.website}"
            )

        return "More information is not available right now."


    # ---------------- ABOUT ----------------
    if "about" in words:

        parts = []

        if community.about:
            parts.append(
                f"{community.name} is all about:\n{community.about}"
            )
        else:
            parts.append(
                "No description is available for this community."
            )

        if community.website:
            parts.append(
                f"\nFor more information, you can visit the official website:\n{community.website}"
            )

        return "\n".join(parts)




    # ---------------- BLOCKCHAIN ----------------
    if any(w in words for w in ["blockchain", "chain"]):

        if community.blockchain:
            return f"{community.name} is built on {community.blockchain}."
        else:
            return "Blockchain information is not specified."

    # ---------------- WEBSITE ----------------
    if any(w in words for w in ["website", "site", "link", "url"]):

        if community.website:
            return f"You can visit the official website here: {community.website}"
        else:
            return "Website information is not available."

    return None


def has_quest_context(words):
    return any(w in words for w in ["quest", "quests", "task", "tasks"])



def get_better_community_description(community):

    if community.about and len(community.about) > 50:
        return community.about

    if community.website:
        scraped = scrape_website_text(community.website)
        if scraped:
            return scraped

    return "No detailed description available."


def get_time_greeting():
    hour = datetime.now().hour

    if 5 <= hour < 12:
        return "Good morning ☀️"
    elif 12 <= hour < 17:
        return "Good afternoon 🌤️"
    elif 17 <= hour < 22:
        return "Good evening 🌆"
    else:
        return "Hello 🌙"


def is_platform_owner_question(text: str):

    t = text.lower()

    platform_words = [
        "website",
        "platform",
        "site",
        "app",
        "this app",
        "this website",
        "this platform",
    ]

    owner_words = [
        "owner",
        "founder",
        "ceo",
        "admin",
        "creator",
        "developer",
        "made",
        "built",
        "created",
    ]

    contact_words = [
        "contact",
        "reach",
        "email",
        "message",
        "talk",
    ]

    # ---------- STRONG SENTENCES ----------
    strong_patterns = [
        "who made this",
        "who created this",
        "who built this",
        "who owns this",
        "who is the owner",
        "who is the founder",
        "who is behind this",
        "contact the owner",
        "contact the admin",
        "reach the owner",
    ]

    if any(p in t for p in strong_patterns):
        return True

    has_platform = any(w in t for w in platform_words)
    has_owner = any(w in t for w in owner_words)

    if has_platform and has_owner:
        return True

    if has_owner and any(w in t for w in contact_words):
        return True

    return False


def generate_platform_owner_response(text: str):

    t = text.lower()

    contact_words = ["contact", "reach", "email", "message", "talk"]

    owner_words = ["owner", "founder", "ceo", "creator", "admin", "made", "built"]

    if any(w in t for w in contact_words):
        return (
            f"You can reach the CEO and founder directly via email: {PLATFORM_OWNER_EMAIL}.\n"
            "He’s always open to feedback, ideas, and collaboration."
        )

    if any(w in t for w in owner_words):
        return (
            f"{PLATFORM_NAME} was created by {PLATFORM_OWNER_NAME}.\n"
            "It’s built by an incredible group of people passionate about helping "
            "communities grow through quests, engagement, and real user participation."
        )

    return (
        f"{PLATFORM_NAME} was created by {PLATFORM_OWNER_NAME}, "
        "with the goal of making community engagement smarter and more rewarding."
    )



def detect_intent(text: str):

    t = text.lower()

    intents = []

    # volume / count
    if any(w in t for w in [
        "how many", "number of", "total", "count",
        "do we have", "amount of", "volume"
    ]):
        intents.append("count")

    # popularity
    if any(w in t for w in [
        "popular", "top", "best performing",
        "most completed", "highest"
    ]):
        intents.append("popular")

    # completion / engagement
    if any(w in t for w in [
        "completion", "engagement", "users finished",
        "participation", "activity"
    ]):
        intents.append("engagement")

    # quests reference
    if any(w in t for w in [
        "quest", "campaign", "mission",
        "task", "module"
    ]):
        intents.append("quest")

    return intents


def get_best_performing_subquest(community_id):

    subquests = (
        db.session.query(Subquest)
        .join(Quest)
        .filter(Quest.community_id == community_id)
        .all()
    )

    best = None
    best_rate = -1
    best_stats = None

    for sq in subquests:

        stats = get_subquest_attempt_stats(sq.id)

        attempts = stats["total_attempts"]
        success = stats["total_success"]

        if attempts == 0:
            continue

        rate = (success / attempts) * 100

        if rate > best_rate:
            best_rate = rate
            best = sq
            best_stats = stats

    return best, best_rate, best_stats


def get_subquest_counts(community_id):

    active_count = (
        db.session.query(Subquest)
        .join(Quest)
        .filter(
            Quest.community_id == community_id,
            Subquest.is_draft == False,
            Subquest.is_archive == False
        )
        .count()
    )

    draft_count = (
        db.session.query(Subquest)
        .join(Quest)
        .filter(
            Quest.community_id == community_id,
            Subquest.is_draft == True,
            Subquest.is_archive == False
        )
        .count()
    )

    total = active_count + draft_count

    return active_count, draft_count, total





DEFAULT_XP = 10
DEFAULT_TASK_COUNT = 1
DEFAULT_RECURRENCE = "None"
DEFAULT_REWARD_TYPE = "xp"
DEFAULT_VISIBILITY = "draft"

CREATE_WORDS = [
    "create quest",
    "make quest",
    "new quest",
    "add quest",
    "build quest",
    "start quest",
    "design quest",
    "develop quest",
    "craft quest",
    "construct quest",
    "generate quest",
    "set up quest",
    "setup quest",
    "configure quest",
    "launch quest"
]



TASK_TYPES = [
    "discord",
    "telegram",
    "file-upload",
    "youtube",
    "puzzle",
    "quiz",
    "poll",
    "url",
    "numbers",
    "text",
    "visit-link",
    "partnerships",
    "partnership_quest",
    "Optionscale(number)",
    "Optionscale(star)",
    "p.o.h",
]


REWARD_TYPES = [
    "xp",
    "role",
    "token",
    "custom",
    "token",
]

REWARD_DISTRIBUTION_TYPES = [
    "ALL",
    "FCFS",
    "RAFFLE",
    "VOTE ",
]


CONDITION_TYPES = [
    "Quest",
    "Followers",
    "Level",
    "Date",
]

ACCEPTED_RECURRENCE = [
    "None",
    "Daily",
    "Weekly",
    "Monthly",
]

ACCEPTED_COOLDOWN = [
    "None",
    "1 minutes",
    "5 minutes",
    "15 minutes",
    "30 minutes",
    "1 hour",
    "1 Week",
    "1 Monthly",
    "no retry",
]




VOCABULARY = [


    "user", "users",
    "member", "members",
    "player", "players",

    "quest", "quests",
    "best", "top", "worst", "lowest",
    "popular", "performance", "result",
    "fail", "failure", "problem",
    "hardest", "easiest", "difficulty",
    "task", "tasks",
    "most", "least",
    "attempt", "attempts",

    # PLATFORM WORDS
    "owner", "owns",
    "founder", "creator",
    "ceo", "admin",
    "platform", "website",
    "site", "app",
    "contact", "email",
    "name", "called",

    # ⭐ LOCATION WORDS (ADD THESE)
    "country",
    "countries",
    "location",
    "located",
    "where",
    "from",
    "members",
    "people",
    "community"
]




GREETING_WORDS = {
    "hi", "hello", "hey", "yo", "sup",
    "morning", "afternoon", "evening",
    "good", "gm", "gn"
}

INTENT_WORDS = {
    "best", "top", "worst", "lowest",
    "popular", "most", "least",
    "performance", "result", "why",
    "hardest", "easiest", "difficulty",
    "fail", "failure", "problem",
    "quest", "quests", "task", "tasks"
}


def scrape_website_text(url):

    try:
        r = requests.get(url, timeout=5)
        soup = BeautifulSoup(r.text, "html.parser")

        paragraphs = soup.find_all("p")

        text = " ".join(p.get_text() for p in paragraphs[:5])

        return text[:500]

    except Exception:
        return None
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote


def google_search_links(query, limit=3):
    try:
        url = f"https://www.google.com/search?q={quote(query)}"
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        r = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(r.text, "html.parser")

        links = []
        for a in soup.select("a"):
            href = a.get("href")
            if href and "/url?q=" in href:
                link = href.split("/url?q=")[1].split("&")[0]
                if "http" in link:
                    links.append(link)

        return links[:limit]

    except Exception:
        return []


def is_create_quest_request(text: str) -> bool:

    t = text.lower()

    create_words = [
        "create",
        "make",
        "add",
        "build",
        "start",
        "design",
        "generate",
        "setup",
        "set up",
        "launch"
    ]

    return (
        any(w in t for w in create_words)
        and "quest" in t
    )




def enrich_with_google(text: str) -> str:

    query = text + " community campaign quest tasks"

    links = google_search_links(query)

    combined = ""

    for link in links:
        content = scrape_website_text(link)
        if content:
            combined += " " + content

    return combined.lower()



def detect_task_types(full_text: str):

    tasks = []

    if any(w in full_text for w in ["twitter", "follow", "retweet", "like tweet"]):
        tasks.append("twitter")

    if any(w in full_text for w in ["discord", "join server"]):
        tasks.append("discord")

    if any(w in full_text for w in ["telegram"]):
        tasks.append("telegram")

    if any(w in full_text for w in ["youtube", "subscribe", "watch"]):
        tasks.append("youtube")

    if any(w in full_text for w in ["quiz", "question"]):
        tasks.append("quiz")

    if any(w in full_text for w in ["poll", "vote"]):
        tasks.append("poll")

    if any(w in full_text for w in ["visit", "website", "link"]):
        tasks.append("visit-link")

    if not tasks:
        tasks.append("text")  # fallback

    return tasks




def detect_reward(full_text: str):

    if "token" in full_text:
        return "token"

    if "role" in full_text:
        return "role"

    return DEFAULT_REWARD_TYPE

def detect_recurrence(full_text: str):

    for r in ACCEPTED_RECURRENCE:
        if r.lower() in full_text:
            return r

    return DEFAULT_RECURRENCE



def extract_quest_name(text: str):

    text = text.lower()

    # remove common prefixes
    prefixes = [
        "create quest",
        "make quest",
        "add quest",
        "build quest",
        "start quest",
        "generate quest",
        "setup quest",
        "set up quest",
        "launch quest",
    ]

    for p in prefixes:
        if p in text:
            name = text.replace(p, "").strip()
            if name:
                return name.title()

    return None



TASK_TITLE_MAP = {
    "discord": "Join Discord",
    "telegram": "Join Telegram",
    "twitter": "Follow on Twitter",
    "youtube": "Watch YouTube Video",
    "quiz": "Complete Quiz",
    "poll": "Vote in Poll",
    "visit-link": "Visit Website",
    "text": "Complete Task"
}


def generate_description_from_google(text: str) -> str:
    """
    Uses Google search results to build a smart quest description.
    ONLY DESCRIPTION — nothing else.
    """

    query = text + " community campaign tutorial how to participate"

    links = google_search_links(query)

    combined = ""

    for link in links:
        content = scrape_website_text(link)
        if content:
            combined += " " + content

    combined = combined.strip()

    # fallback if google returns nothing
    if not combined:
        return (
            "Complete the required actions to participate in this quest. "
            "Follow the instructions carefully and submit proof if required. "
            "Rewards will be granted after successful validation."
        )

    # clean + shorten
    combined = combined[:600]

    return combined



def save_pending_creation(conversation, text):
    conversation.object_type = "quest_creation"
    conversation.metadata_json = {
        "pending_text": text
    }
    db.session.commit()


def get_pending_creation(conversation):
    if conversation.object_type == "quest_creation":
        return (conversation.metadata_json or {}).get("pending_text")
    return None


def clear_pending_creation(conversation):
    conversation.object_type = None
    conversation.metadata_json = None
    db.session.commit()


def create_quest_from_text(community, current_user, text, custom_description=None):

    task_types = detect_task_types(text)

    primary_task = task_types[0] if task_types else None

    name = TASK_TITLE_MAP.get(primary_task)

    if not name:
        name = extract_quest_name(text) or "AI Generated Quest"

    # ⭐ DESCRIPTION SOURCE
    if custom_description:
        description = custom_description
    else:
        description = generate_description_from_google(text)

    # --------------------------------
    # QUEST CONTAINER
    # --------------------------------
    quest = (
        db.session.query(Quest)
        .filter_by(community_id=community.id)
        .first()
    )

    if not quest:
        quest = Quest(
            title="AI Campaign",
            description="Auto created campaign",
            community_id=community.id,
            creator_id=current_user.id
        )
        db.session.add(quest)
        db.session.flush()

    # --------------------------------
    # SUBQUEST
    # --------------------------------
    subquest = Subquest(
        name=name,
        description=description,
        quest_id=quest.id,
        recurrence=detect_recurrence(text),
        created_at=datetime.utcnow(),
    )

    db.session.add(subquest)
    db.session.flush()

    # --------------------------------
    # TASKS
    # --------------------------------
    for t in task_types:
        task = Task(
            type=t,
            subquest_id=subquest.id,
            config={}
        )
        db.session.add(task)

    # --------------------------------
    # REWARD
    # --------------------------------
    reward = SubquestReward(
        subquest_id=subquest.id,
        reward_type=DEFAULT_REWARD_TYPE,
        distribution_type="ALL",
        reward_data=json.dumps({"xp": DEFAULT_XP})
    )

    db.session.add(reward)

    db.session.commit()

    return subquest


def ai_agent_reply(community, current_user, conversation, message: str):

    text = normalize_text(message.lower().strip())
    words = text.split()
    raw_text = message.lower().strip()

    # 🚀 CREATION FIRST (BEFORE NORMALIZATION)
    pending_text = get_pending_creation(conversation)

    if pending_text:

        # ---------- USER WANTS AUTO DESCRIPTION ----------
        if "generate description" in text:

            subquest = create_quest_from_text(
                community,
                current_user,
                pending_text
            )

            clear_pending_creation(conversation)

            admin_url = f"/{community.slug}/quest/admin/{subquest.quest.uuid}/{subquest.uuid}"

            return (
                f"✅ Quest draft created successfully.\n\n"
                f"Name: {subquest.name}\n"
                f"Default Reward: {DEFAULT_XP} XP\n\n"
                f"You can edit it here:\n{admin_url}"
            )

        # ---------- USER PROVIDED CUSTOM DESCRIPTION ----------
        else:

            subquest = create_quest_from_text(
                community,
                current_user,
                pending_text,
                custom_description=message
            )

            clear_pending_creation(conversation)

            admin_url = f"/{community.slug}/quest/admin/{subquest.quest.uuid}/{subquest.uuid}"

            return (
                f"✅ Quest draft created successfully.\n\n"
                f"Name: {subquest.name}\n"
                f"Default Reward: {DEFAULT_XP} XP\n\n"
                f"You can edit it here:\n{admin_url}"
            )

    # =====================================================
    # 🚀 STEP 2 — NEW CREATE REQUEST
    # =====================================================
    if is_create_quest_request(text):

        save_pending_creation(conversation, text)

        return (
            "What is this quest about?\n\n"
            "You can:\n"
            "• Describe it yourself\n"
            "• Or say: generate description"
        )
  
    username = current_user.username if current_user else "there"
    username = username.capitalize()

    greeting_present = has_greeting(words)


    # ================= PURE GREETING =================
    if is_pure_greeting(words):
        return (
            f"Hi 👋 {username}\n"
            f"I'm your AI assistant for {community.name}.\n"
            "Ask me about this community or quest performance."
        )

    # =====================================================
    # 🔥 PLATFORM OWNER QUESTIONS (GLOBAL)
    # =====================================================
    if is_platform_owner_question(text) and not any(
        w in words for w in ["community", community.name.lower()]
    ):
        answer = generate_platform_owner_response(text)

        if greeting_present:
            greeting_text = get_time_greeting()
            return f"{greeting_text} {username} 👋\n\n{answer}"

        return answer
        
                
    if (
        "country" in words
        or "location" in words
        or "where" in words
        or "most" in words
        or is_location_distribution_question(text)
    ):

        # ---------- BLOCK INDIVIDUAL ----------
        if is_individual_location_question(text):
            return generate_privacy_location_response()

    # =====================================================
    # 👤 USER PERFORMANCE ANALYTICS
    # =====================================================

    if any(w in words for w in ["user", "member", "users", "members"]):

        # highest success rate
        if (
            "success" in words
            or "rate" in words
        ) and any(w in words for w in ["most", "highest", "best", "success rate", "performing"]):

            return generate_best_user_response(community)

        # most failures
        if any(w in words for w in ["fail", "failed", "failure", "worst", "fails", "lowest"]):

            return generate_worst_user_response(community)



            
    # =====================================================
    # 🔥 QUEST COUNT QUESTIONS (SMART)
    # =====================================================
    if (
        "how many" in text
        or "number of" in text
        or "total" in words
        or "count" in words
    ):

        if (
            "how many" in text
            or "number of" in text
            or "total" in words
            or "count" in words
        ):

            if "quest" in words or "quests" in words:

                active, draft, total = get_subquest_counts(community.id)

                # ---------- SPECIFIC ACTIVE ----------
                if "active" in words:
                    answer = f"You currently have {active} active quests in this community."

                # ---------- SPECIFIC PUBLISHED ----------
                elif "published" in words or "live" in words:
                    answer = f"You currently have {active} published quests in this community."

                # ---------- SPECIFIC DRAFT ----------
                elif "draft" in words:
                    answer = f"You currently have {draft} draft quests in this community."

                # ---------- SPECIFIC INACTIVE ----------
                elif "inactive" in words:
                    answer = f"You currently have {draft} inactive quests in this community."

                # ---------- SPECIFIC TOTAL ----------
                elif "total" in words or "all" in words:
                    answer = f"You currently have {total} quests in total."

                # ---------- GENERAL OVERVIEW ----------
                else:
                    answer = (
                        f"📊 Quest Overview:\n\n"
                        f"Active Quests: {active}\n"
                        f"Draft Quests: {draft}\n"
                        f"Total Quests: {total}"
                    )

                if greeting_present:
                    greeting_text = get_time_greeting()
                    return f"{greeting_text} {username} 👋\n\n{answer}"

                return answer


    # =====================================================
    # 🔥 SUBQUEST DETECTION FIRST (CRITICAL FIX)
    # =====================================================


    # ================= FLAGS =================
    quest_words = {"quest", "quests", "task", "tasks"}
    difficulty_words = {"hardest", "easiest", "difficulty"}
    best_words = {"best", "top", "performing"}
    worst_words = {"worst", "lowest", "bad"}
    failure_words = {"fail", "failure", "problem", "issue"}

    has_quest_context_flag = any(w in words for w in quest_words)

    answer = None

    # =====================================================
    # QUEST ANALYTICS (GENERIC)
    # =====================================================
    if has_quest_context_flag:

        if any(w in words for w in best_words):
            n = infer_limit(text)
            answer = generate_top_best_response(community, n)

        elif any(w in words for w in worst_words):
            n = infer_limit(text)
            answer = generate_worst_response(community, n)

        elif (
            ("popular" in words) or
            ("most" in words and "attempt" in words)
        ):
            n = infer_limit(text)
            answer = generate_popular_response(community, n)

        elif any(w in words for w in difficulty_words):
            answer = generate_difficulty_response(community)

        elif any(w in words for w in failure_words):
            answer = generate_failure_task_response(community)

    subquest, suggestion = find_matching_subquest(community.id, text)

    # =====================================================
    # COMMUNITY INFO
    # =====================================================
    if not answer and not has_quest_context_flag:

        if (
            "name" in words
            or "called" in words
            or "about" in words
            or "information" in words
            or "blockchain" in words
            or "website" in words
            or "site" in words
            or "link" in words
            or "url" in words
            or is_founder_question(text)
            or "owner" in words
            or "creator" in words
            or "owns" in words
            or "created" in words
        ):
            answer = generate_community_response(community, text, words)
    # -------------------------------------------------
    # QUEST NAME MENTIONED BUT NOT FOUND
    # -------------------------------------------------
    if not subquest and "quest" in words and not answer:

        admin_url = f"/{community.slug}/quest/admin"

        if suggestion:
            return (
                "I couldn’t find a quest with that name.\n\n"
                f"Did you mean: '{suggestion.name}'?\n\n"
                "You can verify the exact quest name here:\n"
                f"{admin_url}"
            )

        return (
            "I couldn’t find a quest with that name.\n\n"
            "It may be misspelled or formatted incorrectly.\n"
            "Please verify the exact quest name here:\n"
            f"{admin_url}"
        )

    if subquest:
        if subquest.is_draft:
            answer = (
                f"The quest '{subquest.name}' has not been published yet.\n\n"
                "Because it is still in draft mode, there is no user activity or "
                "performance analytics available.\n\n"
                "Once the quest is published and users begin participating, "
                "I will be able to provide insights such as completion rate, "
                "engagement levels, and performance analysis."
            )

            if greeting_present:
                greeting_text = get_time_greeting()
                return f"{greeting_text} {username} 👋\n\n{answer}"

            return answer
        stats = get_subquest_attempt_stats(subquest.id)
        attempts = stats["total_attempts"]
        success = stats["total_success"]

        success_rate = (success / attempts * 100) if attempts > 0 else 0

        # ================= WHY NOT DOING WELL =================
        if "why" in words and any(w in words for w in ["not", "bad", "poor", "worst"]):

            if attempts == 0:

                # NEW LOGIC ⭐
                if subquest.created_at and (datetime.utcnow() - subquest.created_at).total_seconds() < 3600:
                    reason = "It appears to be very new, so performance data has not accumulated yet."
                else:
                    reason = "Users may not be discovering it yet, or visibility may be low."

                answer = (
                    f"'{subquest.name}' currently has no recorded user attempts.\n\n"
                    "This means performance cannot be evaluated yet.\n"
                    f"{reason}"
                )


            elif success_rate >= 70:
                answer = (
                    f"Actually, this quest is performing well with a {success_rate:.1f}% completion rate.\n\n"
                    "Users who start it are mostly able to finish successfully, which suggests "
                    "the steps and instructions are clear."
                )

            else:
                analysis = analyze_quest_performance(subquest, success_rate, attempts)
                answer = analysis

        # ================= WHY DOING WELL =================
        elif "why" in words and any(w in words for w in ["good", "well", "best"]):

            if attempts == 0:

                # NEW LOGIC ⭐
                if subquest.created_at and (datetime.utcnow() - subquest.created_at).total_seconds() < 3600:
                    reason = "It appears to be very new, so performance data has not accumulated yet."
                else:
                    reason = "Users may not have discovered it yet, or participation is still low."

                answer = (
                    f"'{subquest.name}' currently has no recorded user attempts.\n\n"
                    "This means performance cannot be evaluated yet.\n"
                    f"{reason}"
                )

            elif attempts < 5:
                answer = (
                    f"'{subquest.name}' has very limited data so far ({attempts} attempts).\n\n"
                    "With such a small sample size, it is too early to determine whether "
                    "it is performing well or not. More user activity is needed for reliable insights."
                )

            else:
                analysis = analyze_quest_performance(subquest, success_rate, attempts)
                answer = analysis

        else:
            answer = generate_quest_result_response(subquest)

        if greeting_present:
            greeting_text = get_time_greeting()
            return f"{greeting_text} {username} 👋\n\n{answer}"

        return answer


    # =====================================================
    # FALLBACK
    # =====================================================
    if not answer:
        answer = (
            f"I can help with community insights and analytics, {username}.\n\n"
            "Try asking things like:\n"
            "• How is [quest name] performing?\n"
            "• Top or worst performing quests\n"
            "• Insight why a quest isn't performing well\n"
            "• Which quest is hardest\n"
            "• Which task causes failures\n"
            "• How many quests are active\n"
            "• Best or worst performing users\n"
            "• Where are users from\n"
            "• Community information or owner\n"
        )

    # =====================================================
    # GREETING PREFIX
    # =====================================================
    if greeting_present:
        greeting_text = get_time_greeting()
        return f"{greeting_text} {username} 👋\n\n{answer}"

    return answer



    