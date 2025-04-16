FROM node:18-alpine

WORKDIR /app

# Install Python and build tools (required for some npm packages)
# Install Python and build tools (required for some npm packages)

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]