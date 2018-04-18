#!/usr/bin/dumb-init /bin/sh
##
## Docker container startup script for Node.js apps with an nginx proxy
##

/usr/sbin/nginx
cd /app && exec npm run start-prod

