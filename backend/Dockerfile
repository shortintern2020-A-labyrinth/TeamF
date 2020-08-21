FROM python:3.6

ENV APP_DIR=/app
WORKDIR ${APP_DIR}
RUN mkdir -p ${APP_DIR}
COPY . ${APP_DIR}

RUN pip install -r requirements.txt