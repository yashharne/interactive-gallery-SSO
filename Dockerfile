FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.5.2
COPY . .
EXPOSE 3000
CMD npm run dev