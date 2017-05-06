# A Python 3 Amazon Product Advertising API Wrapper
import bottlenose

# A library for parsing the XML bytestring that the
# Amazon Product Advertising API returns.
from bs4 import BeautifulSoup

# Allows us to parse command-line arguments better
import argparse

# Allows us to create paths that aren't dependent on operating system
import os

## Function definitions
def toFlatFile(query, documents, directory):
    """
    Given a query and a list of document (the converted, formatted
    response from the Amazon API), save the string representations of
    the query and that list of documents to a text file in the directory
    specified.
    
    The filename will be the Keywords used to generate the query,
    and will have a .txt extension.
    Ex. Philips Screwdriver.txt
    """
    filename = query + ".txt"
    
    filepath = os.path.join(directory, filename)
    
    with open(filepath, "w") as f:
        f.write(repr(query))
        f.write("\n")
        f.write(repr(documents))
        print("Saved response to {}".format(filepath))

def startSession(AWS_ACCESS_KEY_ID = "AKIAILMBKWFE4D6QDNWA",
    AWS_SECRET_ACCESS_KEY = "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",
    AWS_ASSOCIATE_TAG = "benderapps-20",
    MaxQPS = 0.9,
    Parser=lambda text: BeautifulSoup(text,'xml')):
    """
    Instantiate and return a session, which can send queries to Amazon.
    
    MaxQPS defines the queries per second which are allowed during this
    session, and we set it to 0.9 to ensure that Amazon won't refuse
    to give us our results.
    
    Specifying Parser means that amazon.ItemSearch returns the parsed
    response, rather than raw bytestring.
    """
    print("Defining a new Amazon session")
    return bottlenose.Amazon(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
        AWS_ASSOCIATE_TAG, MaxQPS = MaxQPS, Parser=Parser)


def getResponse(keywords, session, SearchIndex="All", ResponseGroup="ItemAttributes,Offers"):
    """
    Submit a keywords query, and return the response.
    """
    print("""Sending query \"{}\" to Amazon using:
    SearchIndex \"{}\" 
    ResponseGroup \"{}\"""".\
        format(keywords, SearchIndex, ResponseGroup))
    return session.ItemSearch(Keywords=keywords,
        SearchIndex=SearchIndex,
        ResponseGroup = ResponseGroup)


def getQueryDocuments(response):
    """
    Given the response from Amazon, return a (query, documents) pair.
    
    query = "query"
    documents = [tool1, tool2, ..., tool3]
    where, e.g., tool1 = (title, [features], formatted_price, ASIN).
    
    """
    query = response.find("Keywords").text
    documents = []
    for item in response.find_all("Item"):
        features = []
        for feature in item.find_all("Feature"):
            features.append(feature.text)
        title = item.find("Title").text
        formatted_price = item.find("FormattedPrice").text
        ASIN = item.find("ASIN").text
        documents.append((title, features, formatted_price, ASIN))
    return query, documents

def getAndSaveResponse(keywords, directory):
    """
    Given a string of keywords, and a directory, create a new
    Amazon Products Advertising session, send a query for the keywords,
    and save the response to "keywords".txt in the given directory
    """
    session = startSession()
    response = getResponse(keywords, session)
    query, documents = getQueryDocuments(response)
    toFlatFile(query, documents, directory)

if __name__=="__main__":
    ## Begin script

    # Declare our argument parser
    parser = argparse.ArgumentParser(description=
    "Store Amazon API responses to DIR/\"keywords\".txt")

    # Include keyword and (optional) directory parsing
    parser.add_argument("keywords", metavar="keyword", type=str,
        nargs="+", help="keywords to pass to the Amazon API")
    parser.add_argument("--dir", help=
        "the directory to save the response to")

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
    
    getAndSaveResponse(keywords, directory)
