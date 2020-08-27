# Shintaro Ichikawa
from flask import jsonify, Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Comment, TravelNote
from ..database import db
import logging

comment = Blueprint('comment', __name__)
logger = logging.getLogger('app')

@comment.route('/comment/test')
def index():
  logger.warn('warn')
  logger.error('error')
  logger.critical('critical')
  return jsonify({
    "message": "comment_test"
  })


@comment.route('/travel_note/<travel_note_id>/comment/create', methods=["POST"])
@jwt_required
def create(travel_note_id):
  if request.json is None:
    return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "bad_request", "message": "Please send json format"}), 400

  if "travel_note_id" is None:
    return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "bad_request", "message": "There are invalid parameters"}), 400
  if "body" not in request.json:
    return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "bad_request", "message": "There are invalid parameters"}), 400

  # get params
  body = request.json["body"]

  if len(body) > 4095:
    return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "bad_request", "message": "Comment is too long"}), 400

  # check travel note exists
  try:
    exists = TravelNote.query.get(travel_note_id)
    if not exists:
      return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "bad_request", "message": "Such travel note does not exist"}), 400
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "internal_server_error", "message": "Internal server error"}), 500

  # get user_name
  user_id = get_jwt_identity()
  try:
    (user_name,) = User.query.with_entities(
        User.user_name).filter(User.id == user_id).one()
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "internal_server_error", "message": "Internal server error"}), 500

  #insert Comment
  comment = Comment(user_id, travel_note_id, body, user_name, user_name)

  try:
    db.session.add(comment)
    db.session.commit()
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "internal_server_error", "message": "Internal server error"}), 500
  finally:
    db.session.close()

  return jsonify({"mode": "/travel_note/<travel_note_id>/cooment/create", "status": "create", "message": "Successfully created"}), 201

@comment.route('/travel_note/<travel_note_id>/comments', methods=["GET"])
def get_all_comments(travel_note_id):
  if "travel_note_id" is None:
    return jsonify({"mode": "/travel_note/<travel_note_id>/comments", "status": "bad_request", "message": "There are invalid parameters"}), 400

  # check travel note exists
  try:
    travel_note = TravelNote.query.get(travel_note_id)
    if not travel_note:
      return jsonify({"mode": "/travel_note/<travel_note_id>/comments", "status": "not_found", "message": "Such travel note does not exist"}), 404
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "/travel_note/<travel_note_id>/comments", "status": "internal_server_error", "message": "Internal server error"}), 500


  comments = []
  for comment in travel_note.comments:
    try:
      user = comment.users
    except Exception as e:
      logger.warn(e)
      return jsonify({"mode": "/travel_note/<travel_note_id>/comments", "status": "internal_server_error", "message": "Internal server error"}), 500

    comments.append({
      "id": comment.id,
      "body": comment.body,
      "likes": len(comment.comment_likes),
      "user_id": user.id,
      "user_name": user.user_name,
      "created_date": comment.created_date.strftime("%Y年%m月%d日%H時%M分")
    })

  return jsonify({
    "comments": comments
  }), 200
