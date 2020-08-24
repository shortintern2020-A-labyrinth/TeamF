# shintaro ichikawa
from app.database import db


class TravelDetail(db.Model):
  __tablename__ = 'travel_details'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  travel_notes_id = db.Column(db.Integer, db.ForeignKey(
      'travel_notes.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  place = db.Column(db.String(50))
  description = db.Column(db.Text)
  hotel_no = db.Column(db.Integer)
  lat = db.Column(db.Float)
  lng = db.Column(db.Float)
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  travel_detail = db.relationship('TravelDetailImage', backref='travel_details', cascade="all")


  def __init__(self, travel_notes_id, created_by, modified_by, place=None, description=None, hotel_no=None, lat=None, lng=None):
    self.travel_notes_id = travel_notes_id
    self.created_by = created_by
    self.modified_by = modified_by
    self.place = place
    self.description = description
    self.hotel_no = hotel_no
    self.lat = lat
    self.lng = lng