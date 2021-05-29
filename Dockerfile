FROM node:14-alpine

WORKDIR /src

ADD . /src

CMD node ./promises.js