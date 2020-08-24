# shintaro ichikawa
from app.database import db


class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  provider = db.Column(db.Integer, nullable=False)
  email = db.Column(db.String(255), unique=True)
  token = db.Column(db.String(255), nullable=False)
  user_name = db.Column(db.String(50), nullable=False)
  travel_days = db.Column(db.Integer, nullable=False, server_default="0")
  travel_count = db.Column(db.Integer, nullable=False, server_default="0")
  travel_countries = db.Column(db.Integer, nullable=False, server_default="0")
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  travel_note = db.relationship('TravelNote', backref='users', cascade="all")
  travel_like = db.relationship('TravelLike', backref='users', cascade="all")
  comment = db.relationship('Comment', backref='users', cascade="all")
  comment_like = db.relationship('CommentLike', backref='users', cascade="all")
  direct_message = db.relationship('DirectMessage', backref='users', cascade="all")

  def __init__(self, provider, token, user_name, created_by, modified_by, email=None):
    self.provider = provider
    self.token = token
    self.user_name = user_name
    self.created_by = created_by
    self.modified_by = modified_by
    self.email = email