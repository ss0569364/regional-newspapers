import re
from dateutil import parser
from flask_cors import CORS #pip install flask-cors
from flask import Flask, jsonify #pip install Flask
from flask_pymongo import PyMongo #pip install Flask-PyMongo

# =============================================================================
# HOW TO USE BACKEND:
# 1. Start the Anaconda prompt as admin                                           
# 2. Mount drive with API file (cd ...)                                               
# 3. set FLASK_APP=Backend.py                                            
# 4. flask run                                                                  
# 5. open localhost:5000/@appRouteString                                        
# =============================================================================

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'USWS'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/USWS'
mongo = PyMongo(app)

@app.route("/newsarticles")
def getNewsarticles():
    newsarticles = mongo.db.RssFeed
    output = []
    for n in newsarticles.find():
        output.append({'Headline': n['Headline'], 'Link': n['Link'], 'Description': n['Description'], 'District': n['District'], 'GeoLAT': n['GeoLAT'], 'GeoLNG': n['GeoLNG'], 'pubDate': n['pubDate'], 'picLink': n['picLink']})
    returnList = sorted(output, key=lambda k: parser.parse(k['pubDate']), reverse=True)
    return jsonify(returnList)

@app.route("/filteredNews/<districts>")
def getFilteredNewsarticles(districts):
    output = []
    newsarticles = mongo.db.RssFeed
    districtArr = districts.split(',')
    for district in districtArr:
        districtQueue = re.compile('.*'+district+'.*', re.IGNORECASE)
        for n in newsarticles.find({'District': districtQueue}):
           output.append({'Headline': n['Headline'], 'Link': n['Link'], 'Description': n['Description'], 'District': n['District'], 'GeoLAT': n['GeoLAT'], 'GeoLNG': n['GeoLNG'], 'pubDate': n['pubDate'], 'picLink': n['picLink']})
    returnList = sorted(output, key=lambda k: parser.parse(k['pubDate']), reverse=True)
    return jsonify(returnList)

@app.route("/newsarticlesBerlin")
def getNewsarticlesBerlin():
    newsarticles = mongo.db.RssFeed
    output = []
    for n in newsarticles.find({'District': 'Berlin'}):
        output.append({'Headline': n['Headline'], 'Link': n['Link'], 'Description': n['Description'], 'District': n['District'], 'GeoLAT': n['GeoLAT'], 'GeoLNG': n['GeoLNG'], 'pubDate': n['pubDate'], 'picLink': n['picLink']})
    returnList = sorted(output, key=lambda k: parser.parse(k['pubDate']), reverse=True)     
    return jsonify(returnList)

@app.route("/printMaterials")
def getPrintMaterials():
    printMaterials = mongo.db.Drucksachen
    output = []
    for entry in printMaterials.find():
        output.append({'Headline': entry['Headline'], 'Link': entry['Link'], 'Description': entry['Description'], 'District': entry['District'], 'GeoLAT': entry['GeoLAT'], 'GeoLNG': entry['GeoLNG'], 'pubDate': entry['pubDate']})
    return jsonify(output)

@app.route("/filteredPrintMaterials/<districts>")
def getFilteredPrintMaterials(districts):
    output = []
    printMaterials = mongo.db.Drucksachen
    districtArr = districts.split(',')
    for district in districtArr:
        districtQueue = re.compile('.*'+district+'.*', re.IGNORECASE)
        for entry in printMaterials.find({'District': districtQueue}):
            output.append({'Headline': entry['Headline'], 'Link': entry['Link'], 'Description': entry['Description'], 'District': entry['District'], 'GeoLAT': entry['GeoLAT'], 'GeoLNG': entry['GeoLNG'], 'pubDate': entry['pubDate']})
    return jsonify(output)

@app.route("/getEverything")
def getEverything():
    output = []
    newsarticles = mongo.db.RssFeed
    for n in newsarticles.find():
        output.append({'Headline': n['Headline'], 'Link': n['Link'], 'Description': n['Description'], 'District': n['District'], 'GeoLAT': n['GeoLAT'], 'GeoLNG': n['GeoLNG'], 'pubDate': n['pubDate'], 'picLink': n['picLink']})
    printMaterials = mongo.db.Drucksachen
    for entry in printMaterials.find():
        output.append({'Headline': entry['Headline'], 'Link': entry['Link'], 'Description': entry['Description'], 'District': entry['District'], 'GeoLAT': entry['GeoLAT'], 'GeoLNG': entry['GeoLNG'], 'pubDate': entry['pubDate']})
    return jsonify(output)
    
@app.route("/filteredEverything/<districts>")
def getFilteredEverything(districts):
    output = []
    newsarticles = mongo.db.RssFeed
    printMaterials = mongo.db.Drucksachen
    districtArr = districts.split(',')
    for district in districtArr:
        districtQueue = re.compile('.*'+district+'.*', re.IGNORECASE)
        for n in newsarticles.find({'District': districtQueue}):
            output.append({'Headline': n['Headline'], 'Link': n['Link'], 'Description': n['Description'], 'District': n['District'], 'GeoLAT': n['GeoLAT'], 'GeoLNG': n['GeoLNG'], 'pubDate': n['pubDate'], 'picLink': n['picLink']})
        for entry in printMaterials.find({'District': districtQueue}):
            output.append({'Headline': entry['Headline'], 'Link': entry['Link'], 'Description': entry['Description'], 'District': entry['District'], 'GeoLAT': entry['GeoLAT'], 'GeoLNG': entry['GeoLNG'], 'pubDate': entry['pubDate']})
    return jsonify(output)

