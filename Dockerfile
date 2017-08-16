FROM node:7

# install global npm modules
RUN npm install -g babel-cli
RUN npm install -g react-scripts

# copy whole source to /tmp directory and build everything
ADD . /tmp
WORKDIR /tmp
RUN ls .
RUN npm --unsafe-perm install
RUN babel -d ./build-server ./api 
RUN react-scripts build

# Copy application code.
RUN mkdir -p /app/server
RUN cp -R ./build-server/* /app/server
RUN cp -R ./build/* /app
RUN cp -a /tmp/node_modules /app/
RUN cp /tmp/customer-4dat-4753152d1880.json /app/
ENV GOOGLE_APPLICATION_CREDENTIALS customer-4dat-4753152d1880.json
RUN cp /tmp/errorsHandler.js /app/node_modules/gstore-api/lib
RUN cp -R ./api/ml /app/server/
RUN rm -rf /tmp/*

# Install python stuff
RUN apt-get update; \
    apt-get install -y \
      python python-pip \
      python-numpy python-scipy \
      build-essential python-dev python-setuptools \
      libatlas-dev libatlas3gf-base

RUN update-alternatives --set libblas.so.3 \
      /usr/lib/atlas-base/atlas/libblas.so.3; \
    update-alternatives --set liblapack.so.3 \
      /usr/lib/atlas-base/atlas/liblapack.so.3

RUN pip install -U scikit-learn
RUN pip install bs4
RUN pip install lxml
RUN pip install bottlenose

#change to /app directory
WORKDIR /app

#port
EXPOSE 80

# Run app
CMD ["node", "server/app.js"]
