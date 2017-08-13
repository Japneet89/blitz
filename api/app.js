import express from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import datastore from '@google-cloud/datastore';
import gstore from 'gstore-node';
import path from 'path';
import { nconf } from './config';
import { api as toolboxRouter } from './routers/toolbox';
import { api as drawerContainer } from './routers/drawer';
import { api as containerRouter }from './routers/container';
import {api as toolRouter } from './routers/tool';
import {router as mlRouter } from './routers/mlRouter';

//Configure google cloud datastore
const ds = datastore({
  projectId: nconf.get('GCLOUD_PROJECT'),
  //TODO: check if this is respected while on GKE
  keyFilename: nconf.get('GOOGLE_APPLICATION_CREDENTIALS')
});
gstore.connect(ds);

//Configure express app
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Used to verify Auth0 access token from frontend
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: "https://4dat-auth.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'api.tool4dat.com',
    issuer: 'https://4dat-auth.auth0.com/',
    algorithms: ['RS256']
});

/*Configure Routes - temp DEV
app.use('/api/v1', toolboxRouter);
app.use('/api/v1', drawerContainer);
app.use('/api/v1', containerRouter);
app.use('/api/v1', toolRouter);
*/

//Automatic routes for CRUD API against google datastore
app.use('/api/v1', authCheck, toolboxRouter);
app.use('/api/v1', authCheck, drawerContainer);
app.use('/api/v1', authCheck, containerRouter);
app.use('/api/v1', authCheck, toolRouter);

//ML prediction route
//TODO: switch back
app.use('/api/v1/groups/*/ml', authCheck, mlRouter);

//SPA route
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Error 404: Not Found');
});

// Basic 500 error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err || 'Error 500: Something broke!');
});

if (module === require.main) {
  const server = app.listen(nconf.get('PORT'));
}

export { app };

