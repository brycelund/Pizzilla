FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install

VOLUME /usr/src/app

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]