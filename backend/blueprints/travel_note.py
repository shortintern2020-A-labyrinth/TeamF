from flask import jsonify, Blueprint
import logging

travel_note = Blueprint('travel_note', __name__)
logger = logging.getLogger('app')

@travel_note.route('/travel_note/test')
def index():
  logger.warn('warn')
  logger.error('error')
  logger.critical('critical')
  return jsonify({
    "message": "travel_note_test"
  })
