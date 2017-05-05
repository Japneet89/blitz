# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)

from TextSimilarity.TextSimilarityEngine import TextSimilarityEngine

from flask import Flask, request
from flask_restful import Resource, Api
from pprint import pprint
import json

from JSONparser import JSONStringToQueryDocuments


app = Flask(__name__)
api = Api(app)
tse = TextSimilarityEngine()

class getScore(Resource):
    def post(self):
        # Print the input
        pprint(json.loads(request.data))
        print("\n\n")
        
        # Parse the request
        query, documents = JSONStringToQueryDocuments(request.data)
        
        return tse.getTextSimilarityScores(query, documents)

api.add_resource(getScore, '/')

if __name__ == '__main__':
    app.run(debug=True)
