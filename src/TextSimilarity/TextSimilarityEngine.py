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
    
    
    def __validateInput(self, listOfTuples):
        if type(listOfTuples) is not list:
            return {'code': "TextSimilarityEngine-Validation-0001",
            'message': "expected a list, got %r" % type(listOfTuples)}
        
        if len(listOfTuples) <= 1:
            return {'code': "TextSimilarityEngine-Validation-0002",
            'message': "expected a list of length 2 or more, got list of length %r" \
            % len(listOfTuples)}
        
        if type(listOfTuples[0]) is not str:
            return {'code': 'TextSimilarityEngine-Validation-0003',
            'message': "query must be a str, is %r" % type(listOfTuples[0])}
        
        # For each of the items in the listOfTuples, after the query
        for item in listOfTuples[1:]:
            if type(item) is not tuple:
                return {'code': 'TextSimilarityEngine-Validation-0004',
                'message': "expected a tuple, got %r" % type(item)}
            
            if len(item) is not 4:
                return {'code': 'TextSimilarityEngine-Validation-0005',
                'message': "expected a tuple of length 4, got a tuple of length %r" \
                % len(item)}
            
            if type(item[0]) is not str:
                return {'code': 'TextSimilarityEngine-Validation-0006',
                'message': "title must be a str, is %r" % type(item[0])}
            if type(item[2]) is not str:
                return {'code': 'TextSimilarityEngine-Validation-0007',
                'message': "formatted_price must be a str, is %r" % type(item[2])}
            if type(item[3]) is not str:
                return {'code': 'TextSimilarityEngine-Validation-0008',
                'message': "ASIN must be a str, is %r" % type(item[3])}
            
            if type(item[1]) is not list:
                return {'code': 'TextSimilarityEngine-Validation-0009',
                'message': "expected a list of features, got %r" % type(item[1])}
            
            # For each of the features in the list of features
            for feature in item[1]:
                if type(feature) is not str:
                    return {'code': 'TextSimilarityEngine-Validation-0010',
                    'message': "feature must be a str, is %r" % type(feature)}
    
    def __performAnalysis(self, listOfTuples):
        """
        Performs tf-idf calculations and stores the relevance scores
        """
        # Generate a corpus from the products
        # We will proceed under the assumption that each product is a
        # "document" formed by joining its:
        # (1) Title,
        # (2) Features
        corpus = []
        for tool in listOfTuples[1:]:
            # Concatenate the title with the features, separating by space
            corpus.append(str.join(" ", [tool[0], str.join(" ", tool[1])]))
                
        # Transform the corpus
        tfidfvectorizer = TfidfVectorizer()
        X = tfidfvectorizer.fit_transform(corpus)
        
        # Transform our query into the same space
        K = tfidfvectorizer.transform([listOfTuples[0]])
        
        # Perform a similarity query against the corpus, storing result
        # Note that since we perform one query, we index into [0]
        # Note also that we cast to a list, since numpy.ndarray is not
        # serializable
        return list(cosine_similarity(K, X)[0])
        
    def getTextSimilarityScores(self, listOfTuples):
        """
        Given listOfTuples as an input, returns the text similarity
        scores in the same ordering.
        """
        val = self.__validateInput(listOfTuples)
        if val:
            return val
        
        return self.__performAnalysis(listOfTuples)
