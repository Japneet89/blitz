'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');

// [START config]
const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
const kind = 'User';
// [END config]


function fromDatastore (obj) {
  obj.id = obj[Datastore.KEY].id;
  return obj;
}


function toDatastore (obj, nonIndexed) {
  nonIndexed = nonIndexed || [];
  const results = [];
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined) {
      return;
    }
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1
    });
  });
  return results;
}

// [START list]
function list (limit, token, cb) {
 
  const q = ds.createQuery(kind)
  ds.runQuery(q, (err, entities, nextQuery) => {
    if (err) {
      cb(err);
      return;
    }
    const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
    cb(null, entities.map(fromDatastore), hasMore);
  });
}
// [END list]


// [START update]
function update (id, data, cb) {
  let key;
  if (id) {
    key = ds.key([kind, parseInt(id, 10)]);
  } else {
    key = ds.key(kind);
  }
  
  const query = ds.createQuery('Group');
  ds.runQuery(query)
    .then(results => {
      
      const groups = results[0];
      var group = groups.filter(group => group[Datastore.KEY].id === data.group)
      data.group = group[0][Datastore.KEY]
    
      const entity = {
        key: key,
        data: toDatastore(data, ['description'])
      };
      console.log('updateeee')
      ds.save(
        entity,
        (err) => {
          data.id = entity.key.id;
          cb(err, err ? null : data);
        }
      );
    });
  
}
// [END update]

function create (data, cb) {
  update(null, data, cb);
}

function read (id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);

  ds.get(key, (err, entity) => {
    if (err) {
      cb(err);
      return;
    }
    if (!entity) {
      cb({
        code: 404,
        message: 'Not found'
      });
      return;
    }
    cb(null, fromDatastore(entity));
  });
}

function _delete (id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.delete(key, cb);
}

// [START exports]
module.exports = {
  create,
  read,
  update,
  delete: _delete,
  list
};
// [END exports]
