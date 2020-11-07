# build stage
#FROM node:10 as build-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build

# production stage
FROM nginx:latest
ENV LC_ALL=C.UTF-8

RUN apt-get update
RUN apt-get install -y vim

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN echo "alias ll='ls \$LS_OPTIONS -l'" > /root/.bashrc

RUN rm -Rf /usr/share/nginx/html/*

COPY default.conf /etc/nginx/conf.d
COPY dist /usr/share/nginx/html
EXPOSE 8088
CMD ["nginx", "-g", "daemon off;"]

