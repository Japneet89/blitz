# handle importation of other modules
import sys
import os
par_par_dir = os.path.join(os.path.join('.', os.pardir), os.pardir)
sys.path.append(par_par_dir)


import unittest
from TextSimilarity.TextSimilarityEngine import *

tse = TextSimilarityEngine()

def makeMessage(code, message):
    return {'code': "TextSimilarityEngine-Validation-%04d" % code,
                'message': message}

class TestTextSimilarityEngine(unittest.TestCase):
    def test_query_string(self):
        q = 1
        d = [("title", ['f1', 'f2'], "$4.99", "B00005N5PF")]
        m = makeMessage(3,
        "query must be a str, is {}".format(type(q)))
        
        self.assertEqual(tse.getTextSimilarityScores(q, d), m)
    
    def test_item_tuple(self):
        q = "1"
        d = [["title", ['f1', 'f2'], "$4.99", "B00005N5PF"]]
        
        for item in d:
            m = makeMessage(4,
            "expected a tuple, got {}".format(type(item)))
            self.assertEqual(tse.getTextSimilarityScores(q, d), m)
    
    def test_item_length(self):
        q = "1"
        d1 = [("title", ['f1', 'f2'], "$4.99")]
        d2 = [("title", ['f1', 'f2'], "$4.99", "B00005N5PF", "extra")]
        
        for d in [d1, d2]:
            for item in d:
                m = makeMessage(5,
                "expected a tuple of length 4, got a tuple of length {}".\
                format(len(item)))
                self.assertEqual(tse.getTextSimilarityScores(q, d), m)
    
    def test_item_title(self):
        q = "1"
        d = [(1234, ['f1', 'f2'], "$4.99", "B00005N5PF")]
            
        for item in d:
            m = makeMessage(6,
            "title must be a str, is {}".format(type(item[0])))
            self.assertEqual(tse.getTextSimilarityScores(q, d), m)
    
    def test_item_formatted_price(self):
        q = "1"
        d = [("title", ['f1', 'f2'], 4.99, "B00005N5PF")]
            
        for item in d:
            m = makeMessage(7,
            "formatted_price must be a str, is {}".format(type(item[2])))
            self.assertEqual(tse.getTextSimilarityScores(q, d), m)
    
    def test_item_ASIN(self):
        q = "1"
        d = [("title", ['f1', 'f2'], "$4.99", 12312)]
        
        for item in d:
            m = makeMessage(8,
            "ASIN must be a str, is {}".format(type(item[3])))
            self.assertEqual(tse.getTextSimilarityScores(q, d), m)
            
    def test_item_feature_list(self):
        q = "1"
        d1 = [("title", ('f1', 'f2'), "$4.99", "B00005N5PF")]
        d2 = [("title", {'features': ['f1', 'f2']}, "$4.99", "B00005N5PF")]
        
        for d in [d1, d2]:
            for item in d:
                m = makeMessage(9,
                "expected a list of features, got {}".format(type(item[1])))
                self.assertEqual(tse.getTextSimilarityScores(q, d), m)
                
    def test_item_features_strings(self):
        q = "1"
        d = [("title", [2.2], "$4.99", "B00005N5PF")]
        
        for item in d:
            for feature in item[1]:
                m = makeMessage(10,
                "feature must be a str, is {}".format(type(feature)))
                self.assertEqual(tse.getTextSimilarityScores(q, d), m)

                    
if __name__=='__main__':
    unittest.main()
