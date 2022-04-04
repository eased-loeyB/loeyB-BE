FROM node:12.19.0-alpine3.9 AS builder
RUN mkdir -p /loeyb
WORKDIR /loeyb
COPY . .
RUN npm install -g @nestjs/cli
RUN npm install
COPY . /loeyb
RUN nest build common \
 && nest build aws \
 && nest build cache \
 && nest build database \
 && nest build gateway \
 && nest build authentication \
 && rm -fr apps libs
FROM node:12.19.0-alpine3.9
WORKDIR /loeyb
COPY --from=builder /loeyb ./
CMD [“npm”, “run”, “start”]