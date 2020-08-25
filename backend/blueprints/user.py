from flask import jsonify, Blueprint
import logging

user = Blueprint('user', __name__)
logger = logging.getLogger('app')

@user.route('/user/test')
def index():
  logger.warn('warn')
  logger.error('error')
  logger.critical('critical')
  return jsonify({
    "message": "user_test"
  })
