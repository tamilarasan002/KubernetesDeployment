# Stage 1: Builder
FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 as builder

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
