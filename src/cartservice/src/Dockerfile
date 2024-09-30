FROM mcr.microsoft.com/dotnet/sdk:7.0.302@sha256:5c638e77052b5ae4f6f1da3885035b510fc379d2ce4be274c70679114bcdb936 as builder

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
