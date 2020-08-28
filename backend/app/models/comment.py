# shintaro ichikawa
from ..database import db

from datetime import datetime, timedelta, timezone

class Comment(db.Model):
  __tablename__ = 'comments'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  travel_notes_id = db.Column(db.Integer, db.ForeignKey(
      'travel_notes.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(
      'users.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  body = db.Column(db.String(4095), nullable=False)
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default="2020-08-01", server_onupdate="2020-08-01", nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default="2020-08-01", server_onupdate="2020-08-01", nullable=False)
  comment_likes = db.relationship('CommentLike', backref='comments', cascade="all")

  def __init__(self, user_id, travel_notes_id, body, created_by, modified_by):
    self.user_id = user_id
    self.travel_notes_id = travel_notes_id
    self.body = body
    self.created_by = created_by
    self.modified_by = modified_by
    JST = timezone(timedelta(hours=+9), 'JST')
    self.created_date = datetime.now(JST).strftime('%Y-%m-%d %H:%M:%S')
    self.modified_date = datetime.now(JST).strftime('%Y-%m-%d %H:%M:%S')