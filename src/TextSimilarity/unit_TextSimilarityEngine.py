import unittest
from TextSimilarityEngine import TextSimilarityEngine

tse = TextSimilarityEngine()

class TestTextSimilarityEngine(unittest.TestCase):
    
    def test_outer_type(self):
        p = 'a'
        self.assertEqual(tse.getTextSimilarityScores(p),
            {'code': "TextSimilarityEngine-Validation-0001",
            'message': "expected a list, got %r" % type(p)})

if __name__=='__main__':
    unittest.main()
