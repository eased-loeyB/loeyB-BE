FROM 568080291959.dkr.ecr.ap-northeast-2.amazonaws.com/loeyb-base-docker:latest as build

LABEL maintainer="tursunali777@mail.ru"

WORKDIR /loeyb

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY ./apps ./apps
COPY ./libs ./libs
COPY ./nest-cli.json .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./development.env .

ENV PATH=${PATH}:./node_modules/.bin

RUN nest build common \
 && nest build aws \
 && nest build cache \
 && nest build database \
 && nest build gateway \
 && nest build file \
 && nest build authentication \
 && nest build stardust \
 && nest build notification \
 && rm -fr apps libs

 FROM 568080291959.dkr.ecr.ap-northeast-2.amazonaws.com/loeyb-base-docker:latest as loeyb

 WORKDIR /loeyb

COPY --from=build /loeyb /loeyb
