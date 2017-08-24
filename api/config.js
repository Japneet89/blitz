'use strict';

import nconf from 'nconf';
import path from 'path';

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'DATA_BACKEND',
    'GOOGLE_APPLICATION_CREDENTIALS',
    'GCLOUD_PROJECT',
    'NODE_ENV',
    'PORT'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    DATA_BACKEND: 'datastore',
    GCLOUD_PROJECT: 'customer-4dat',
    PORT: 80
  });

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('PORT');
checkConfig('GOOGLE_APPLICATION_CREDENTIALS');

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}

export { nconf };