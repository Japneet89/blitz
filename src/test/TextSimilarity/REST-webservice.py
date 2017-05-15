# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)

# Import other python packages
from flask import Flask, request
from flask_restful import Resource, Api
from pprint import pprint
import json

# Import packages from this project
from JSONparser import JSONStringToQueryDocuments
from TextSimilarity.TextSimilarityEngine import TextSimilarityEngine
from Insights import Insights

app = Flask(__name__)
api = Api(app)
tse = TextSimilarityEngine()
insights = Insights()

class getScore(Resource):
    def post(self):
        # Print the input
        pprint(json.loads(request.data))
        print("\n\n")
        
        # Parse the request
        query, documents = JSONStringToQueryDocuments(request.data)
        
        scores = tse.getTextSimilarityScores(query, documents)
        
        print(insights.getInsights(query, documents, scores))
        
        return scores

api.add_resource(getScore, '/')

if __name__ == '__main__':
    app.run(debug=True)
