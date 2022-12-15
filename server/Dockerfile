FROM node:16-alpine
WORKDIR /app
RUN npm install -g nodemon
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["nodemon", "index.js"]