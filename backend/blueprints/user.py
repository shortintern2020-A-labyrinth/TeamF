# MakotoNaruse

from flask import jsonify, Blueprint
import logging
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.database import db
from app.models import *

import base64

user = Blueprint('user', __name__)
logger = logging.getLogger('app')

@user.route('/user/test')
def index():
  logger.warn('warn')
  logger.error('error')
  logger.critical('critical')
  return jsonify({
    "message": "user_test"
  })

@user.route('/user/<user_id>')
def user_detail(user_id):
  try:
    # join(TravelNote, User.id == TravelNote.user_id).join(TravelLike, TravelNote.id == TravelLike.travel_notes_id).
    user = db.session.query(User).filter(User.id == user_id).first()
    travel_countries = []
    travel_days = 0
    travel_counts = 0
    travel_notes = []
    travel_likes = 0
    for tn in user.travel_notes:
      travel_counts += 1
      travel_days += (tn.end_date - tn.start_date).days + 1
      likes = len(tn.travel_likes)
      travel_likes += likes
      if not tn.country in travel_countries:
        travel_countries.append(tn.country)
      obj = {
        "id": tn.id,
        "title": tn.title,
        "description": tn.description,
        "country": tn.country,
        "city": tn.city,
        "start_date": tn.start_date.strftime("%Y年%m月%d日"),
        "end_date": tn.end_date.strftime("%Y年%m月%d日"),
        "likes": likes
      }
      image_path = tn.image_path
      with open(image_path, "rb") as f:
        img_binary = f.read()
        b64_binary = base64.b64encode(img_binary)
        b64_string = b64_binary.decode('utf-8')
        obj["image"] = b64_string
      travel_notes.append(obj)
  except Exception as e:
    logger.warn(e)
    raise e
  return jsonify({
    "user_name": user.user_name,
    "travel_days": travel_days,
    "travel_counts": travel_counts,
    "travel_countries": len(travel_countries),
    "travel_likes": travel_likes,
    "travel_notes": travel_notes
  })

@user.route('/mypage')
@jwt_required
def mypage():
  try:
    # get user_name
    user_id = get_jwt_identity()
    # join(TravelNote, User.id == TravelNote.user_id).join(TravelLike, TravelNote.id == TravelLike.travel_notes_id).
    user = db.session.query(User).filter(User.id == user_id).first()
    travel_countries = []
    travel_days = 0
    travel_counts = 0
    travel_notes = []
    travel_likes = 0
    for tn in user.travel_notes:
      travel_counts += 1
      travel_days += (tn.end_date - tn.start_date).days + 1
      likes = len(tn.travel_likes)
      travel_likes += likes
      if not tn.country in travel_countries:
        travel_countries.append(tn.country)
      obj = {
        "id": tn.id,
        "title": tn.title,
        "description": tn.description,
        "country": tn.country,
        "city": tn.city,
        "start_date": tn.start_date.strftime("%Y年%m月%d日"),
        "end_date": tn.end_date.strftime("%Y年%m月%d日"),
        "likes": likes
      }
      image_path = tn.image_path
      with open(image_path, "rb") as f:
        img_binary = f.read()
        b64_binary = base64.b64encode(img_binary)
        b64_string = b64_binary.decode('utf-8')
        obj["image"] = b64_string
      travel_notes.append(obj)
  except Exception as e:
    logger.warn(e)
    raise e
  return jsonify({
    "travel_days": travel_days,
    "travel_counts": travel_counts,
    "travel_countries": len(travel_countries),
    "travel_likes": travel_likes,
    "travel_notes": travel_notes
  })