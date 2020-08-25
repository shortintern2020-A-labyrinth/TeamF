# shintaro ichikawa
from app.database import db
from app.models import TravelNote, User, TravelDetail, TravelDetailImage
from flask import jsonify, Blueprint, request
import logging
from flask_jwt_extended import jwt_required, get_jwt_identity
import base64

travel_note = Blueprint('travel_note', __name__)
logger = logging.getLogger('app')


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
  [_, types] = head.split(':')
  [image, extention] = types.split('/')
  return body, extention

def save_image(b64_string, file_name):
  with open(file_name, "wb") as f:
      f.write(base64.decodebytes(str.encode(b64_string)))

@travel_note.route('/travel_note/create', methods=["POST"])
@jwt_required
def create():
    if request.json is None:
        return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "Please send json format"}), 400

    if "title" not in request.json:
        return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400
    if "image" not in request.json:
        return jsonify({"mode": "travel_note/create", "status": "bad_request", "message": "There are invalid parameters"}), 400

    # ログイン機能がついてから実装する
    user_id = get_jwt_identity()
    try:
        user_name = User.query.with_entities(
            User.user_name).filter(User.id == user_id).one()
    except Exception as e:
        logger.warn(e)
        return jsonify({"mode": "travel_note/create", "status": "internal_server_error", "message": "Internal server error"}), 500

    title = request.json["title"]
    image = request.json["image"]
    description = request.json.get("description", "")
    country = request.json.get("country", None)
    city = request.json.get("city", None)
    start_date = request.json.get("start_date", None)
    end_date = request.json.get("end_date", None)

    travel_details = request.json.get("travel_details", [])

    image_path = ""
    travel_note = TravelNote(user_id, title, image_path, user_name[0], user_name[0],
                             description, country, city, start_date, end_date)
    try:
        db.session.add(travel_note)
        db.session.commit()
    except Exception as e:
        logger.warn(e)
        db.session.rollback()
        return jsonify({"mode": "travel_note/create", "status": "internal_server_error", "message": "Internal server error"}), 500

    b64_string, extention = get_image_from_b64(image)
    image_path = f"/app/images/thumbnail_{travel_note.id}.{extention}"
    try:
      save_image(b64_string, image_path)
      travel_note.image_path = image_path
      db.session.commit()
    except Exception as e:
        logger.warn(e)
        db.session.rollback()
        return jsonify({"mode": "travel_note/create", "status": "internal_server_error", "message": "Internal server error"}), 500

    return jsonify({"mode": "travel_note/create", "status": "ok", "message": "Successfully created"}), 200
