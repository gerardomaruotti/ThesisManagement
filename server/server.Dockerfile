FROM node:latest

# Create app directory
WORKDIR .

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

CMD node server.js