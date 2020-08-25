# MakotoNaruse

from flask import jsonify, Blueprint, request
import logging
from flask_jwt_extended import (
  jwt_required, create_access_token,
  get_jwt_identity, get_jti, get_raw_jwt,
  JWTManager
)
import bcrypt
from flask_sqlalchemy import SQLAlchemy
from app.models import *

auth = Blueprint('auth', __name__)
logger = logging.getLogger('app')
db = SQLAlchemy()

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
    salt = bcrypt.gensalt(rounds=10, prefix=b"2a")
    hashed_pass = bcrypt.hashpw(password.encode(), salt).decode()
    user = User(email=email, password=hashed_pass, provider="email", user_name=user_name, created_by=user_name, modified_by=user_name)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 201

@auth.route("/signin", methods=["POST"])
def signin():
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
      return jsonify( {"message": "An error occurred"} ), 500

    access_token = create_access_token(identity=user.id)
    #sql = "UPDATE users_data SET jti=%s WHERE username=%s"
    #db(sql, [ get_jti(access_token), username ])
    return jsonify(access_token=access_token), 200