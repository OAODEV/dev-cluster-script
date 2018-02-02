FROM alpine
# TODO: run from busyboxplus for curl
RUN apk add --no-cache curl

VOLUME /script
WORKDIR /script

# TODO: Read script from bind-mounted file
COPY cluster-script.sh /script

RUN echo '* 6 * * *    /script/cluster-script.sh' > /etc/crontabs/root

CMD crond -l 2 -f
