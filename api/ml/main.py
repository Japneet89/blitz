# handle importation of other modules
import sys

# Import packages from this project
from TextSimilarityEngine import TextSimilarityEngine
from AmazonClient import AmazonClient

def read_in():
	query = sys.stdin.readlines()[0]

if __name__ == '__main__':
	tse = TextSimilarityEngine()
	client = AmazonClient()
	documents = client.getDocuments(query)
	tse.getTextSimilarityScores(query, documents)