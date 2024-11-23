FROM node:21-alpine

ENV APP /app
WORKDIR $APP

COPY . $APP
RUN npm install
RUN npm run build

EXPOSE 5173