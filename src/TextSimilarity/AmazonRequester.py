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


## Variable definitions
# Declare AWS account variables
# Note that bottlenose is able to read these credentials from the
# environment variables as well, as an alternative.
AWS_ACCESS_KEY_ID = "AKIAILMBKWFE4D6QDNWA"
AWS_SECRET_ACCESS_KEY = "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"
AWS_ASSOCIATE_TAG = "benderapps-20"

# Define our Response Groups, otherwise the Amazon API will not return
# tags that contain the information that we want.
ResponseGroup = "ItemAttributes,Offers"


## Begin script

# Declare our argument parser
parser = argparse.ArgumentParser(description="Store Amazon API responses to DIR/\"keywords\".txt")

# Include keyword and (optional) directory parsing
parser.add_argument("keywords", metavar="keyword", type=str, nargs="+",
                    help="keywords to pass to the Amazon API")
parser.add_argument("--dir", help="the directory to save the response to")

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


# Begin session
#
# Note that we specify the max queries per second, so that we stay in
# Amazon's query limit
#
# Note also that specifying Parser means that amazon.ItemSearch returns
# the parsed response, rather than raw bytestring (as it does otherwise)
# 
amazon = bottlenose.Amazon(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
                        AWS_ASSOCIATE_TAG, MaxQPS = 0.9,
                        Parser=lambda text: BeautifulSoup(text,'xml'))

# Submit a keywords query, and save the response
#
# Note that we specify our response group, or else the Amazon API
# will return a bare response that does not contain the info we want.
#
response = amazon.ItemSearch(Keywords=keywords,
            SearchIndex="All",
            ResponseGroup = ResponseGroup)


# Convert the response to a (query, documents) pair
# query = "query"
# documents = [tool1, tool2, ..., tool3]
# where, e.g., tool1 = (title, [features], formatted_price, ASIN)
#

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

toFlatFile(query, documents, directory)
