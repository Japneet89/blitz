# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)

# Import other python packages
from flask import Flask, request, render_template
from flask_restful import Resource, Api, reqparse
# from pprint import pprint
# import json

# Import packages from this project
#from JSONparser import JSONStringToQueryDocuments
from TextSimilarityEngine import TextSimilarityEngine
from AmazonClient import AmazconClient
from Insights import Insights

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()
parser.add_argument('query', type=str, help='Query sent to Amazon')
args = parser.parse_args()

tse = TextSimilarityEngine()
client = AmazconClient()
insights = Insights()

class getScore(Resource):
    def get(self):    
        # Parse the request
        args = parser.parse_args()
        query = args['query']
        documents = client.getDocuments(query)
        scores = tse.getTextSimilarityScores(query, documents)
        
        print(insights.getInsights(query, documents, scores))
        return scores

api.add_resource(getScore, '/scores')


@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/submitted', methods=['POST'])
def submitted_form():
    query = request.form['query']

    return render_template(
        'submitted_form.html',
        query=query)

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'Error 500: An internal error occurred.', 500


if __name__ == '__main__':
    app.run(debug=True)