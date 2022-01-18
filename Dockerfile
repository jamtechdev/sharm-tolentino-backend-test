FROM node:16-alpine As development
WORKDIR /usr/src/app/test-backend/
COPY package*.json ./
RUN npm install
COPY . .
RUN cd /usr/src/app/test-backend/
RUN npm run build

FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app/test-backend
RUN apk add python3
RUN apk add --no-cache make
RUN apk --no-cache add --virtual native-deps \
g++ gcc libgcc libstdc++ linux-headers make python3
# apk del native-deps
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/test-backend/dist ./dist
CMD ["node", "dist/main"]
EXPOSE ${PORT}
