from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

class TextSimilarityEngine(object):
    """
    Accepts lists of tuples during instantiation, performs tf-idf
    calculations, and returns relevance scores as a list of floats.
    
    Ex. can be given ["query", tool1, tool2, ..., tool3], where
    tool1 = ("title", ["feature1", "feature2"], "formatted_price", "ASIN").
    
    Could return [0.87, 0.45, ..., 0.98].
    """
    def __init__(self):
        # Since this is a stateless object, we do not store attributes
        pass
    
    def __makeMessage(self, code, message):
        return {'code': "TextSimilarityEngine-Validation-%04d" % code,
                'message': message}
    
    def __validateInput(self, query, documents):
        if len(documents) == 0:
            return self.__makeMessage(2,
            "expected a list of length 2 or more, got list of length 0")
        
        if type(query) is not str:
            return self.__makeMessage(3,
            "query must be a str, is {}".format(type(query)))
        
        for doc in documents:
            if type(doc) is not tuple:
                return self.__makeMessage(4,
                "expected a tuple, got {}".format(type(doc)))
            
            if len(doc) is not 4:
                return self.__makeMessage(5,
                "expected a tuple of length 4, got a tuple of length {}".\
                format(len(doc)))
            
            if type(doc[0]) is not str:
                return self.__makeMessage(6,
                "title must be a str, is {}".format(type(doc[0])))
            if type(doc[2]) is not str:
                return self.__makeMessage(7,
                "formatted_price must be a str, is {}".format(type(doc[2])))
            if type(doc[3]) is not str:
                return self.__makeMessage(8,
                "ASIN must be a str, is {}".format(type(doc[3])))
            
            if type(doc[1]) is not list:
                return self.__makeMessage(9,
                "expected a list of features, got {}".format(type(doc[1])))
            
            # For each of the features in the list of features
            for feature in doc[1]:
                if type(feature) is not str:
                    return self.__makeMessage(10,
                    "feature must be a str, is {}".format(type(feature)))
    
    def __performAnalysis(self, query, documents):
        """
        Performs tf-idf calculations and stores the relevance scores
        """
        # Generate a corpus from the products
        # We will proceed under the assumption that each product is a
        # "document" formed by joining its:
        # (1) Title,
        # (2) Features
        corpus = []
        for doc in documents:
            # Concatenate the title with the features, separating by space
            corpus.append(str.join(" ", [doc[0], str.join(" ", doc[1])]))
                
        # Transform the corpus
        tfidfvectorizer = TfidfVectorizer()
        X = tfidfvectorizer.fit_transform(corpus)
        
        # Transform our query into the same space
        K = tfidfvectorizer.transform([query])
        
        # Perform a similarity query against the corpus, storing result
        # Note that since we perform one query, we index into [0]
        # Note also that we cast to a list, since numpy.ndarray is not
        # serializable
        return list(cosine_similarity(K, X)[0])
        
    def getTextSimilarityScores(self, query, documents):
        """
        Given listOfTuples as an input, returns the text similarity
        scores in the same ordering.
        """
        val = self.__validateInput(query, documents)
        if val:
            return val
        
        return self.__performAnalysis(query, documents)
