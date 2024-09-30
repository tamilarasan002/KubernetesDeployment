# Stage 1: Builder
FROM node:20.2.0-alpine as builder

# Install necessary packages and install dependencies
RUN apk add --update --no-cache python3 make g++ 

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Stage 2: Final image
FROM node:20.2.0-alpine

WORKDIR /usr/src/app

# Copy built application from builder stage
COPY --from=builder /usr/src/app .

# Set environment variable
ENV NODE_ENV=production

# Expose the port
EXPOSE 50051

# Start the application
CMD [ "npm", "start" ]
