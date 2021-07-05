import os
import json
from time import sleep
import overpass #pip install overpass || Overpass API Python Wrapper

# =============================================================================
# PLEASE NOTE:
# The Overpass OSM API restricts REQUESTS with timeslots.
# To prevent Timeout Errors please use the implemented sleep lines or
# run a single API.GET Line
# =============================================================================

# Method to write the loaded JSON Information into local file to prevent API Timeouts and increase performance
def createJSONFile(data, filename):
    with open(filename+'.json', 'w') as outfile:
        json.dump(data, outfile)
    print('#Filename: ' + filename + '.json\n### CREATED SUCCESSFULLY ###\n#Location: ' + os.path.dirname(os.path.abspath(__file__)))
    
# # Initiate Overpass API and increase TIMEOUT ratio
api = overpass.API(timeout=600, debug=True)

# Following Codelines will call several API Requests to get the needed information.
parksJSON = api.get('(area[name="Berlin"];way["leisure"="park"](area);relation["leisure"="park"](area););', responseformat="json")
createJSONFile(parksJSON, 'parks')
sleep(600)

schoolsJSON = api.get('(area[name="Berlin"];nwr[amenity=school](area););', responseformat="json")
createJSONFile(schoolsJSON, 'schools')
sleep(600)

universitiesJSON = api.get('(area[name="Berlin"];nwr[amenity=university](area););', responseformat="json")
createJSONFile(universitiesJSON, 'universities')
sleep(600)

hospitalsJSON = api.get('(area[name="Berlin"];nwr[amenity=hospital](area););', responseformat="json")
createJSONFile(hospitalsJSON, 'hospitals')
sleep(600)

streetsJSON = api.get('area[name="Berlin"]; way(area)[highway][name];', responseformat="json")
createJSONFile(streetsJSON, 'streets')


