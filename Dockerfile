from node:16-alpine

WORKDIR /usr/src/app

RUN apk update
RUN apk add bash
RUN apk add make

COPY package*.json yarn.lock ./

#RUN yarn

EXPOSE 3333

#CMD ["yarn", "dev"]
