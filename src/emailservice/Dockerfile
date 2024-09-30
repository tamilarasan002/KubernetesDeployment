# First stage: Install dependencies
FROM python:3.10.8-slim@sha256:49749648f4426b31b20fca55ad854caa55ff59dc604f2f76b57d814e0a47c181 as builder

# Install system dependencies
RUN apt-get -qq update \
    && apt-get install -y --no-install-recommends \
        wget g++ \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /src

# Copy requirements.txt and install Python dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Second stage: Build the final image
FROM python:3.10.8-slim

# Set the working directory
WORKDIR /src

# Copy installed Python packages from the builder stage
COPY --from=builder /usr/local/lib/python3.10/ /usr/local/lib/python3.10/

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD [ "python", "email_server.py" ]
