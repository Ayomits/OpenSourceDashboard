FROM node:latest

RUN npm i

COPY .env .env
COPY . .

CMD ["npm", "run", "start:dev"]