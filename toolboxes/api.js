// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const bodyParser = require('body-parser');

function getModel () {
  return require(`./model-${require('../config').get('DATA_BACKEND')}`);
}

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * GET /api/toolboxs
 *
 * Retrieve a page of toolboxes (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      nextPageToken: cursor,
      desc: 'returns all toolboxes',
      response: '200 application/json',
      items: entities
    });
  });
});

/**
 * POST /api/toolboxes
 *
 * Create a new toolbox.
 */
router.post('/', (req, res, next) => {
  getModel().create(req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      description: "create and returns a new toolbox using the posted object as the toolbox",
      response: "201 application/json",
      item: entity
    });
  });
});

/**
 * GET /api/toolboxes/:id
 *
 * Retrieve a toolbox.
 */
router.get('/:toolbox', (req, res, next) => {
  getModel().read(req.params.toolbox, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      description: "returns one toolbox represented by its id",
      response: "200 application/json",
      item: entity
    });
  });
});

/**
 * PUT /api/toolboxes/:id
 *
 * Update a toolbox.
 */
router.put('/:toolbox', (req, res, next) => {
  getModel().update(req.params.toolbox, req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      description: "updates and returns the matching toolbox with the posted update object",
      response: "200 application/json",
      item: entity
    });
  });
});

/**
 * DELETE /api/toolboxes/:id
 *
 * Delete a toolbox.
 **/
router.delete('/:toolbox', (req, res, next) => {
  getModel().delete(req.params.toolbox, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).json({
      description: "deletes and returns the matching toolbox",
      response: "200 application/json",
      item: entity.mutationResults[0]
    });
  });
});

/**
 * Errors on "/api/toolboxes/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code
  };
  next(err);
});

module.exports = router;
