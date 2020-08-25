# MakotoNaruse

from flask import jsonify, Blueprint, request
import logging
from flask_jwt_extended import (
  jwt_required, create_access_token,
  get_jwt_identity, get_jti, get_raw_jwt,
  JWTManager
)
import bcrypt
from app.database import db
from app.models import *

auth = Blueprint('auth', __name__)
logger = logging.getLogger('app')

@auth.route("/signup", methods=["POST"])
def signup():
  if not request.is_json:
    return jsonify( {"message": "Missing JSON in request"} ), 400
  user_name = request.json.get("user_name", None)
  email = request.json.get("email", None)
  password = request.json.get("password", None)

  if email and email.encode().isalnum():
    return jsonify( {"mode": "signup", "status": "badrequest", "message": "Format does not match"} ), 400

  user = db.session.query(User).filter_by(email=email).first()

  if user:
    return jsonify( {"mode": "signup", "status": "badrequest", "message": "This email cannot be used"} ), 400
  else:
    try:
      salt = bcrypt.gensalt(rounds=10, prefix=b"2a")
      hashed_pass = bcrypt.hashpw(password.encode(), salt).decode()
      user = User(email=email, password=hashed_pass, provider="email", user_name=user_name, created_by=user_name, modified_by=user_name)
      db.session.add(user)
      db.session.commit()
      access_token = create_access_token(identity=user.id)
    except Exception as e:
      logger.warn(e)
      db.session.rollback()
      return jsonify({"mode": "signup", "status": "internal_server_error", "message": "Internal server error"}), 500
    finally:
      db.session.close()
    return jsonify(access_token=access_token), 201

@auth.route("/signin", methods=["POST"])
def signin():
  if not request.is_json:
    return jsonify( {"message": "Missing JSON in request"} ), 400
    
  email = request.json.get("email", None)
  password = request.json.get("password", None)

  if not email or not password:
    return jsonify( {"message": "Format does not match"} ), 400

  try:
    user = db.session.query(User).filter_by(email=email).first()
    if not user:
      return jsonify( {"message": "Bad username or password"} ), 401
    if not bcrypt.checkpw(password.encode(), user.password.encode()):
      return jsonify( {"message": "Bad username or password"} ), 401
  except Exception as e:
    logger.warn(e)
    return jsonify({"mode": "signin", "status": "internal_server_error", "message": "Internal server error"}), 500
  finally:
    db.session.close()

  access_token = create_access_token(identity=user.id)
  return jsonify(access_token=access_token), 200

@auth.route("/protected", methods=["GET"])
@jwt_required
def check():
  user = db.session.query(User).filter_by(id=get_jwt_identity()).first()
  if not user:
      return jsonify( {"message": "Bad access token"} ), 401
  return jsonify( {"user_id": user.id} ), 200