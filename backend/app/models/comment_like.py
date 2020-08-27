# shintaro ichikawa
from ..database import db


class CommentLike(db.Model):
  __tablename__ = 'comment_likes'
  user_id = db.Column(db.Integer, db.ForeignKey(
      'users.id', ondelete="cascade", onupdate="cascade"), primary_key=True, nullable=False)
  comment_id = db.Column(db.Integer, db.ForeignKey(
      'comments.id', ondelete="cascade", onupdate="cascade"), primary_key=True, nullable=False)
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default="2020-08-01", server_onupdate="2020-08-01", nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default="2020-08-01", server_onupdate="2020-08-01", nullable=False)

  def __init__(self, user_id, comment_id, created_by, modified_by):
    self.user_id = user_id
    self.comment_id = comment_id
    self.created_by = created_by
    self.modified_by = modified_by