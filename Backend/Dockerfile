FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set environment variables
ENV DB_USER=postgres
ENV DB_HOST=db
ENV DB_NAME=postgres
ENV DB_PASSWORD=1234
ENV DB_PORT=5432

EXPOSE 3000

CMD ["npm", "start"]