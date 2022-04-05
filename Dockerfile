FROM node:latest AS builder
RUN mkdir -p /loeyb
WORKDIR /loeyb
COPY . .
RUN npm install --legacy-peer-deps
RUN npm install @nestjs/typeorm --force
COPY . /loeyb
RUN npm run build:common \
npm run build:aws \
npm run build:cache \
npm run build:database \
npm run build:gateway \
npm run build:authentication \
 && rm -fr apps libs
FROM node:latest
WORKDIR /loeyb
COPY --from=builder /loeyb ./
CMD [“npm”, “run”, “start”]