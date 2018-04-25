FROM node:9-alpine
WORKDIR /app

# copy node app into container
COPY ./workspaces/hhs-api /app
RUN rm -rf /app/public
COPY ./workspaces/hhs-ui/dist  /app/public

# install node dependencies
RUN yarn

# open port 3003 (HTTP)
EXPOSE 3003

# launch startup script
CMD ["yarn", "start:prod"]