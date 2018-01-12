FROM alpine
RUN apk add --no-cache curl

VOLUME /script
WORKDIR /script

COPY cluster-script.sh /script

RUN echo "0 6 * * * /script/cluster-script.sh" > cronjob \
&& crontab cronjob

CMD tail -F /dev/null
