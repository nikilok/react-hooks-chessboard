FROM mhart/alpine-node:10.15.3
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PORT 80
ADD ./ /usr/src/app/
RUN npm i --production
RUN npm run build

# Clean up unwanted folders
RUN rm -rf src
RUN rm -rf public

EXPOSE ${PORT}
CMD [ "node", "server.js" ]
