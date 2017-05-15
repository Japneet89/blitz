class Insights(object):
    def __init__(self):
        pass
    
    def getInsights(self, query, documents, scores):
        # Add header
        ret = "======= Start of Report =======\n\n"
        
        # Add the query
        ret += "Query: \"{}\"\n\n".format(query)
        
        # Add the raw scores
        ret += "Raw Scores: {}\n\n".format(scores)
        
        # Sort the documents and scores by the scores' descending order
        sortedScores, sortedDocuments = \
            zip(*sorted(zip(scores, documents), reverse=True))
            
        # Add the sorted scores
        ret += "Sorted scores:\n["
        for score in sortedScores:
            ret += "{:.4f},\n".format(score)
        ret = ret[:-2]
        ret += "]\n\n"
        
        # Add title of best match
        ret += "Best match ({:.4f}):\n{}\n".\
            format(sortedScores[0], sortedDocuments[0][0])
        for feature in sortedDocuments[0][1]:
            ret += "    {}\n".format(feature)
        ret += "\n"
        
        # Add title of worth match
        ret += "Worst match ({:.4f}):\n{}\n".\
            format(sortedScores[-1], sortedDocuments[-1][0])
        for feature in sortedDocuments[-1][1]:
            ret += "    {}\n".format(feature)
        ret += "\n"
        
        # Add footer
        ret += "======== End of Report ========\n"
        
        return ret
