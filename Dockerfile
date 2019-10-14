FROM go-rest-base:latest AS builder
# Build production binary
RUN go build -o /release ./...

# final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates 
COPY --from=builder /release /
CMD [ "/release" ]
LABEL Name=docker_go_rest Version=0.0.1