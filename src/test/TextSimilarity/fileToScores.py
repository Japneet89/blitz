# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)

import ast
import argparse
import json

from requests import post

from JSONparser import queryDocumentsToJSONString


def fileToQueryDocuments(path):
    with open(path, "r") as f:
        lines = f.readlines()
        query = ast.literal_eval(lines[0])
        documents = ast.literal_eval(lines[1])
    
    return query, documents
            

def readFile(path):
    with open(path, "r") as f:
        return f.read()


if __name__ == "__main__":
    # Declare our argument parser
    parser = argparse.ArgumentParser(description="A wrapper to score a (query, documents) pair")

    # Include file path to parse
    helpMsg = "a text file containing a query on its first line, and " \
    + "a list of tuples representing documents on its second line."
    parser.add_argument("file", metavar="file", type=str, nargs=1,
                    help=helpMsg)
    
    # Parse the flag for offline processing.  If this flag is present,
    # do not send the scores through the REST API, but rather
    # instantiate a TextSimilarityEngine and call getTextSimilarityScores
    # directly.
    parser.add_argument("--offline", action='store_true', 
        help="call TextSimilarityEngine directly, bypassing the REST API")
    
    # Parse the command-line arguments
    args = parser.parse_args()


    # If given, also get the provided file
    filepath = args.file[0]
    
    # Get the query and documents to pass as input
    query, documents = fileToQueryDocuments(filepath)
    
    # Format the query and documents as an acceptable JSON string
    data = queryDocumentsToJSONString(query, documents)
    
    # Get the scores from the TextSimilarityEngine
    if vars(args)['offline']:
        from TextSimilarity.TextSimilarityEngine import TextSimilarityEngine
        tse = TextSimilarityEngine()
        r = tse.getTextSimilarityScores(query, documents)
    else:
        r = post("http://localhost:5000/", data=data).json()
    
    if type(r) is dict:
        print("Error:")
        print(r['code'])
        print(r['message'])
    elif type(r) is list:
        print(r)

