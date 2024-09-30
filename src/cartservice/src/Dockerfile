FROM mcr.microsoft.com/dotnet/sdk:7.0.302 as builder

FROM base as builder

WORKDIR /app

COPY CartService.csproj ./

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine3.13

WORKDIR /app

COPY --from=builder /app/out .

EXPOSE 7070

CMD [ "dotnet", "CartService.dll" ]
