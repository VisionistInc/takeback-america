FROM node:9-alpine
WORKDIR /app

# install nginx for proxying to node apps
RUN apk update
RUN apk add nginx

# copy nginx config into container
COPY nginx.conf /etc/nginx/nginx.conf

# copy node app into container
COPY ../package.json /app/package.json
COPY ../package_lock.json /app/package_lock.json
COPY ../node_modules /app/node_modules
COPY ../HHS-API /app/HHS-API
COPY ../HHS-Theme /app/HHS-Theme
COPY ../HHS-UI /app/HHS-UI

# copy startup script into container
COPY run.sh /run.sh

# open port 80 (HTTP)
EXPOSE 80

# launch startup script
CMD /run.sh

