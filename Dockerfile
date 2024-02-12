from node:16-alphine

WORKDIR /usr/src/app

RUN apk update
RUN apk add bash
RUN apk add make

ENV PYTHONUNBUFFERED=1

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip

COPY package*.json yarn.lock ./

RUN yarn

EXPOSE 3333

CMD ["yarn", "dev"]
