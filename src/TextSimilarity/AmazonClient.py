# A Python 3 Amazon Product Advertising API Wrapper
import bottlenose

# A library for parsing the XML bytestring that the
# Amazon Product Advertising API returns.
from bs4 import BeautifulSoup

# Allows us to parse command-line arguments better
import argparse

# Allows us to create paths that aren't dependent on operating system
import os

class AmazonClient(object):

    ## Function definitions
    def __init__(self):
        self.session = __startSession()

    def __startSession(AWS_ACCESS_KEY_ID = "AKIAILMBKWFE4D6QDNWA",
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


    def __getResponse(keywords, SearchIndex="All", ResponseGroup="ItemAttributes,Offers"):
        """
        Submit a keywords query, and return the response.
        """
        print("""Sending query \"{}\" to Amazon using:
        SearchIndex \"{}\" 
        ResponseGroup \"{}\"""".\
            format(keywords, SearchIndex, ResponseGroup))
        return self.session.ItemSearch(Keywords=keywords,
            SearchIndex=SearchIndex,
            ResponseGroup = ResponseGroup)


    def __getQueryDocuments(response):
        """
        Given the response from Amazon, return a (query, documents) pair.
        
        query = "query"
        documents = [tool1, tool2, ..., tool3]
        where, e.g., tool1 = (title, [features], formatted_price, ASIN).
        
        """
        documents = []
        for item in response.find_all("Item"):
            features = []
            for feature in item.find_all("Feature"):
                features.append(feature.text)
            title = item.find("Title").text
            formatted_price = item.find("FormattedPrice").text
            ASIN = item.find("ASIN").text
            documents.append((title, features, formatted_price, ASIN))
        return documents

    def getDocuments(keywords):
        """
        Given a string of keywords, and a directory, create a new
        Amazon Products Advertising session, send a query for the keywords,
        and save the response to "keywords".txt in the given directory
        """
        response = getResponse(keywords)
        documents = getQueryDocuments(response)
        return documents