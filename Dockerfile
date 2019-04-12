FROM mhart/alpine-node:10.15.3
# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
ENV PORT 80

# Add required folders/files to the container
ADD node_modules ./node_modules
ADD build ./build
ADD server.js ./

EXPOSE ${PORT}
CMD [ "node", "server.js" ]
