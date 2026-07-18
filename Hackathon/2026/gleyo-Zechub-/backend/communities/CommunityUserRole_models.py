from backend.utils.instance import db
from datetime import datetime
class CommunityUserRole(db.Model):
    __tablename__ = 'community_user_roles'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )

    community_id = db.Column(
        db.Integer,
        db.ForeignKey('communities.id', ondelete='CASCADE'),
        nullable=False
    )


    role = db.Column(
        db.String(20),
        nullable=False,
        default='member'
    )

    banned = db.Column(db.Boolean, default=False, nullable=False)

    joined_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    user = db.relationship('Users', back_populates='roles')
    community = db.relationship('Community', back_populates='user_roles')

    __table_args__ = (
        db.UniqueConstraint(
            'user_id',
            'community_id',
            name='uq_user_community_core_role'
        ),
    )

    def __repr__(self):
        return f"<{self.role.title()} - User {self.user_id} in Community {self.community_id}>"



class CommunityMembershipEvent(db.Model):
    __tablename__ = "community_membership_events"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), index=True)
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), index=True)

    event_type = db.Column(db.String(20), index=True)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )




class CommunityRoleStyle(db.Model):
    __tablename__ = "community_role_styles"

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey("communities.id", ondelete="CASCADE"),
        nullable=False
    )


    role_key = db.Column(db.String(20), nullable=True)


    extra_role_id = db.Column(
        db.Integer,
        db.ForeignKey("community_extra_roles.id", ondelete="CASCADE"),
        nullable=True
    )

    color = db.Column(db.String(7), nullable=False) 

    community = db.relationship("Community")
    extra_role = db.relationship("CommunityExtraRole")

    __table_args__ = (
        db.CheckConstraint(
            "(role_key IS NOT NULL AND extra_role_id IS NULL) OR "
            "(role_key IS NULL AND extra_role_id IS NOT NULL)",
            name="ck_role_style_one_source"
        ),
        db.UniqueConstraint(
            "community_id",
            "role_key",
            name="uq_community_core_role_style"
        ),
        db.UniqueConstraint(
            "community_id",
            "extra_role_id",
            name="uq_community_extra_role_style"
        ),
    )

    def __repr__(self):
        return f"<RoleStyle {self.role_key or self.extra_role_id} in Community {self.community_id}>"




class CommunityExtraRole(db.Model):
    __tablename__ = 'community_extra_roles'

    id = db.Column(db.Integer, primary_key=True)

    community_id = db.Column(
        db.Integer,
        db.ForeignKey('communities.id'),
        nullable=False
    )

    # role key (unique per community)
    name = db.Column(db.String(50), nullable=False)

    description = db.Column(db.String(255))

    created_by_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False
    )

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    community = db.relationship('Community', back_populates='extra_role_definitions')
    created_by = db.relationship('Users')

    __table_args__ = (
        db.UniqueConstraint(
            'community_id',
            'name',
            name='uq_community_extra_role_name'
        ),
    )

    def __repr__(self):
        return f"<ExtraRole {self.name} in Community {self.community_id}>"






class CommunityUserExtraRole(db.Model):
    __tablename__ = 'community_user_extra_roles'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )

    community_id = db.Column(
        db.Integer,
        db.ForeignKey('communities.id', ondelete='CASCADE'),
        nullable=False
    )

    extra_role_id = db.Column(
        db.Integer,
        db.ForeignKey('community_extra_roles.id', ondelete='CASCADE'),
        nullable=False
    )

    granted_by_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False
    )

    granted_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # 🔑 EXPLICIT FK MAPPING (THIS FIXES YOUR ERROR)
    user = db.relationship(
        'Users',
        foreign_keys=[user_id],
        back_populates='extra_roles'
    )

    granted_by = db.relationship(
        'Users',
        foreign_keys=[granted_by_id]
    )

    community = db.relationship(
        'Community',
        back_populates='extra_roles'
    )

    role = db.relationship('CommunityExtraRole')

    __table_args__ = (
        db.UniqueConstraint(
            'user_id',
            'community_id',
            'extra_role_id',
            name='uq_user_extra_role_once'
        ),
    )


