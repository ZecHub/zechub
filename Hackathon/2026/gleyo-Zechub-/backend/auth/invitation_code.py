import string
import random
from backend.utils.instance import db

def generate_invite_code(length=22):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))


class InvitationCode(db.Model):
    __tablename__ = "invitation_codes"
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id', ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("Users", back_populates="invitation_codes", lazy=True)
    community = db.relationship("Community", back_populates="invitation_codes", lazy=True)

    def __init__(self, user_id, community_id, length=22):
        self.user_id = user_id
        self.community_id = community_id
        self.code = self.generate_unique_code(length)

    def generate_unique_code(self, length):
        while True:
            code = generate_invite_code(length)
            if not InvitationCode.query.filter_by(code=code).first():
                return code

    def __repr__(self):
        return f"<InvitationCode {self.code} for User {self.user_id} in Community {self.community_id}>"
