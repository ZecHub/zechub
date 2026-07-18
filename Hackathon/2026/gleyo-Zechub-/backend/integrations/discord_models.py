from backend.utils.instance import db
from datetime import datetime

class DiscordGuild(db.Model):
    __tablename__ = 'discord_guilds'
    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)

    guild_id = db.Column(db.String(64), unique=True, nullable=False)  # Discord server ID
    guild_name = db.Column(db.String(255), nullable=False)
    icon_url = db.Column(db.String(500))  # optional guild icon
    owner_id = db.Column(db.String(64))   # Discord user ID of server owner
    permissions = db.Column(db.String(64))  # store as string/bitfield if needed
    member_count = db.Column(db.Integer, default=0)
    member_count_updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    bot_joined = db.Column(db.Boolean, default=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    removed_at = db.Column(db.DateTime, nullable=True)   
    discord_channel_id = db.Column(db.String(64), nullable=True)   
    discord_role_id = db.Column(db.String(64), nullable=True) 
    # Relationship back to Community
    community = db.relationship("Community", back_populates="discord_guild")

    def __repr__(self):
        return f"<DiscordGuild {self.guild_name} ({self.guild_id})>"
  