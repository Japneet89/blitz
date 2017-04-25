# A Python 3 Amazon Product Advertising API Wrapper
import bottlenose

# A library for parsing the XML bytestring that the
# Amazon Product Advertising API returns.
from bs4 import BeautifulSoup

# Declare AWS account variables
# Note that bottlenose is able to read these credentials from the
# environment variables as well, as an alternative.
AWS_ACCESS_KEY_ID = "AKIAILMBKWFE4D6QDNWA"
AWS_SECRET_ACCESS_KEY = "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"
AWS_ASSOCIATE_TAG = "benderapps-20"

# Begin session
#
# Note that we specify the max queries per second, so that we stay in
# Amazon's query limit
# 
# Note also that specifying Parser means that amazon.ItemSearch returns
# the parsed response, rather than raw bytestring (as it does otherwise)
# 
amazon = bottlenose.Amazon(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
                        AWS_ASSOCIATE_TAG, MaxQPS = 0.9
                        Parser=lambda text: BeautifulSoup(text,'xml'))


# Submit a keywords query, and save the response
#response = amazon.ItemSearch(Keywords="Philips Screwdriver", SearchIndex="All")

# Convert the response to a list of tuples
# ["keywords", tool1, tool2, ..., tool3]
# where, e.g., tool1 = (title, [features], formatted_price, ASIN)

if __name__=="__main__":
    print("To search for a specific item, use, e.g. `response = " + \
    "amazon.ItemLookup(ItemId=\"B007OZNUCE\")`")
    
    print("To search for items by keywords, use, e.g. `response = " +
    "amazon.ItemSearch(Keywords=\"Kindle 3G\", SearchIndex=\"All\")`")
    
    print("To search for similar items, use, e.g., `response = " + 
    "amazon.SimilarityLookup(ItemId=\"B007OZNUCE\")`")
