# Dockerfile for React client
FROM node:18.13-alpine

# Working directory be app
WORKDIR /app

# Copy package.json first
COPY package.json .

# Install dependencies
RUN npm install npm@latest

# Copy the rest of the files
COPY . .

# Expose port
EXPOSE 8081
EXPOSE 8082
EXPOSE 8083

# Default command
CMD ["npm", "start"]
