# Use the .NET SDK image for the builder stage
FROM mcr.microsoft.com/dotnet/sdk:7.0.302 as builder

WORKDIR /app

# Copy the project file and restore dependencies
COPY CartService.csproj .


RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Publish the application
RUN dotnet publish -c Release -o out

# Use the .NET runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine3.13

WORKDIR /app

# Copy the published output from the builder stage
COPY --from=builder /app/out .

# Expose the application port
EXPOSE 7070

# Command to run the application
CMD [ "dotnet", "CartService.dll" ]
