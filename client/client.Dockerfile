FROM node:alpine

# Create app directory
WORKDIR .

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]