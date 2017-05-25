FROM node:7

# install modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm --unsafe-perm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/


# Copy application code.
WORKDIR /app
ADD . /app

#port
EXPOSE 8080

# Run app
CMD ["node", "app.js"]