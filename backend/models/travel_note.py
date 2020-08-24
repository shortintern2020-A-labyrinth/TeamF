# shintaro ichikawa
from app.database import db


class TravelNote(db.Model):
  __tablename__ = 'travel_notes'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer, db.ForeignKey(
      'users.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text)
  image_path = db.Column(db.String(255), nullable=False)
  country = db.Column(db.String(50))
  city = db.Column(db.String(100))
  start_date = db.Column(db.Date)
  end_date = db.Column(db.Date)
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  travel_detail = db.relationship('TravelDetail', backref='travel_notes', cascade="all")
  travel_like = db.relationship('TravelLike', backref='travel_notes', cascade="all")
  comment = db.relationship('Comment', backref='travel_notes', cascade="all")

  def __init__(self, user_id, title, created_by, modified_by, description=None, country=None, city=None, start_date=None, end_date=None):
    self.user_id = user_id
    self.title = title
    self.created_by = created_by
    self.modified_by = modified_by
    self.description = description
    self.country = country
    self.city = city
    self.start_date = start_date
    self.end_date = end_date