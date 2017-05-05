## Converts a JSON to a list of tuples, and vice versa

def t2j(t):
    ret = {}
    ret['keywords'] = t[0]
    ret['items'] = []
    for i in t[1:]:
        item = {}
        item['title'] = i[0]
        item['formatted_price'] = i[2]
        item['ASIN'] = i[3]
        features = []
        
        for f in i[1]:
            features.append(f)
        item['features'] = features
        
        ret['items'].append(item)
    
    return ret
    
def j2t(j):
    ret = []
    ret.append(j['keywords'])
    for i in j['items']:
        features = []
        for f in i['features']:
            features.append(f)
        ret.append((i['title'], features, i['formatted_price'], i['ASIN']))
    
    return ret
