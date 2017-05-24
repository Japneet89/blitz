# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)

import argparse

import TextSimilarity.AmazonRequester as AmazonRequester
import fileToScores

if __name__ == "__main__":
    # Declare our argument parser
    parser = argparse.ArgumentParser(description=
    "Given keywords, get a response from Amazon, and score that " + \
    "response with the TextSimilarityEngine")

    # Include keyword and (optional) directory parsing
    parser.add_argument("keywords", metavar="keyword", type=str,
        nargs="+", help="keywords to pass to the Amazon API")
    parser.add_argument("--dir", help=
        "the directory to save the response to")
    
    # Parse the flag for offline processing.  If this flag is present,
    # do not send the scores through the REST API, but rather
    # instantiate a TextSimilarityEngine and call getTextSimilarityScores
    # directly.
    parser.add_argument("--offline", action='store_true', 
        help="call TextSimilarityEngine directly, bypassing the REST API")
        
    # Parse the flag to delete the query file after scoring the response
    parser.add_argument("--delete", action='store_true', 
        help="delete the saved Amazon response after retrieving a score")
    
    # Parse the command-line arguments
    args = parser.parse_args()


    # Join the given keywords into a single string
    keywords = str.join(" ", args.keywords)

    # Generate a filename from the joined keywords
    filename = keywords + ".txt"

    # If given, also get the provided directory
    # If a directory is not provided, the current working directory is used.
    if (args.dir):
        directory = args.dir
    else:
        directory = os.curdir
    
    
    
    # Get the query and documents to pass as input
    filepath = os.path.join(directory, keywords + ".txt")
    
    ## Get and save response from Amazon
    AmazonRequester.getAndSaveResponse(keywords, directory)
    
    ## Retrieve and print the scores from the TextSimilarityEngine
    fileToScores.retrieveAndPrintScores(filepath, vars(args)['offline'])
    
    
    
    
    # Delete the response from Amazon, if desired
    if vars(args)['delete']:
        os.remove(filepath)
        print("Deleted {}".format(filepath))
