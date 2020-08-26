# MakotoNaruse

from flask import jsonify
import logging
import bcrypt
from app.database import db
from app.models import *

def factory_user(email,user_name="test",password="password"):
  salt = bcrypt.gensalt(rounds=10, prefix=b"2a")
  hashed_pass = bcrypt.hashpw(password.encode(), salt).decode()
  user = User(email=email, password=hashed_pass, provider="email", user_name=user_name, created_by=user_name, modified_by=user_name)
  db.session.add(user)
  db.session.commit()
  return user
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=
def factory_travel_note(user_id,country="Japan",title="")


