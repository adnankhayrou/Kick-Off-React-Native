# Dockerfile for React client
FROM node:18.13-alpine

# Working directory be app
WORKDIR /app

# Copy package.json first
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port
EXPOSE 8081

# Default command
CMD ["npx", "expo"]
