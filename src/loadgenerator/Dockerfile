# First stage: Build dependencies
FROM python:3.11.1-slim@sha256:1591aa8c01b5b37ab31dbe5662c5bdcf40c2f1bce4ef1c1fd24802dae3d01052 as builder

# Set working directory
WORKDIR /app

# Copy requirements and source files
COPY requirements.txt .
COPY locustfile.py .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Second stage: Create the final image
FROM python:3.11.1-slim

# Set working directory
WORKDIR /app

# Copy the installed dependencies from the builder stage
COPY --from=builder /usr/local /usr/local

# Copy the source files
COPY locustfile.py .

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["locust", "-f", "locustfile.py"]
