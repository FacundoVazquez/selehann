# BUILD
FROM node:15.4.0-alpine3.10 AS build-stage
WORKDIR /app
COPY ["package*.json", "tsconfig.json", "yarn.lock", "/app/"]
COPY ["config/", "/app/config"]
COPY ["public/", "/app/public"]
COPY ["scripts/", "/app/scripts"]
COPY ["src/", "/app/src"]
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++
RUN yarn
RUN yarn run build
# RUN
FROM nginx:1.15 AS run-stage
COPY --from=build-stage ["/app/build/", "/usr/share/nginx/html/"]
RUN rm -rf /etc/nginx/conf.d
COPY ["config/nginx", "/etc/nginx"]
# COPY ["config/nginx/nginx.conf", "/etc/nginx/nginx.conf"]
# COPY ["*.env", "/usr/share/nginx/html/"]
# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]