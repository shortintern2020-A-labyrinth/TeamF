FROM node:12.16-slim

ENV APP_DIR=/app
WORKDIR ${APP_DIR}
RUN mkdir -p ${APP_DIR}
COPY . ${APP_DIR}

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo
ENV NODE_ENV=development
ENV HOST 0.0.0.0

RUN cd app && yarn install

EXPOSE 3000