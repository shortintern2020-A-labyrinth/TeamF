# MakotoNaruse

import click

from flask.cli import with_appcontext

from .tests.factory import *

@click.command()
@with_appcontext
def seed():
  # 好きなメールアドレスを書く
  # 重複している場合には新しいものにする
  email = "seed11@example.com"
  user_id = factory_user(email)
  print("user_id: %s, email=%s password=password\n" % (user_id, email))
  for i in range(10):
    travel_note_id = factory_travel_note(user_id)
    print(" |-travel_note_id: %s" % travel_note_id)
    for j in range(10):
      travel_detail_id = factory_travel_detail(travel_note_id)
      print("   |-travel_detail_id: %s" % travel_detail_id)

def register_commands(app):
    app.cli.add_command(seed)


