import logging
import logging.handlers
import datetime
import click
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .database import init_db, test_connection
from .models import *
from .blueprints import *
from .seeder import register_commands

app=Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.config.from_object('app.config.Config')
# 各々の環境で変える
app.config['JWT_SECRET_KEY'] = 'aqwsedrftgyhujkil'
jwt = JWTManager(app)
CORS(app)

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
# comment周りの実装
app.register_blueprint(comment, url_prefix="/")

init_db(app)

register_commands(app)

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