# Node version
FROM node:22-slim

# Setting environment variables
ARG NODE_ENV=production

# Exposing port
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# Initilazing working directory
ENV HOMEDIR=/usr/src
WORKDIR ${HOMEDIR}/weather-app

# Initilazing json packages first and ensuring files owned by node user
COPY --chown=node:node package.json package-lock.json* ./
# Installing dependencies and removes npm cache to make Docker image smaller
RUN npm ci && npm cache clean --force

# Initilazing an app user
USER node

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node healthcheck.js

# Copying our source as a node user
COPY --chown=node:node . .

# Running node app
CMD [ "node", "./app.js" ]