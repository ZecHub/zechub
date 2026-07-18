import random
import string
from datetime import datetime, timedelta
from backend.utils.instance import db

def generate_invite_code(length=22):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))


class LimitedCode(db.Model):
    __tablename__ = "limited_codes"

    id = db.Column(db.Integer, primary_key=True)

    code = db.Column(db.String(32), unique=True, nullable=False, default=generate_invite_code)
    role = db.Column(db.String(50), nullable=False, default="Member")
    inviter_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    inviter_username = db.Column(db.String(100), nullable=True)
    emails = db.Column(db.Text, nullable=True)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id", ondelete="CASCADE"), nullable=False)
    community = db.relationship("Community", back_populates="limited_codes")

    max_uses = db.Column(db.Integer, default=1)
    used_count = db.Column(db.Integer, default=0)

    expires_at = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    @property
    def is_valid(self):
        """Check if the code is still valid."""
        if self.expires_at and datetime.utcnow() > self.expires_at:
            return False
        if self.used_count >= self.max_uses:
            return False
        return True

    def use(self):
        """Mark the code as used once."""
        if not self.is_valid:
            raise ValueError("Code expired or max usage reached")
        self.used_count += 1
        db.session.commit()

    def __repr__(self):
        return f"<LimitedCode {self.code} for Community {self.community_id}>"
