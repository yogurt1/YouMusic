#!/bin/sh
APP_NAME=${APP_NAME:-youmusic}
NODE_ENV=${NODE_ENV:-production}

function onerror() {
    status=$?
    echo "FAIL. status ${status}"
}

(
    yarn lint &&\
    yarn test &&\
    yarn build &&\
    yarn build:server && \
    docker build -t ${APP_NAME} --build-arg NODE_ENV=${NODE_ENV} .
) || onerror $?


