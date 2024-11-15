# Stage 1: Build the application
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:16-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
