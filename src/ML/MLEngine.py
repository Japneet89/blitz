from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

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
        self.keywords = self.listOfTuples[0]
        self.performAnalysis()
        
    def performAnalysis(self):
        """
        Performs tf-idf calculations and stores the relevance scores
        """
        # Generate a corpus from the products
        # We will proceed under the assumption that each product is a
        # "document" formed by joining its:
        # (1) Title,
        # (2) Features
        corpus = []
        for tool in self.listOfTuples[1:]:
            # Concatenate the title with the features, separating by space
            corpus.append(str.join(" ", [tool[0], str.join(" ", tool[1])]))
                
        # Transform the corpus
        tfidfvectorizer = TfidfVectorizer()
        X = tfidfvectorizer.fit_transform(corpus)
        
        # Transform our keywords into the same space
        K = tfidfvectorizer.transform([self.keywords])
        
        # Perform a similarity query against the corpus, storing result
        # Note that since we perform one query, we index into [0]
        # Note also that we cast to a list, since numpy.ndarray is not
        # serializable
        self.scores = list(cosine_similarity(K, X)[0])
        
    def getScores(self):
        """
        Returns the scores that were calculated during instantiation
        """
        print(type(self.scores))
        return self.scores
