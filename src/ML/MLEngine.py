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
        self.kw = self.listOfTuples[0]
        self.scores = []
        self.performAnalysis()
        
    def performAnalysis(self):
        """
        Performs tf-idf calculations and stores the relevance scores
        """
        # Generate a corpus from the products
        # Transform the corpus
        # Transform our keywords into the same space
        # Perform a similarity query against the corpus, storing result
    
    def getScores(self):
        """
        Returns the scores that were calculated during instantiation
        """
        return self.scores
