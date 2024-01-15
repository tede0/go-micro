FROM alpine:latest

RUN mkdir /app

COPY --from=builder /app/mailerApp /app

CMD ["/app/mailerApp"]