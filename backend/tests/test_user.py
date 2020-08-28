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
    result = response.json
    assert result["user_name"] == "test"
    assert result["travel_days"] == 0
    assert result["travel_counts"] == 0
    assert result["travel_countries"] == 0
    assert result["travel_likes"] == 0
    assert result["travel_notes"] == []

  def test_one_travel_note(self):
    user_id = factory_user("test1@test.com")
    travel_note = factory_travel_note(user_id)
    response = self.app.get(f'/user/{user_id}')
    self.assert_status(response, 200)
    result = response.json
    assert result["user_name"] == "test"
    assert result["travel_days"] == 3
    assert result["travel_counts"] == 1
    assert result["travel_countries"] == 1
    assert result["travel_likes"] == 0
    assert len(result["travel_notes"]) == 1

  def test_multi_travel_notes(self):
    user_id = factory_user("test1@test.com")
    factory_travel_note(user_id,country="Japan")
    factory_travel_note(user_id,country="Japan")
    factory_travel_note(user_id,country="America")
    response = self.app.get(f'/user/{user_id}')
    self.assert_status(response, 200)
    result = response.json
    assert result["user_name"] == "test"
    assert result["travel_days"] == 9
    assert result["travel_counts"] == 3
    assert result["travel_countries"] == 2
    assert result["travel_likes"] == 0
    assert len(result["travel_notes"]) == 3

class TestMyPageAPI(BaseTestCase):

  def test_no_login(self):
    response = self.app.get(
      '/mypage'
    )
    self.assert_status(response, 401)

  def test_primary_user(self):
    user_id = factory_user(user_name="test",email="test1@test.com",password="password")
    # sign_in
    response1 = self.app.post(
      '/signin',
      data=json.dumps(dict(
        email='test1@test.com',
        password='password'
      )),
      content_type='application/json'
    )
    access_token = response1.json["access_token"]
    response2 = self.app.get(
      '/mypage',
      headers={
        'Authorization': f"Bearer {access_token}"
      }
    )
    self.assert_status(response2, 200)
    result = response2.json
    assert result["user_name"] == "test"
    assert result["travel_days"] == 0
    assert result["travel_counts"] == 0
    assert result["travel_countries"] == 0
    assert result["travel_likes"] == 0
    assert result["travel_notes"] == []

  def test_one_travel_note(self):
    user_id = factory_user(user_name="test",email="test1@test.com",password="password")
    # sign_in
    response1 = self.app.post(
      '/signin',
      data=json.dumps(dict(
        email='test1@test.com',
        password='password'
      )),
      content_type='application/json'
    )
    access_token = response1.json["access_token"]
    travel_note = factory_travel_note(user_id)
    response2 = self.app.get(
      '/mypage',
      headers={
        'Authorization': f"Bearer {access_token}"
      }
    )
    self.assert_status(response2, 200)
    result = response2.json
    assert result["user_name"] == "test"
    assert result["travel_days"] == 3
    assert result["travel_counts"] == 1
    assert result["travel_countries"] == 1
    assert result["travel_likes"] == 0
    assert len(result["travel_notes"]) == 1

  def test_multi_travel_note(self):
    user_id = factory_user(user_name="test",email="test1@test.com",password="password")
    # sign_in
    response1 = self.app.post(
      '/signin',
      data=json.dumps(dict(
        email='test1@test.com',
        password='password'
      )),
      content_type='application/json'
    )
    access_token = response1.json["access_token"]
    factory_travel_note(user_id,country="Japan")
    factory_travel_note(user_id,country="Japan")
    factory_travel_note(user_id,country="America")
    response2 = self.app.get(
      '/mypage',
      headers={
        'Authorization': f"Bearer {access_token}"
      }
    )
    self.assert_status(response2, 200)
    result = response2.json
    assert result["user_name"] == "test"
    assert result["travel_days"] == 9
    assert result["travel_counts"] == 3
    assert result["travel_countries"] == 2
    assert result["travel_likes"] == 0
    assert len(result["travel_notes"]) == 3
