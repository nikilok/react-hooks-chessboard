FROM mhart/alpine-node:10.15.3
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PORT 80
ADD ./build/ /usr/src/app/

EXPOSE ${PORT}
CMD [ "node", "server.js" ]
