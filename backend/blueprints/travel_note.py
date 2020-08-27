# shintaro ichikawa

from app.database import db
from app.models import TravelNote, User, TravelDetail, TravelDetailImage, TravelLike
from flask import jsonify, Blueprint, request
import logging
from flask_jwt_extended import jwt_required, get_jwt_identity
import base64
import os
import glob
import shutil
import datetime

travel_note = Blueprint('travel_note', __name__)
logger = logging.getLogger('app')

tmp_dir = "./images/tmp"
images_dir = "./images"

@travel_note.route('/travel_note/test')
def index():
  logger.warn('warn')
  logger.error('error')
  logger.critical('critical')
  return jsonify({
      "message": "travel_note_test"
  })


def get_image_from_b64(b64_string):
  [header, body] = b64_string.split(',')
  [head, _] = header.split(';')
  [_, types_extention] = head.split(':')
  [types, extention] = types_extention.split('/')
  return body, types, extention


def save_image(b64_string, file_name):
  with open(file_name, "wb") as f:
      f.write(base64.decodebytes(str.encode(b64_string)))

def load_image(path):
  extention = path.split('.', 1)[1]
  ret = f"data:image/{extention};base64,"
  with open(path, "rb") as f:
    img_binary = f.read()
    b64_binary = base64.b64encode(img_binary)
    b64_string = b64_binary.decode('utf-8')
    ret += b64_string
  return ret

def move_image():
  tmp = f"{tmp_dir}/*"
  files = glob.glob(tmp)
  for f in files:
    shutil.move(f, images_dir)


def insert_travel_details(travel_note_id, user_id, user_name, travel_details):
  #insert_travel_details
  travel_details_to_insert = []
  for travel_detail in travel_details:
    place = travel_detail.get("place", None)
    lat = travel_detail.get("lat", None)
    lng = travel_detail.get("lng", None)
    description = travel_detail.get("description", None)
    hotel_no = travel_detail.get("hotel_no", None)
    travel_details_to_insert.append(TravelDetail(
      travel_note_id, user_name, user_name, place, description, hotel_no, lat, lng))

  try:
    db.session.add_all(travel_details_to_insert)
    db.session.flush()
  except Exception as e:
    logger.warn(e)
    raise e

  #save images
  try:
    for i in range(len(travel_details_to_insert)):
      images = travel_details[i].get("images", [])
      insert_travel_images(
          travel_details_to_insert[i].id, user_name, images)
  except Exception as e:
    logger.warn(e)
    raise e


def insert_travel_images(travel_detail_id, user_name, travel_images):
  #insert travel_images and save images to disk
  travel_images_to_insert = []
  for i in range(len(travel_images)):
    b64_string, _, extention = get_image_from_b64(travel_images[i])
    tmp_path = f"{tmp_dir}/detail_{travel_detail_id}_{i}.{extention}"
    img_path = f"{images_dir}/detail_{travel_detail_id}_{i}.{extention}"
    travel_images_to_insert.append(TravelDetailImage(
      travel_detail_id, img_path, user_name, user_name))
    try:
      save_image(b64_string, tmp_path)
    except Exception as e:
      logger.warn(e)
      raise e

  try:
    db.session.add_all(travel_images_to_insert)
    db.session.flush()
  except Exception as e:
    logger.warn(e)
    raise e

def validate_travel_details(travel_details):
  for travel_detail in travel_details:
    images = travel_detail.get("images", [])
    for image in images:
      b64_string, types, extention = get_image_from_b64(image)
      if types != "image":
        return False
  
  return True


@travel_note.route('/travel_note/create', methods=["POST"])
@jwt_required
def create():
  if request.json is None:
    return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "Please send json format"}), 400

  if "title" not in request.json:
    return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400
  if "image" not in request.json:
    return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400
  if "start_date" not in request.json or "end_date" not in request.json:
    return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400

  b64_string, types, extention = get_image_from_b64(request.json["image"])
  if types != "image":
    return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400

  # get_parameters
  title = request.json["title"]
  image = request.json["image"]
  start_date_unix = request.json["start_date"]
  end_date_unix = request.json["end_date"]
  description = request.json.get("description", "")
  country = request.json.get("country", None)
  city = request.json.get("city", None)

  travel_details = request.json.get("travel_details", [])

  if not validate_travel_details(travel_details):
    return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400    

  start_datetime = datetime.datetime.fromtimestamp(start_date_unix)
  start_date = start_datetime.date()
  end_datetime = datetime.datetime.fromtimestamp(end_date_unix)
  end_date = end_datetime.date()

  if start_date > end_date:
    return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400    

  # get user_name
  user_id = get_jwt_identity()
  try:
    (user_name,) = User.query.with_entities(
        User.user_name).filter(User.id == user_id).one()
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "travel_note/create", "status": "internal_server_error", "message": "Internal server error"}), 500

  #insert TravelNote
  image_path = ""
  travel_note = TravelNote(user_id, title, image_path, user_name, user_name,
                            description, country, city, start_date, end_date)

  if os.path.exists(tmp_dir):
    shutil.rmtree(tmp_dir)
  os.mkdir(tmp_dir)

  try:
    db.session.add(travel_note)
    db.session.flush()
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "travel_note/create", "status": "internal_server_error", "message": "Internal server error"}), 500

  #save thumbnail
  b64_string, _, extention = get_image_from_b64(image)
  tmp_path = f"{tmp_dir}/thumbnail_{travel_note.id}.{extention}"
  image_path = f"{images_dir}/thumbnail_{travel_note.id}.{extention}"
  try:
    save_image(b64_string, tmp_path)
    travel_note.image_path = image_path
    #insert travel_details
    insert_travel_details(travel_note.id, user_id,
                          user_name, travel_details)
    db.session.commit()
    # for test: ファイルが存在するなら変えない
    if os.path.exists(image_path):
      os.remove(tmp_path)
    else:
      move_image()
  except Exception as e:
    logger.warn(e)
    db.session.rollback()
    return jsonify({"mode": "travel_note/create", "status": "internal_server_error", "message": "Internal server error"}), 500
  finally:
    db.session.close()

  return jsonify({"mode": "travel_note/create", "status": "ok", "message": "Successfully created"}), 201

@travel_note.route('/travel_note/<travel_note_id>', methods=["GET"])
def get_details(travel_note_id):
  if travel_note_id is None:
    return jsonify({"mode": "travel_notes", "status": "bad_request", "message": "Parameter is invalid"}), 400

  try:
    travel_note = TravelNote.query.get(travel_note_id)
    if not travel_note:
      return jsonify({"mode": "/travel_note/<travel_note_id>", "status": "not found", "message": "Such travel note does not exist"}), 404
    travel_details = travel_note.travel_details
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "travel_notes", "status": "internal_server_error", "message": "Internal server error"}), 500
  
  ret = []
  for travel_detail in travel_details:
    obj = {
      "place": travel_detail.place,
      "lat": travel_detail.lat,
      "lng": travel_detail.lng,
      "description": travel_detail.description,
    }

    image_objects = travel_detail.travel_detail_images
    images = []
    for image_object in image_objects:
      image_path = image_object.path
      image = load_image(image_path)
      images.append(image)

    obj["images"] = images
    ret.append(obj)

  return jsonify(ret), 200

@travel_note.route('/travel_notes', methods=["GET"])
def get_all():
  country = request.args.get("country", default=None, type=str)
  start_date = request.args.get("start_date", default=None, type=int)
  end_date = request.args.get("end_date", default=None, type=int)
  limit = request.args.get("limit", default=None, type=int)
  offset = request.args.get("offset", default=None, type=int)

  if (start_date is not None) and (end_date is not None) and end_date < start_date:
    return jsonify({"mode": "travel_notes", "status": "bad_request", "message": "Parameter is invalid"}), 400

  try:
    query = TravelNote.query.order_by(TravelNote.id.desc())
    if country is not None:
      query = query.filter(TravelNote.country == country)

    if (start_date is not None) and (end_date is not None):
      query = query.filter(TravelNote.start_date.between(start_date, end_date))

    if offset is not None:
      query = query.offset(offset)

    if limit is not None:
      query = query.limit(limit)

    
    travel_notes = query.all()
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "travel_notes", "status": "internal_server_error", "message": "Internal server error"}), 500
  
  ret = []
  for travel_note in travel_notes:
    try:
      (user_name,) = User.query.with_entities(
        User.user_name).filter(User.id == travel_note.user_id).one()
    except Exception as e:
      logger.warn(e)
      return jsonify({"mode": "travel_notes", "status": "internal_server_error", "message": "Internal server error"}), 500

    likes = len(travel_note.travel_likes)
    obj = {
      "id": travel_note.id,
      "title": travel_note.title,
      "description": travel_note.description,
      "country": travel_note.country,
      "city": travel_note.city,
      "start_date": travel_note.start_date.strftime("%Y年%m月%d日"),
      "end_date": travel_note.end_date.strftime("%Y年%m月%d日"),
      "likes": likes,
      "user_name": user_name
    }

    image_path = travel_note.image_path
    image = load_image(image_path)
    obj["image"] = image
    ret.append(obj)

  return jsonify(ret), 200

@travel_note.route('/travel_note/<travel_note_id>/like', methods=["POST"])
@jwt_required
def like(travel_note_id):
  if travel_note_id is None:
    return jsonify({"mode": "travel_note/<travel_note_id>/like", "status": "bad_request", "message": "There are invalid parameters"}), 400

  # check travel note exists
  try:
    exists = TravelNote.query.get(travel_note_id)
    if not exists:
      return jsonify({"mode": "/travel_note/<travel_note_id>/like", "status": "bad_request", "message": "Such travel note does not exist"}), 404
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/like", "status": "internal_server_error", "message": "Internal server error"}), 500

  # get user_name
  user_id = get_jwt_identity()
  try:
    (user_name,) = User.query.with_entities(
        User.user_name).filter(User.id == user_id).one()
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "travel_note/<travel_note_id>/like", "status": "internal_server_error", "message": "Internal server error"}), 500

  # check travel like exists
  try:
    exists = TravelLike.query.get((user_id, travel_note_id))
    if exists:
      return jsonify({"mode": "/travel_note/<travel_note_id>/like", "status": "bad_request", "message": "Already liked"}), 400
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/like", "status": "internal_server_error", "message": "Internal server error"}), 500


  travel_like = TravelLike(user_id, travel_note_id, user_name, user_name)

  try:
    db.session.add(travel_like)
    db.session.commit()
  except Exception as e:
    logger.warn(e)
    db.session.rollback()
    return jsonify({"mode": "travel_note/<travel_note_id>/like", "status": "internal_server_error", "message": "Internal server error"}), 500
  finally:
    db.session.close()

  return jsonify({"mode": "travel_note/<travel_note_id>/like", "status": "ok", "message": "Successfully liked"}), 200


@travel_note.route('/travel_note/<travel_note_id>/like/delete', methods=["POST"])
@jwt_required
def like_delete(travel_note_id):
  if travel_note_id is None:
    return jsonify({"mode": "travel_note/<travel_note_id>/like/delete", "status": "bad_request", "message": "There are invalid parameters"}), 400

  # check travel note exists
  try:
    exists = TravelNote.query.get(travel_note_id)
    if not exists:
      return jsonify({"mode": "/travel_note/<travel_note_id>/like/delete", "status": "bad_request", "message": "Such travel note does not exist"}), 404
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/like/delete", "status": "internal_server_error", "message": "Internal server error"}), 500

  # get user_name
  user_id = get_jwt_identity()
  try:
    (user_name,) = User.query.with_entities(
        User.user_name).filter(User.id == user_id).one()
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "travel_note/<travel_note_id>/like/delete", "status": "internal_server_error", "message": "Internal server error"}), 500

  # check travel like exists
  try:
    travel_like = TravelLike.query.get((user_id, travel_note_id))
    if not travel_like:
      return jsonify({"mode": "/travel_note/<travel_note_id>/like/delete", "status": "bad_request", "message": "Not already liked"}), 400
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/like/delete", "status": "internal_server_error", "message": "Internal server error"}), 500


  try:
    db.session.delete(travel_like)
    db.session.commit()
  except Exception as e:
    logger.warn(e)
    db.session.rollback()
    return jsonify({"mode": "travel_note/<travel_note_id>/like/delete", "status": "internal_server_error", "message": "Internal server error"}), 500
  finally:
    db.session.close()

  return jsonify({}),204