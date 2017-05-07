FROM node:6-alpine

# Copy application code.
COPY . /app/

# Install dependencies.
RUN npm --unsafe-perm install

# Run app
CMD ["node", "/app/app.js"]