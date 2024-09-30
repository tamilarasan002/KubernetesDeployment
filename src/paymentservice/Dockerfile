# Stage 1: Builder
FROM node:20.2.0-alpine AS builder

# Install necessary packages
RUN apk add --update --no-cache \
    python3 \
    make \
    g++ 

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

COPY protos/ ./protos/
# Stage 2: Final image
FROM node:20.2.0-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy built application from builder stage
COPY --from=builder /usr/src/app .

# Expose the port
EXPOSE 50051

# Start the application
CMD [ "npm", "start" ]
