FROM node:20.11.0-bullseye

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY prisma ./prisma/ 

COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]