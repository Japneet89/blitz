FROM node:7

# install npm modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm --unsafe-perm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Copy application code.
WORKDIR /app
ADD ./api /app
ADD ./build /app

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

#port
EXPOSE 80

# Run app
CMD ["./node_modules/.bin/babel-node", "app.js", "--presets es2015,stage-2"]