# MakotoNaruse

from .base import BaseTestCase, db

import json
from datetime import datetime, date, timedelta

from app.app import app
from .factory import *

class TestGetAllAPI(BaseTestCase):

  def test_no_data(self):
    response = self.app.get('/travel_notes')
    self.assert_status(response, 200)
    result = response.json
    assert result == []

  def test_one_travel_note(self):
    user_id = factory_user("test1@test.com")
    travel_note_id = factory_travel_note(user_id)
    response = self.app.get('/travel_notes')
    self.assert_status(response, 200)
    result = response.json
    assert len(result) == 1
    assert result[0]["id"] == travel_note_id

  def test_multi_travel_notes(self):
    user_id = factory_user("test1@test.com")
    id1 = factory_travel_note(user_id,country="Japan")
    id2 = factory_travel_note(user_id,country="Japan")
    id3 = factory_travel_note(user_id,country="America")
    response = self.app.get('/travel_notes')
    self.assert_status(response, 200)
    result = response.json
    assert len(result) == 3
    assert result[0]["id"] == id3
    assert result[1]["id"] == id2
    assert result[2]["id"] == id1

  def test_with_country_query(self):
    user_id = factory_user("test1@test.com")
    id1 = factory_travel_note(user_id,country="日本")
    id2 = factory_travel_note(user_id,country="日本")
    id3 = factory_travel_note(user_id,country="America")
    response = self.app.get(
      '/travel_notes',
      query_string=dict(
        country='日本',
      ),
    )
    self.assert_status(response, 200)
    result = response.json
    assert len(result) == 2
    assert result[0]["id"] == id2
    assert result[1]["id"] == id1

  def test_with_limit_offset(self):
    user_id = factory_user("test1@test.com")
    id1 = factory_travel_note(user_id,country="日本")
    id2 = factory_travel_note(user_id,country="日本")
    id3 = factory_travel_note(user_id,country="日本")
    response = self.app.get(
      '/travel_notes',
      query_string=dict(
        limit=2,
        offset=1,
      ),
    )
    self.assert_status(response, 200)
    result = response.json
    assert result[0]["id"] == id2
    assert result[1]["id"] == id1

# TODO 日付周りのテスト
'''
  def test_with_invalid_date(self):
    today = datetime.today()
    response = self.app.get(
      '/travel_notes',
      query_string=dict(
        start_date=(today + timedelta(days=1)).strftime("%Y-%m-%d"),
        end_date=(today - timedelta(days=1)).strftime("%Y-%m-%d"),
      ),
    )
    self.assert_status(response, 400)
'''

class TestMyPageAPI(BaseTestCase):

  def test_no_login(self):
    response = self.app.get(
      '/mypage'
    )
    self.assert_status(response, 401)

  def test_primary_user(self):
    user_id = factory_user(email="test1@test.com",password="password")
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
    assert result["travel_days"] == 0
    assert result["travel_counts"] == 0
    assert result["travel_countries"] == 0
    assert result["travel_likes"] == 0
    assert result["travel_notes"] == []

  def test_one_travel_note(self):
    user_id = factory_user(email="test1@test.com",password="password")
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
    assert result["travel_days"] == 3
    assert result["travel_counts"] == 1
    assert result["travel_countries"] == 1
    assert result["travel_likes"] == 0
    assert len(result["travel_notes"]) == 1

  def test_multi_travel_note(self):
    user_id = factory_user(email="test1@test.com",password="password")
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
    assert result["travel_days"] == 9
    assert result["travel_counts"] == 3
    assert result["travel_countries"] == 2
    assert result["travel_likes"] == 0
    assert len(result["travel_notes"]) == 3
'''