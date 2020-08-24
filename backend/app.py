from flask import Flask, jsonify
from .database import init_db, test_connection

app=Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.config.from_object('app.config.Config')

@app.route('/')
def index():
  return jsonify({
    "message": "test"
  })

if __name__ == '__main__':
  init_db()
  app.run()