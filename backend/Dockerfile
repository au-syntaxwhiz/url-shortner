FROM node:23

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
