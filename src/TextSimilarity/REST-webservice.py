from flask import Flask, request
from flask_restful import Resource, Api
import json

from JSONtuple import *
from TextSimilarityEngine import TextSimilarityEngine

app = Flask(__name__)
api = Api(app)

class getScore(Resource):
    def post(self):
        listOfTuples = j2t(json.loads(request.data))
        tse = TextSimilarityEngine(listOfTuples)
        return tse.getScores()

api.add_resource(getScore, '/')

if __name__ == '__main__':
    app.run(debug=True)
