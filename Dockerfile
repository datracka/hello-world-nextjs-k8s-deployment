# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Build arguments for environment variables
ARG DATABASE_HOST
ARG DATABASE_NAME
ARG DATABASE_PASSWORD
ARG DATABASE_PORT
ARG DATABASE_USER

# Set environment variables for build-time use
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_USER=$DATABASE_USER

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Install only production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
