#MakotoNaruse

from flask_testing import TestCase

from app.app import app

from app.database import db, init_db


class BaseTestCase(TestCase):
  def create_app(self):
    app.config['TESTING'] = True
    app.config.from_object('app.config.TestConfig')
    return app

  def setUp(self):
    self.app = self.app.test_client()
    db.create_all()
    db.session.commit()

  def tearDown(self):
    db.session.remove()
    db.drop_all()