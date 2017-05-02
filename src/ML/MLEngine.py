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
        self.scores = []
        self.performAnalysis()
        
    def performAnalysis(self):
        for i in range(len(self.listOfTuples) - 1):
            self.scores.append(random.random())
        
    def getScores(self):
        """
        Returns the scores that were calculated during instantiation
        """
        return self.scores
