from backend.communities.community_models import ReviewNotification
from backend.utils.instance import db


def increment_review_notification(community_id):
    notif = ReviewNotification.query.filter_by(
        community_id=community_id
    ).first()

    if not notif:
        notif = ReviewNotification(
            community_id=community_id,
            pending_count=1
        )
        db.session.add(notif)
    else:
        notif.pending_count += 1

    # 🚀 no commit here (important)