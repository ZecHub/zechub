from backend.utils.instance import db
import uuid
from sqlalchemy.sql import func
from datetime import datetime, timedelta
import random

class Subquest(db.Model):
    __tablename__ = "subquest"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.BigInteger, unique=True, nullable=False, index=True, default=lambda: Subquest.generate_public_id())
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    sprint_id = db.Column(
        db.Integer,
        db.ForeignKey('sprints.id', ondelete="SET NULL"),
        nullable=True
    )
    sprint_name = db.Column(db.String(255), nullable=True)

    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)

    quest_id = db.Column(db.Integer, db.ForeignKey("quest.id"), nullable=False)
    quest = db.relationship("Quest", back_populates="subquests")
    is_archive = db.Column(db.Boolean, nullable=False, default=False)

    streak_enabled = db.Column(db.Boolean, nullable=False, default=False)
    locked_zec_zatoshi = db.Column(db.BigInteger, default=0)
    tasks = db.relationship("Task", back_populates="subquest", cascade="all, delete")

    recurrence = db.Column(db.String(50), nullable=False, default="None")  
    cooldown = db.Column(db.String(50), nullable=False, default="None")
    max_claim = db.Column(db.Integer, nullable=True)
    claim_count = db.Column(db.Integer, nullable=True)
    autovalidation = db.Column(db.Boolean, nullable=False, default=False)
    add_to_sprint = db.Column(db.Boolean, nullable=False, default=False)
    has_rewards_before = db.Column(db.Boolean, default=False)


    is_draft = db.Column(db.Boolean, nullable=False, default=True)
    image_url = db.Column(db.String(255), nullable=True)

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    conditions = db.relationship("SubquestCondition", back_populates="subquest", cascade="all, delete")
    sprint = db.relationship("Sprint")
    rewards = db.relationship("SubquestReward", back_populates="subquest", cascade="all, delete")
    completions = db.relationship(
        "SubquestCompletion",
        back_populates="subquest",
        cascade="all, delete"
    )


    cooldowns = db.relationship(
        "SubquestCooldown",
        back_populates="subquest",
        cascade="all, delete"
    )


    @staticmethod
    def generate_public_id():
        """Generates a 12-digit unique number."""
        while True:
            num = random.randint(10**11, 10**12 - 1)  # 12-digit number
            if not Subquest.query.filter_by(public_id=num).first():
                return num
            
    @staticmethod
    def parse_cooldown(cooldown_str):
        if not cooldown_str or cooldown_str.lower() == "none":
            return None
        if cooldown_str.lower() == "no retry":
            return "no_retry"

        mapping = {
            "minutes": 60,
            "minute": 60,
            "hours": 3600,
            "hour": 3600,
            "week": 7 * 24 * 3600,
            "weeks": 7 * 24 * 3600,
            "month": 30 * 24 * 3600,
            "months": 30 * 24 * 3600,
        }

        parts = cooldown_str.split()
        if len(parts) == 2:
            num, unit = parts
            num = int(num)
            seconds = mapping.get(unit.lower(), 0) * num
            return timedelta(seconds=seconds)
        return None


    def __repr__(self):
        return f"<Subquest {self.name}>"



class SubquestRun(db.Model):
    __tablename__ = "subquest_run"

    id = db.Column(db.Integer, primary_key=True)

    subquest_id = db.Column(
        db.Integer,
        db.ForeignKey("subquest.id", ondelete="SET NULL"),  # ✅ KEY CHANGE
        nullable=True,  # ⚠️ must be nullable now
        index=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    started_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )

    finished_at = db.Column(
        db.DateTime,
        nullable=True,
        index=True
    )

    subquest = db.relationship("Subquest")
    user = db.relationship("Users")

    __table_args__ = (
        db.UniqueConstraint("subquest_id", "user_id", name="uq_subquest_user_run"),
    )


















