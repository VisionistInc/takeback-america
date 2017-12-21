FROM node:9-alpine
WORKDIR /app

# install nginx for proxying to node apps
RUN apk update
RUN apk add nginx dumb-init

# install "serve" npm module
RUN npm install -g serve

# copy nginx config into container
COPY docker/nginx.conf /etc/nginx/nginx.conf

# copy node app into container
COPY package.json /app/package.json
COPY node_modules /app/node_modules
COPY HHS-API /app/HHS-API
COPY HHS-UI /app/HHS-UI

# copy startup script into container
COPY docker/run.sh /app/run.sh

# open port 80 (HTTP)
EXPOSE 80

# launch startup script
ENTRYPOINT ["/app/run.sh"]
