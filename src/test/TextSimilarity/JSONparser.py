import json

def queryDocumentsToJSONString(query, documents):
    """
    Given the query and documents, converts these to the string
    representation of a JSON object, which is suitable for passing to
    `requests.post` as `data`.
    
    query must be a string.
    documents must be an iterable collection of tuples.
    Each tuple within documents must be of the form:
    
    (
     "titleString",
     ["feature1", ..., "featureN"],
     "formatted_price",
     "ASIN"
    )
    """
    
    payload = {}
    payload['query'] = query
    payload['items'] = []
    for doc in documents:
        documentDict = {}
        documentDict['title'] = doc[0]
        documentDict['formatted_price'] = doc[2]
        documentDict['ASIN'] = doc[3]
        features = []
        
        for feature in doc[1]:
            features.append(feature)
        documentDict['features'] = features
        
        payload['items'].append(documentDict)
    
    JSONString = json.dumps(payload)
    return JSONString
    
def JSONStringToQueryDocuments(JSONString):
    j = json.loads(JSONString)
    
    query = j['query']
    
    documents = []
    for doc in j['items']:
        features = []
        for feature in doc['features']:
            features.append(feature)
        documents.append(
            (
             doc['title'],
             features,
             doc['formatted_price'],
             doc['ASIN']
            )
        )
    
    return query, documents
