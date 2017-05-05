import unittest
from TextSimilarityEngine import TextSimilarityEngine

tse = TextSimilarityEngine()

class TestTextSimilarityEngine(unittest.TestCase):
    
    def test_outer_type(self):
        p = 'a'
        d = lambda x: {'code': "TextSimilarityEngine-Validation-0001",
            'message': "expected a list, got %r" % type(x)}
        self.assertEqual(tse.getTextSimilarityScores(p), d(p))
            
    def test_list_length(self):
        p1 = []
        p2 = [1]
        d = lambda x: {'code': "TextSimilarityEngine-Validation-0002",
        'message': "expected a list of length 2 or more, got list of length %r" \
        % len(x)}
        
        self.assertEqual(tse.getTextSimilarityScores(p1), d(p1))
        self.assertEqual(tse.getTextSimilarityScores(p2), d(p2))
    
    def test_query_string(self):
        p = [1,("title", ['f1', 'f2'], "$4.99", "B00005N5PF")]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0003',
        'message': "query must be a str, is %r" % type(x[0])}
        
        self.assertEqual(tse.getTextSimilarityScores(p), d(p))
    
    def test_item_tuple(self):
        p = ["1",["title", ['f1', 'f2'], "$4.99", "B00005N5PF"]]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0004',
            'message': "expected a tuple, got %r" % type(x)}
        
        for item in p[1:]:
            self.assertEqual(tse.getTextSimilarityScores(p), d(item))
    
    def test_item_length(self):
        p1 = ["1",("title", ['f1', 'f2'], "$4.99")]
        p2 = ["1",("title", ['f1', 'f2'], "$4.99", "B00005N5PF", "extra")]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0005',
            'message': "expected a tuple of length 4, got a tuple of length %r" \
            % len(x)}
        
        for p in [p1, p2]:
            for item in p[1:]:
                self.assertEqual(tse.getTextSimilarityScores(p), d(item))
    
    def test_item_title(self):
        p = ["1",(1234, ['f1', 'f2'], "$4.99", "B00005N5PF")]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0006',
            'message': "title must be a str, is %r" % type(x[0])}
            
        for item in p[1:]:
            self.assertEqual(tse.getTextSimilarityScores(p), d(item))
    
    def test_item_formatted_price(self):
        p = ["1",("title", ['f1', 'f2'], 4.99, "B00005N5PF")]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0007',
            'message': "formatted_price must be a str, is %r" % type(x[2])}
            
        for item in p[1:]:
            self.assertEqual(tse.getTextSimilarityScores(p), d(item))
    
    def test_item_ASIN(self):
        p = ["1",("title", ['f1', 'f2'], "$4.99", 12312)]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0008',
            'message': "ASIN must be a str, is %r" % type(x[3])}
            
        for item in p[1:]:
            self.assertEqual(tse.getTextSimilarityScores(p), d(item))
            
    def test_item_feature_list(self):
        p1 = ["1",("title", ('f1', 'f2'), "$4.99", "B00005N5PF")]
        p2 = ["1",("title", {'features': ['f1', 'f2']}, "$4.99", "B00005N5PF")]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0009',
            'message': "expected a list of features, got %r" % type(x[1])}
        
        for p in [p1, p2]:
            for item in p[1:]:
                self.assertEqual(tse.getTextSimilarityScores(p), d(item))
                
    def test_item_features_strings(self):
        p = ["1",("title", [2.2], "$4.99", "B00005N5PF")]
        d = lambda x: {'code': 'TextSimilarityEngine-Validation-0010',
            'message': "feature must be a str, is %r" % type(x)}
            
        for item in p[1:]:
            for feature in item[1]:
                self.assertEqual(tse.getTextSimilarityScores(p), d(feature))

                    
if __name__=='__main__':
    unittest.main()
