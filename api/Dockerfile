FROM node:10

WORKDIR /usr/src/app

# Bundle our app source
COPY . .

RUN npm install

VOLUME /usr/src/app

EXPOSE 3001

CMD ["node", "app.js"]

