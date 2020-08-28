# Shintaro Ichikawa
from flask import jsonify, Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, Comment, TravelNote
from app.database import db
import logging
import os
import urllib.request
import json

hotel = Blueprint('hotel', __name__)
logger = logging.getLogger('app')
APP_ID = os.getenv("RAKUTEN_APPLICATION_ID")

@hotel.route('/hotel/test')
def index():
  logger.warn('warn')
  logger.error('error')
  logger.critical('critical')
  return jsonify({
    "message": "hotel_test"
  })

@hotel.route('/hotel/<hotel_no>', methods=["GET"])
def get_hotel(hotel_no):
  if "hotel_no" is None:
    return jsonify({"mode": "/hotel/<hotel_no>", "status": "bad_request", "message": "There are invalid parameters"}), 400

  url = f"https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426?format=json&applicationId={APP_ID}&hotelNo={hotel_no}"
  logger.warn(url)
  response = urllib.request.urlopen(url)
  if response.getcode() == 200:
    result = response.read()
    
    return result, 200
  
  return jsonify({"mode": "/hotel/<hotel_no>", "status": "intenal_server_error", "message": "Internal Server Error"}), 500
