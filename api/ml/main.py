# handle importation of other modules
import sys
import json

# Import packages from this project
from TextSimilarityEngine import TextSimilarityEngine
from AmazonClient import AmazonClient

if __name__ == '__main__':
	tse = TextSimilarityEngine()
	client = AmazonClient()
	query = sys.stdin.readlines()[0]
	documents = client.getDocuments(query)
	results = tse.getTextSimilarityScores(query, documents)
	output = '{"items":['
	for item in results:
		output = output + "{"+'"title":'+json.dumps(item[0])+','+'"price":"'+item[2]+'",'+'"url":"'+item[3]+'",'+'"score":"'+str(item[4])+'"},'
	
	output = output[:-1]
	output = output + "]}"
	print output
	