# MakotoNaruse

from flask import jsonify
import logging
import bcrypt
from ..database import db
from ..models import *
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
    raise e
  finally:
    db.session.close()
  

def factory_travel_note(user_id,title="テスト旅行記",description="テストの旅行記です",country="日本",city="千葉",start_date="2020-08-01",end_date="2020-08-03"):
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
    raise e
  finally:
    db.session.close()

def factory_travel_detail(travel_note_id,place="良さげなスポット",lat=None,lng=None,description="良い思い出",hotel_no=0):
  user_name = "test"
  travel_detail = TravelDetail(
    travel_note_id, user_name, user_name, place, description, hotel_no, lat, lng)

  try:
    db.session.add(travel_detail)
    db.session.flush()
  except Exception as e:
    logger.warn(e)
    raise e

  b64_string, _, extention = get_image_from_b64("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=")
  img_path = f"{test_dir}/detail_{travel_detail.id}_1.{extention}"
  travel_image = TravelDetailImage(
    travel_detail.id, img_path, user_name, user_name)

  try:
    save_image(b64_string, img_path)
    db.session.add(travel_image)
    db.session.commit()
    return travel_detail.id

  except Exception as e:
    logger.warn(e)
    raise e
