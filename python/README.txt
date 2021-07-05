============================================================================================================================
# KIEZ KULTUR README APP

## 1. Directory Structure
The following lines will explain the directory structure.

## 1.1 Backend
Backend.py to run the Flask Server on localhost:5000.

## 1.2 Click Dummy
Link to our Figma click dummy prototype.

## 1.3 Deprecated, Test
Python Codes that have been replaced or were merely for testing purposes

## 1.4 Geo_Tagging
Classes and libraries to geo localize hospitals, parks, schools, streets & universities

## 1.5 NER
Python Code to generate Training Data for spacy and transform it into .spacy filetype. Also includes NER.ipynb to demonstrate
our trained NER SpaCy Model versus the normal german model.

## 1.6 Scraping:
Scraping Code for Tagesspiegel RSS Feed and Drucksachen from berlins district offices.

## 1.7 Table Files:
MongoDB Collections to import into your local MongoDB.

## 1.8 To Do:
Features that should be implemented where we ran out of time.


2. Coming soon
- include "Levenhstein Distance" into the geo localization process (levenhstein.py)
- optimize SpaCy NER with bigger dataset (generateSpacyFiles.py & deu_news_2015_3M-sentences.txt)
- set district polygon layer on map for district news
- implement missing frontend functions
