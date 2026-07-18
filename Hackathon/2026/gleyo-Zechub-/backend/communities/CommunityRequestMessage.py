from datetime import datetime
from backend.utils.instance import db
from sqlalchemy.dialects.sqlite import JSON


class CommunityRequestMessage(db.Model):
    __tablename__ = "community_request_messages"

    id = db.Column(db.Integer, primary_key=True)
    request_id = db.Column(db.Integer, db.ForeignKey("community_requests.id"), nullable=False)
    sender_community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
    recipient_community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
    reply_to = db.Column(db.Integer, db.ForeignKey("community_request_messages.id"), nullable=True)
    reply = db.relationship("CommunityRequestMessage", remote_side=[id], backref="replies", passive_deletes=True)
    content = db.Column(JSON, nullable=True)  
    message = db.Column(db.Text, nullable=True)
    waveform_heights = db.Column(JSON, nullable=True)
    message_type = db.Column(db.String(20), default="text")  # text, image, audio, mixed

    is_read = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)
    is_deleted_for_sender = db.Column(db.Boolean, default=False)   
    is_deleted_for_recipient = db.Column(db.Boolean, default=False) # delete only for recipient
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    edited_at = db.Column(db.DateTime, nullable=True)
    is_forwarded = db.Column(db.Boolean, default=False)
    recipient_online = db.Column(db.Boolean, default=False)
    sender_community = db.relationship("Community", foreign_keys=[sender_community_id])
    recipient_community = db.relationship("Community", foreign_keys=[recipient_community_id])
    request = db.relationship(
        "CommunityRequest",
        backref=db.backref("messages", lazy="dynamic", order_by="CommunityRequestMessage.created_at", cascade="all, delete-orphan")
    )

    def __repr__(self):
        return f"<Message {self.id} type={self.message_type} from={self.sender_community_id} to={self.recipient_community_id}>"

