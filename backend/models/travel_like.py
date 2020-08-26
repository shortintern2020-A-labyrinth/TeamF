# shintaro ichikawa
from app.database import db


class TravelLike(db.Model):
    __tablename__ = 'travel_likes'
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="cascade", onupdate="cascade"), primary_key=True, nullable=False)
    travel_notes_id = db.Column(db.Integer, db.ForeignKey(
        'travel_notes.id', ondelete="cascade", onupdate="cascade"), primary_key=True, nullable=False)
    created_by = db.Column(db.String(255), nullable=False)
    created_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
    modified_by = db.Column(db.String(255), nullable=False)
    modified_date = db.Column(
        db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)

    def __init__(self, user_id, travel_notes_id, created_by, modified_by):
        self.user_id = user_id
        self.travel_notes_id = travel_notes_id
        self.created_by = created_by
        self.modified_by = modified_by
