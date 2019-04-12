FROM mhart/alpine-node:10.15.3
# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
ENV PORT 80

# Only installing those packages required by server.js here,
# as the CI installed the UI packages required for the build.
# This helps reduce the image size pushed on the registry to the lowest.
# Attention if you add newer packages required by server.js please intall them here too.
RUN npm i express path compression --production

# Add required content to the container
ADD build ./build
ADD server.js ./

EXPOSE ${PORT}
CMD [ "node", "server.js" ]
