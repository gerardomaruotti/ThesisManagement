FROM node:latest
WORKDIR /server
COPY . /server
RUN rm -rf node_modules
RUN npm install --ignore-scripts
CMD [ "npm", "run", "test" ]