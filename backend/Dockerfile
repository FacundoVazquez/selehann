# BUILD
FROM node:15.4.0-alpine3.10 AS build-stage
WORKDIR /app
COPY ["src/", "/app/src"]
COPY ["package.json", "tsconfig.json", "tsconfig.build.json", "yarn.lock", "nest-cli.json", ".eslintrc.js", "webpack-hmr.config.js", "/app/"]
RUN yarn
RUN yarn run build
# RUN
FROM node:15.4.0-alpine3.10 AS run-stage
WORKDIR /app
COPY ["scripts/", "/app/scripts"]
COPY ["*.env", "package.json", "tsconfig.json", "tsconfig.build.json", "yarn.lock", "nest-cli.json", ".eslintrc.js", "webpack-hmr.config.js", "setup.sh", "setup.sql", "/app/"]
COPY --from=build-stage ["/app/dist/",  "/app/dist/"]
RUN chmod +x setup.sh
RUN apk add --no-cache git

RUN yarn


#ENV PORT 3001
#ENV NODE_ENV PRODUCTION

# EXPOSE 80 
CMD ["yarn", "run", "start:prod"]