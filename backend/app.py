import logging
import logging.handlers
import datetime
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from .database import init_db, test_connection
from .models import *
from .blueprints import *

app=Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.config.from_object('app.config.Config')
app.config['JWT_SECRET_KEY'] = 'aqwsedrftgyhujkil'
jwt = JWTManager(app)

handler = logging.handlers.RotatingFileHandler(
    f"logs/log_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.log", "a+", maxBytes=3000, backupCount=5)
handler.setLevel(logging.WARN)
handler.setFormatter(logging.Formatter(
    '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'))
logger = logging.getLogger('app')
logger.addHandler(handler)

# travel_note周りの実装
app.register_blueprint(travel_note, url_prefix="/")
# user周りの実装
app.register_blueprint(user, url_prefix="/")
# auth周りの実装
app.register_blueprint(auth, url_prefix="/")

init_db(app)

@app.route('/')
def index():
  app.logger.warn('warn')
  app.logger.error('error')
  app.logger.critical('critical')
  return jsonify({
    "message": "test"
  })

if __name__ == '__main__':
  app.run()