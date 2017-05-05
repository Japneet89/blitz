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
        

if __name__=='__main__':
    unittest.main()
