FROM node:10

WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

VOLUME /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]