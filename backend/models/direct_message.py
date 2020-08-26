# shintaro ichikawa
from app.database import db


class DirectMessage(db.Model):
  __tablename__ = 'direct_messages'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  sender_id = db.Column(db.Integer, db.ForeignKey(
      'users.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  receiver_id = db.Column(db.Integer, db.ForeignKey(
      'users.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  body = db.Column(db.String(255), nullable=False)
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)

  def __init__(self, sender_id, receiver_id, body, created_by, modified_by):
    self.sender_id = sender_id
    self.receiver_id = receiver_id
    self.body = body
    self.created_by = created_by
    self.modified_by = modified_by