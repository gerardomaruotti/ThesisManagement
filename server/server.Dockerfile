FROM node:latest

# Create app directory
WORKDIR .

# Install app dependencies
COPY package*.json ./

RUN npm install --ignore-scripts

# Bundle app source
COPY . .

EXPOSE 3001

CMD node server.js