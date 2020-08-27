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

class TestCreateAPI(BaseTestCase):

  def test_no_authorizaton(self):
    response = self.app.post('/travel_note/create')
    self.assert_status(response, 401)

  def test_invalid_param(self):
    # まずはsignup
    response1 = self.app.post(
      '/signup',
      data=json.dumps(dict(
        email='example@example.com',
        password='password',
        user_name='test'
      )),
      content_type='application/json'
    )
    self.assert_status(response1, 201)
    access_token = response1.json["access_token"]

    response2 = self.app.post(
      '/travel_note/create',
      headers={
        'Authorization': f"Bearer {access_token}"
      }
    )
    self.assert_status(response2, 400)


  def test_invalid_date_param(self):
    # まずはsignup
    test_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII="
    response1 = self.app.post(
      '/signup',
      data=json.dumps(dict(
        email='example@example.com',
        password='password',
        user_name='test'
      )),
      content_type='application/json'
    )
    self.assert_status(response1, 201)
    access_token = response1.json["access_token"]

    response2 = self.app.post(
      '/travel_note/create',
      headers={
        'Authorization': f"Bearer {access_token}"
      },
      data=json.dumps(dict(
        title='test',
        image=test_image,
        description='test',
        country='日本',
        city='千葉',
        start_date=1600000000,
        end_date=1000000000,
        travel_details=[]
      )),
      content_type='application/json'
    )
    print(response2.json)
    self.assert_status(response2, 400)

  def test_create_param(self):
    test_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII="
    # まずはsignup
    response1 = self.app.post(
      '/signup',
      data=json.dumps(dict(
        email='example@example.com',
        password='password',
        user_name='test'
      )),
      content_type='application/json'
    )
    self.assert_status(response1, 201)
    access_token = response1.json["access_token"]
    response2 = self.app.post(
      '/travel_note/create',
      headers={
        'Authorization': f"Bearer {access_token}"
      },
      data=json.dumps(dict(
        title='test',
        image=test_image,
        description='test',
        country='日本',
        city='千葉',
        start_date=1598000000,
        end_date=1599000000,
        travel_details=[
          dict(
            place='良い場所1',
            images=[
              test_image
            ]
          ),
          dict(
            place='良い場所2',
            images=[
              test_image
            ]
          )
        ]
      )),
      content_type='application/json'
    )
    self.assert_status(response2, 201)
    
    # GETできる
    response = self.app.get('/travel_notes')
    self.assert_status(response, 200)
    result = response.json
    assert len(result) == 1
