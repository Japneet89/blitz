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
                        AWS_ASSOCIATE_TAG, MaxQPS = 0.9,
                        Parser=lambda text: BeautifulSoup(text,'xml'))


# Define our Response Groups, so that we're not:
# (1) Using more bandwidth than we need to, and
# (2) Not making our parser work any harder than it has to.
ResponseGroup = "ItemAttributes,Offers"


# Submit a keywords query, and save the response
#
# Note that we specify our response group, or else the Amazon API
# will return a bare response that does not contain the info we want.
#
response = amazon.ItemSearch(Keywords="Philips Screwdriver",
            SearchIndex="All",
            ResponseGroup = ResponseGroup)


# Convert the response to a list of tuples
# ["keywords", tool1, tool2, ..., tool3]
# where, e.g., tool1 = (title, [features], formatted_price, ASIN)
#
ret = [response.find("Keywords").text]
for item in response.find_all("Item"):
    features = []
    for feature in item.find_all("Feature"):
        features.append(feature.text)
    title = item.find("Title").text
    formatted_price = item.find("FormattedPrice").text
    ASIN = item.find("ASIN").text
    ret.append((title, features, formatted_price, ASIN))
    
print(ret)

if __name__=="__main__":
    print("To search for a specific item, use, e.g. `response = " + \
    "amazon.ItemLookup(ItemId=\"B007OZNUCE\")`")
    
    print("To search for items by keywords, use, e.g. `response = " +
    "amazon.ItemSearch(Keywords=\"Kindle 3G\", SearchIndex=\"All\")`")
    
    print("To search for similar items, use, e.g., `response = " + 
    "amazon.SimilarityLookup(ItemId=\"B007OZNUCE\")`")
