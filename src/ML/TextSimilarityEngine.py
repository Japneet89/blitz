from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

class TextSimilarityEngine(object):
    """
    Accepts lists of tuples during instantiation, performs tf-idf
    calculations, and returns relevance scores as a list of floats.
    
    Ex. can be given ["keywords", tool1, tool2, ..., tool3], where
    tool1 = ("title", ["feature1", "feature2"], "formatted_price", "ASIN").
    
    Could return [0.87, 0.45, ..., 0.98].
    """
    def __init__(self, listOfTuples):
        try:
            self.validateInput(listOfTuples)
        except AssertionError:
            raise
        
        self.listOfTuples = listOfTuples
        self.keywords = self.listOfTuples[0]
        self.performAnalysis()
        
    def validateInput(self, listOfTuples):
        assert type(listOfTuples) is list, \
        "expected a list, got %r" % type(listOfTuples)
        
        assert len(listOfTuples) > 1, \
        "expected a list of length 2 or more, got list of length %r" \
        % len(listOfTuples)
        
        assert type(listOfTuples[0]) is str, \
        "keywords must be a str, is %r" % type(listOfTuples[0])
        
        # For each of the items in the listOfTuples, after the keywords
        for item in listOfTuples[1:]:
            assert type(item) is tuple, \
            "expected a tuple, got %r" % type(item)
            
            assert len(item) is 4, \
            "expected a tuple of length 4, got a tuple of length %r" \
            % len(item)
            
            assert type(item[0]) is str, \
            "title must be a str, is %r" % type(item[0])
            assert type(item[2]) is str, \
            "formatted_price must be a str, is %r" % type(item[2])
            assert type(item[3]) is str, \
            "ASIN must be a str, is %r" % type(item[3])
            
            assert type(item[1]) is list, \
            "expected a list of features, got %r" % type(item[1])
            
            # For each of the features in the list of features
            for feature in item[1]:
                assert type(feature) is str, \
                "feature must be a str, is %r" % type(feature)
    
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
        return self.scores
