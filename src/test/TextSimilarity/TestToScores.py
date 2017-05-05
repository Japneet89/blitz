# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)

from TextSimilarity.TextSimilarityEngine import TextSimilarityEngine
import ast
import argparse

def readFile(path):
    with open(path, "r") as f:
        return f.read()

def stringToScores(listOfTuples):
    return tse.getTextSimilarityScores(ast.literal_eval(listOfTuples))

tse = TextSimilarityEngine()

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
    r = stringToScores(readFile(filepath))
    if type(r) is dict:
        print("Error:")
        print(r['code'])
        print(r['message'])
    elif type(r) is list:
        print(r)
