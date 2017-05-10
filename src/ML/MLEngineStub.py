import random

class MLEngine(object):
    """
    Accepts lists of tuples during instantiation, performs tf-idf
    calculations, and returns relevance scores as a list of floats.
    
    Ex. can be given ["keywords", tool1, tool2, ..., tool3], where
    tool1 = ("title", ["feature1", "feature2"], "formatted_price", "ASIN").
    
    Could return [0.87, 0.45, ..., 0.98].
    """
    def __init__(self, listOfTuples):
        self.listOfTuples = listOfTuples
        
    def getScores(self):
        """
        Returns the scores that were calculated during instantiation
        """
        scores = []
        for i in range(len(self.listOfTuples) - 1):
            scores.append(random.random())
        return scores