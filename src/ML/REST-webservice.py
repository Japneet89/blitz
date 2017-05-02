from flask import Flask, request
from flask_restful import Resource, Api
import json

from JSONtuple import *
from MLEngine import MLEngine

app = Flask(__name__)
api = Api(app)

class getScore(Resource):
    def post(self):
        listOfTuples = j2t(json.loads(request.data))
        mle = MLEngine(listOfTuples)
        return mle.getScores()

api.add_resource(getScore, '/')

if __name__ == '__main__':
    app.run(debug=True)
