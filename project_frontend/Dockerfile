FROM node:lts AS builder
ARG BACKEND_URL
ENV BACKEND_URL ${BACKEND_URL}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY webpack.config.js ./
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80