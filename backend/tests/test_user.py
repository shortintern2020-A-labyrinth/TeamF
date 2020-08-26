# MakotoNaruse

from .base import BaseTestCase, db

import json

from app.app import app
from .factory import *

class TestUserDetailAPI(BaseTestCase):

  def test_no_data(self):
    response = self.app.get('/user/1')
    self.assert_status(response, 404)

  def test_primary_user(self):
    user_id = factory_user("test1@test.com")
    response = self.app.get(f'/user/{user_id}')
    self.assert_status(response, 200)
    json = response.json
    assert json["user_name"] == "test"
    assert json["travel_days"] == 0
    assert json["travel_counts"] == 0
    assert json["travel_countries"] == 0
    assert json["travel_likes"] == 0
    assert json["travel_notes"] == []

  def test_one_travel_note(self):
    user_id = factory_user("test1@test.com")
    travel_note = factory_travel_note(user_id)
    response = self.app.get(f'/user/{user_id}')
    self.assert_status(response, 200)
    json = response.json
    assert json["user_name"] == "test"
    assert json["travel_days"] == 3
    assert json["travel_counts"] == 1
    assert json["travel_countries"] == 1
    assert json["travel_likes"] == 0
    assert len(json["travel_notes"]) == 1
    print(json)
