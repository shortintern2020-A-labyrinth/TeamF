# MakotoNaruse

from .base import BaseTestCase

import json

from app.app import app

class TestSignupAPI(BaseTestCase):

  def test_sign_up_no_data(self):
    response = self.app.post('/signup')
    self.assert_status(response, 400)

  def test_sign_up_once(self):
    response = self.app.post(
      '/signup',
      data=json.dumps(dict(
        email='example@example.com',
        password='password',
        user_name='test'
      )),
      content_type='application/json'
    )
    # createdが返ってくる
    self.assert_status(response, 201)
    # access_tokenがある
    assert response.json["access_token"]

  def test_sign_up_twice(self):
    # 1回目
    response1 = self.app.post(
      '/signup',
      data=json.dumps(dict(
        email='example@example.com',
        password='password',
        user_name='test'
      )),
      content_type='application/json'
    )
    # createdが返ってくる
    self.assert_status(response1, 201)
    # access_tokenがある
    assert response1.json["access_token"]

    # 2回目
    response2 = self.app.post(
      '/signup',
      data=json.dumps(dict(
        email='example@example.com',
        password='password',
        user_name='test'
      )),
      content_type='application/json'
    )
    # 400が返ってくる
    self.assert_status(response2, 400)

class TestSigninAPI(BaseTestCase):

  def test_sign_in_no_data(self):
    response = self.app.post('/signin')
    self.assert_status(response, 400)

  def test_sign_in_failed(self):
    response = self.app.post(
      '/signin',
      data=json.dumps(dict(
        email='',
        password='',
      )),
      content_type='application/json'
    )
    # 400が返ってくる
    self.assert_status(response, 400)

  def test_sign_in_successed(self):
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
    # createdが返ってくる
    self.assert_status(response1, 201)
    # access_tokenがある
    assert response1.json["access_token"]

    # sign_in
    response2 = self.app.post(
      '/signin',
      data=json.dumps(dict(
        email='example@example.com',
        password='password'
      )),
      content_type='application/json'
    )
    # 200が返ってくる
    self.assert_status(response2, 200)
    # access_tokenがある
    assert response2.json["access_token"]

class TestCheckAPI(BaseTestCase):
  def test_no_authorization_header(self):
    response = self.app.get('/protected')
    self.assert_status(response, 401)

  def test_with_authorization_header(self):
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
    # createdが返ってくる
    self.assert_status(response1, 201)
    # access_tokenがある
    assert response1.json["access_token"]

    access_token = response1.json["access_token"]

    response2 = self.app.get(
      '/protected',
      headers={
        'Authorization': f"Bearer {access_token}"
      }
    )
    # 認証されているので200が返る
    self.assert_status(response2, 200)
