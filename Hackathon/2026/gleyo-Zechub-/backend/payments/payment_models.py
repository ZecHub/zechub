from backend.utils.instance import db
from datetime import datetime, timedelta
from sqlalchemy import DateTime

class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    token = db.Column(db.String(20), nullable=False)
    network = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="pending")
    tx = db.Column(db.String(100), unique=True, nullable=True)
    timestamp = db.Column(db.Integer)
    note = db.Column(db.Text)
    paid_at = db.Column(DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    balance_before = db.Column(db.Float, nullable=False, default=0.0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)

    swap_status = db.Column(db.String(20), nullable=True)        
    swap_tx = db.Column(db.String(100), nullable=True)           
    swap_zec_amount = db.Column(db.Float, nullable=True)         

    user = db.relationship('Users', back_populates='payments')
    community = db.relationship('Community', back_populates='payments')

    def __repr__(self):
        return f"<Payment {self.id} | {self.amount} {self.token} on {self.network}>"