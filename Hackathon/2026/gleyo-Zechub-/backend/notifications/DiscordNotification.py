from backend.utils.instance import db
from datetime import datetime
class DiscordNotificationSetting(db.Model):
    __tablename__ = "discord_notification_settings"

    id = db.Column(db.Integer, primary_key=True)
    guild_id = db.Column(db.Integer, db.ForeignKey('discord_guilds.id'), nullable=False)  
    type = db.Column(db.String(64), nullable=False)  # e.g., "pending_review"
    channel_id = db.Column(db.String(64), nullable=True)
    role_id = db.Column(db.String(64), nullable=True)

    guild = db.relationship("DiscordGuild", backref="notification_settings")

