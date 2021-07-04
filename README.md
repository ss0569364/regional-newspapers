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

## 2.2 Start server ( backend )

Open a Anaconda prompt as admon, navigate to the project folder and enter the following commands:
1. `cd python`
2. `set FLASK_APP=Backend.py`
3. `flask run`
4. optional: open "localhost:5000/@appRouteString" in your browser to test the app route string


## 2.3 Prepare Client

Use your open terminal from the step 2.1 (Rewuirements) or open a new one if you already closed it. If you closed the terminal please navigate back to your project folder and enter the following commands:
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
3.  `serve -s build`
4. copy the shown http://localhost:XXXXX address and paste it into your browser
