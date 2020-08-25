from .base import BaseTestCase

import json

from app.app import app

class TestSignupAPI(BaseTestCase):

  def test_get_hoges_no_data(self):
    response = self.app.post('/signup')
    self.assert_status(response, 400)

