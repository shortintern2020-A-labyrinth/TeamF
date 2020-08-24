from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
  db.init_app(app)

def test_connection():
  ok = True
  result = "ok"

  try:
    db.session.execute('SELECT 1')
  except Exception as e:
    output = str(e)
    ok = False

  return ok, output