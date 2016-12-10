FROM yogurt1/node-yarn-onbuild
MAINTAINER <yogurt1> stalinswag1@gmail.com
LABEL isFun="yes"

ARG APP_ENV
ENV APP_ENV $APP_ENV
ARG CI
ENV CI $CI

EXPOSE 3000

