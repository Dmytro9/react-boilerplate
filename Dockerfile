FROM node:alpine AS builder

WORKDIR /app

# Copying application code
COPY package.json /app


# Creating tar of productions dependencies
# RUN npm install --production && cp -rp ./node_modules /tmp/node_modules

# Installing all dependencies
RUN yarn

COPY . /app

# Running tests
RUN yarn test
RUN yarn run build

FROM nginx:alpine AS runner

EXPOSE 80
WORKDIR /app

COPY docker/nginx/default.conf /etc/nginx/conf.d
COPY --from=builder /app/build/ /usr/share/nginx/html

# Adding production dependencies to image
#COPY --from=builder /tmp/node_modules /app/node_modules

# Copying application code
#COPY . /app

#CMD npm start
