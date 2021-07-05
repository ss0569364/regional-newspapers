# regional-newspapers

As part of a student project in the module "B5.3 Unternehmenssoftware", the App for displaying local newsarticles was created. We use data from "Drucksachen" and "Berliner Tagesspiegel"

## 1. Hosted usage

You don't have to start the server and/or client and can simply head over to:  
[https://kiez-kultur.web.app](https://kiez-kultur.web.app)  to use our App! 8-)

Please note:
If you use this link, the newsarticle will not be stored in a local MongoDB. Newsarticles, which are already uploaded as json files will be used.


## 2. Local usage
To use our App on your local machine with the full backend functionality please use the following instruction:

## 2.1 Requirements

### Install MongoDB Community Server
Please head over to:
[https://www.mongodb.com/try/download/community?tck=docs_server](https://www.mongodb.com/try/download/community?tck=docs_server)
and install the latest community server version of MongoDB.

### Create new project folder

 1. create a folder for the project
 2. open a terminal and navigate to the folder
 3. run the following code:
`git clone https://github.com/ss0569364/regional-newspapers.git`

### MongoDB Setup

1. Create a Database called "USWS" on your localhost:27017 MongoDB
2. Import the Collection JSON files provided in the Table Files directory. (PLEASE NOTE: Name your Collections EXACTLY after the provided files. i.e. RssFeed.json into RssFeed Collection).

### Required Python libraries

You should find all pip install commands for the needed libraries in the representing python code file.
For Example: If PyMongo is needed to run the code you'll find the #pip install pymongo command as a comment behind the library import.

## 2.2 Start server (Backend)

Open an Anaconda prompt as Admin, navigate to the project folder (..\python\Backend\) and enter the following commands:
1. `set FLASK_APP=Backend.py`
2. `flask run`
3. optional: open "localhost:5000/newsarticles" in your browser to test the Backend.

## 2.3 Prepare Client

Open a command line window and navigate to the project folder. Then enter:
1. `cd regional-newspapers/client`
2. `npm install`
**Leave this terminal open to run the client in the next step! Please choose one of the following methods.**

## 2.4 Run Client Versions
Please choose ONE of the following methods to run the client on your machine:

## 2.4.1 Run Client WITHOUT ServiceWorker (No Offline Caching)
Simply run:
1. `npm start`
2. the client will automatically load into your browser

## 2.4.2 Run Client WITH ServiceWorker (With Offline Caching)

1. `npm run build`
2. `npm install -g serve`
3. `serve -s build`
4. copy the shown http://localhost:XXXXX address and paste it into your browser

## 3. SpaCy NER
You can find our trained model in the python\NER directory with the python scripts to generate SpaCy Training Data and the Jupyter Notebook (NER.ipynb) to start the training process and validate it with 2 example sentences.

## 4. To Do
You'll find an python\To Do directory, which shows which functionalities shall be implemented in the future.

## 5. Used DataSets
CREDIT KAGGLE DATASET: https://www.kaggle.com/rtatman/3-million-german-sentences?select=deu_news_2015_3M-sentences.txt
Downloaded for future uses to train our SpacY NER algorythm

## 6. Misc.
You can find a link to our Figma Click Dummy in the python\Click Dummy directory. Also we provided Deprecated and Testcode snippets which were replaced or used to test Stuff in the Deprecated, Test directory.

**PLEASE NOTE: The Python directory structure is explained in a seperate Readme.txt file which can be found in the python directory.**
