FROM node:10

WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

VOLUME /usr/src/app

EXPOSE 3001

CMD [ "node", "app.js" ]