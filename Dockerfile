FROM node:7

# install modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm --unsafe-perm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/


# Copy application code.
WORKDIR /app
ADD ./api /app

#port
EXPOSE 80

# Run app
CMD ["node", "api.js"]