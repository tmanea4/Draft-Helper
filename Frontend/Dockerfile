FROM node:alpine
 
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
 
EXPOSE 51

CMD ["npm", "run", "dev"]