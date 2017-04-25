# A Python 3 Amazon Product Advertising API Wrapper
import bottlenose

# A library for parsing the XML that the Amazon Product Advertising API
# returns.
from bs4 import BeautifulSoup

# Declare AWS account variables
AWS_ACCESS_KEY_ID = "AKIAILMBKWFE4D6QDNWA"
AWS_SECRET_ACCESS_KEY = "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"
AWS_ASSOCIATE_TAG = "benderapps-20"


amazon = bottlenose.Amazon(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
                            AWS_ASSOCIATE_TAG)

if __name__=="__main__":
    print("To search for a specific item, use, e.g. `response = " + \
    "amazon.ItemLookup(ItemId=\"B007OZNUCE\")`")
    
    print("To search for items by keywords, use, e.g. `response = " +
    "amazon.ItemSearch(Keywords=\"Kindle 3G\", SearchIndex=\"All\")`")
    
    print("To search for similar items, use, e.g., `response = " + 
    "amazon.SimilarityLookup(ItemId=\"B007OZNUCE\")`")
