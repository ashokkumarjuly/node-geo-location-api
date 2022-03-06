FROM node:14-alpine as base

# Create a directory for our application and one for its log files
# Update the image and install supervisord which we will use to run the application
# RUN mkdir /src

WORKDIR /usr/src/app
# COPY package.json package-lock.json /src/
COPY . .

FROM base as production
USER node
ENV NODE_ENV=production
RUN npm cache clean --force
COPY --chown=node:node package*.json ./
# COPY --chown=node:node .env.production .
# RUN npm run build
# CMD ["node", "/usr/src/app/dist/src/server.js"]

FROM base as local

ENV NODE_ENV=local
RUN npm config set unsafe-perm true
COPY package*.json ./
COPY --chown=node:node .env.local .
RUN npm install
CMD ["npm", "local"]




