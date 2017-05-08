# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)

# Import other python packages
from flask import Flask, request, render_template
from flask_restful import Resource, Api, reqparse

# Import packages from this project
from TextSimilarityEngine import TextSimilarityEngine
from AmazonClient import AmazonClient
# from Insights import Insights

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()
parser.add_argument('query', type=str, help='Query sent to Amazon')

tse = TextSimilarityEngine()
client = AmazonClient()

class getScore(Resource):
    def post(self):    
        args = parser.parse_args()
        query = args['query']
        documents = client.getDocuments(query)
        scores = tse.getTextSimilarityScores(query, documents)
        
        return scores

api.add_resource(getScore, '/scores')


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'Error 500: An internal error occurred.', 500


if __name__ == '__main__':
    #TODO: do not expose dev server to world
    app.run(debug=True, host='0.0.0.0', port=8080)
