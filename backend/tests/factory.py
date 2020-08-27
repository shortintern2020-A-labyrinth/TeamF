# MakotoNaruse

from flask import jsonify
import logging
import bcrypt
from app.database import db
from app.models import *
import base64
import os
import glob
import shutil

test_dir = "./images/test"

def get_image_from_b64(b64_string):
  [header, body] = b64_string.split(',')
  [head, _] = header.split(';')
  [_, types_extention] = head.split(':')
  [types, extention] = types_extention.split('/')
  return body, types, extention


def save_image(b64_string, file_name):
  with open(file_name, "wb") as f:
      f.write(base64.decodebytes(str.encode(b64_string)))

def factory_user(email,user_name="test",password="password"):
  salt = bcrypt.gensalt(rounds=10, prefix=b"2a")
  hashed_pass = bcrypt.hashpw(password.encode(), salt).decode()
  user = User(email=email, password=hashed_pass, provider="email", user_name=user_name, created_by=user_name, modified_by=user_name)
  try:
    db.session.add(user)
    db.session.commit()
    return user.id
  except Exception as e:
    logger.warn(e)
  finally:
    db.session.close()
  

def factory_travel_note(user_id,title="test",description="",country="Japan",city="",start_date="2020-08-01",end_date="2020-08-03"):
  #insert TravelNote
  user_name = "test"
  image_path = ""
  travel_note = TravelNote(user_id, title, image_path, user_name, user_name,
                            description, country, city, start_date, end_date)
  db.session.add(travel_note)
  db.session.flush()
  #save thumbnail
  if not os.path.exists(test_dir):
    os.mkdir(test_dir)
  # 適当な画像を入れておく
  b64_string, _, extention = get_image_from_b64("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=")
  image_path = f"{test_dir}/thumbnail_{travel_note.id}.{extention}"
  save_image(b64_string, image_path)
  travel_note.image_path = image_path
  try:
    db.session.commit()
    return travel_note.id
  except Exception as e:
    logger.warn(e)
  finally:
    db.session.close()
