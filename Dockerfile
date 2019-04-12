FROM mhart/alpine-node:10.15.3
# Create app directory
RUN mkdir -p /usr/src/app/build
WORKDIR /usr/src/app
ENV PORT 80
ADD build ./build
ADD server.js ./

EXPOSE ${PORT}
CMD [ "node", "server.js" ]
