FROM node:12-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

#RUN yarn ci 

COPY . /opt/app

RUN yarn 
RUN yarn build

CMD [ "yarn", "start" ]