# Shintaro Ichikawa

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def init_db(app):
  db.init_app(app)
  migrate.init_app(app, db)

def test_connection():
  ok = True
  result = "ok"

  try:
    db.session.execute('SELECT 1')
  except Exception as e:
    output = str(e)
    ok = False

  return ok, output