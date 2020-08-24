# shintaro ichikawa
from app.database import db


class TravelDetailImage(db.Model):
  __tablename__ = 'travel_detail_images'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  travel_detail_id = db.Column(db.Integer, db.ForeignKey(
      'travel_details.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  path = db.Column(db.String(255), nullable=False)
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp(), nullable=False)
  travel_detail = db.relationship('TravelDetail', backref='travel_details', cascade="all")

  def __init__(self, travel_detail_id, path, created_by, modified_by):
    self.travel_detail_id = travel_detail_id
    self.path = path
    self.created_by = created_by
    self.modified_by = modified_by