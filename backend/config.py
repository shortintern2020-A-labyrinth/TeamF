import os


class Config:
  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
    'user': os.environ['APP_DATABASE_USER'],
    'password': os.environ['APP_DATABASE_PASSWORD'],
    'host': os.environ['APP_DATABASE_HOST'],
    'db_name': os.environ['APP_DATABASE_NAME']
  })
