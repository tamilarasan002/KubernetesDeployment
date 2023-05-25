
FROM golang:1.20.4-alpine@sha256:0a03b591c358a0bb02e39b93c30e955358dadd18dc507087a3b7f3912c17fe13 as builder
RUN apk add --no-cache ca-certificates git
RUN apk add build-base

WORKDIR /src

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o shippingservice .

EXPOSE 50051

CMD [ "./shippingservice" ]
