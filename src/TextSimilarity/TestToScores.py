from TextSimilarityEngine import TextSimilarityEngine
import ast
import argparse

def readFile(path):
    with open(path, "r") as f:
        return f.read()

def stringToScores(listOfTuples):
    tse = TextSimilarityEngine(ast.literal_eval(listOfTuples))
    return tse.getScores()

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
    print(stringToScores(readFile(filepath)))
