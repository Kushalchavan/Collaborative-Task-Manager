FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma 

RUN npm install

COPY . .

# dummy database url for build
ARG DATABASE_URL="postgresql://user:pass@localhost:5432/db"
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]