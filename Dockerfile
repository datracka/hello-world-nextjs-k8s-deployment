FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install "serve" to serve the production build
RUN npm install -g serve

# Remove development dependencies to reduce image size
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3000

# Start the app using "serve"
CMD ["serve", "-s", "build", "-l", "3000"]

