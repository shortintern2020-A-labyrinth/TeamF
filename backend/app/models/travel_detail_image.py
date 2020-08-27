# shintaro ichikawa
from ..database import db


class TravelDetailImage(db.Model):
  __tablename__ = 'travel_detail_images'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  travel_detail_id = db.Column(db.Integer, db.ForeignKey(
      'travel_details.id', ondelete="cascade", onupdate="cascade"), nullable=False)
  image = db.Column(db.Text, nullable=False)
  created_by = db.Column(db.String(255), nullable=False)
  created_date = db.Column(
      db.DateTime, server_default="2020-08-01", server_onupdate="2020-08-01", nullable=False)
  modified_by = db.Column(db.String(255), nullable=False)
  modified_date = db.Column(
      db.DateTime, server_default="2020-08-01", server_onupdate="2020-08-01", nullable=False)

  def __init__(self, travel_detail_id, image, created_by, modified_by):
    self.travel_detail_id = travel_detail_id
    self.image = image
    self.created_by = created_by
    self.modified_by = modified_by