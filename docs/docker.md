# Docker

### Environment variables:
+ `NODE_ENV` - you know
+ `APP_NAME` - name of docker image

### Build image
+ `sh docker_build_containter.sh` in project root - build frontend and docker image
+ `docker run -it -P --name <instance_name> youmusic` - run app
+ `docker port <instance_name>` - get port of running app

### Useful flags for `docker run`
+ `-d` - run detached
