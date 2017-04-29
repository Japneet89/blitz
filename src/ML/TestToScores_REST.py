import ast
import argparse
import json

from requests import post

from JSONtuple import *


def readFile(path):
    with open(path, "r") as f:
        return f.read()

def stringToScores(listOfTuples):
    mle = MLEngine(ast.literal_eval(listOfTuples))
    return mle.getScores()
    

if __name__ == "__main__":
    # Declare our argument parser
    parser = argparse.ArgumentParser(description="A wrapper to score a lists of tuples")

    # Include file path to parse
    parser.add_argument("file", metavar="file", type=str, nargs=1,
                    help="a text file containing a list of tuples")

    # Parse the command-line arguments
    args = parser.parse_args()


    # If given, also get the provided file
    filepath = args.file[0]
    
    # Construct a query and return the results
    listOfTuples = ast.literal_eval(readFile(filepath))
    payload = t2j(listOfTuples)
    r = post("http://localhost:5000/", data=json.dumps(payload))
    print(r.json())

