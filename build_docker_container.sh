#!/bin/sh
APP_NAME=${APP_NAME:-youmusic}
NODE_ENV=${NODE_ENV:-production}

(
    yarn lint &&\
    yarn test &&\
    yarn build &&\
    docker build -t ${APP_NAME} --build-arg NODE_ENV=${NODE_ENV} .
) || echo "FAIL"


