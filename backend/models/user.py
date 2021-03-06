# shintaro ichikawa
from app.database import db


class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  provider = db.Column(db.String(10), nullable=False)
  email = db.Column(db.String(255), unique=True)
  password = db.Column(db.String(255), nullable=False)
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
  travel_notes = db.relationship('TravelNote', backref='users', cascade="all")
  travel_likes = db.relationship('TravelLike', backref='users', cascade="all")
  comments = db.relationship('Comment', backref='users', cascade="all")
  comment_likes = db.relationship('CommentLike', backref='users', cascade="all")
  # direct_messages = db.relationship('DirectMessage', backref='users', cascade="all")

  def __init__(self, provider, password, user_name, created_by, modified_by, email=None):
    self.provider = provider
    self.password = password
    self.user_name = user_name
    self.created_by = created_by
    self.modified_by = modified_by
    self.email = email