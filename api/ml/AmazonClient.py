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
        self.session = self.__startSession()

    def __startSession(self):
	AWS_ACCESS_KEY_ID = "AKIAILMBKWFE4D6QDNWA"
        AWS_SECRET_ACCESS_KEY = "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"
        AWS_ASSOCIATE_TAG = "benderapps-20"
        MaxQPS = 0.9
        Parser=lambda text: BeautifulSoup(text,'xml')
        """
        Instantiate and return a session, which can send queries to Amazon.
        
        MaxQPS defines the queries per second which are allowed during this
        session, and we set it to 0.9 to ensure that Amazon won't refuse
        to give us our results.
        
        Specifying Parser means that amazon.ItemSearch returns the parsed
        response, rather than raw bytestring.
        """
        #print("Defining a new Amazon session")
        return bottlenose.Amazon(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
            AWS_ASSOCIATE_TAG, MaxQPS = MaxQPS, Parser=Parser)


    def __getResponse(self, keywords, SearchIndex="All", ResponseGroup="ItemAttributes, Offers, Images"):
        """
        Submit a keywords query, and return the response.
        """
        return self.session.ItemSearch(Keywords=keywords,
		SearchIndex=SearchIndex, 
		ResponseGroup=ResponseGroup)


    def __getQueryDocuments(self, response):
        """
        Given the response from Amazon, return a list of tuples representing Amazon items.
        
        query = "query"
        documents = [tool1, tool2, ..., tool3]
        where, e.g., tool1 = (title, [features], formatted_price, ASIN).
        
        """
	#TODO: find better way to convert to strings
        documents = []
        for item in response.find_all("Item"):
            features = []
            for feature in item.find_all("Feature"):
                features.append(feature.text.encode('utf_8'))
            title = item.find("Title").text.encode('utf_8')
            formatted_price = item.find("FormattedPrice").text.encode('utf_8')
            #ASIN = item.find("ASIN").text.encode('utf_8')
            URL = item.find("DetailPageURL").text.encode('utf-8')
            documents.append((title, features, formatted_price, URL))
        return documents

    def getDocuments(self, keywords):
        """
        Given a string of keywords, return list of items and their scores
        """
        response = self.__getResponse(keywords)
        documents = self.__getQueryDocuments(response)
        return documents
