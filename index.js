//----------------------------------------------------------------------------------------------------------------------
// Server code:
//----------------------------------------------------------------------------------------------------------------------

var express = require('express');
var app = express();

var request = require('request-promise');
var MongoClient = require('mongodb').MongoClient;

var Promise = require('promise');

//to support JSON-encoded bodies and URL-encoded bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Connection to the local database
//var uri = "mongodb://127.0.0.1:27017/github";
var uri = "mongodb://heroku_13hjrbgd:4edg2qi1c1rcs6g9rlnn0711c@ds063186.mlab.com:63186/heroku_13hjrbgd";

//GET:   /
//Return an html page which is the index.html page
app.get('/', function(request, response) {
    response.render('index.html');
});


//GET:   /stats
//Return a json object that contain statistics about the five most visited repositories
app.get('/stats', function(request, response) {

    var context = {};
    context.response = response;
    context.db_url = uri;
    console.log("Get Calling...");
    openDatabaseConnection(context)
        .then(getStats)
        .then(closeDatabaseConnection)
        .then(sendData);
});


//POST:  /stats
//Register the owner/repos in the database if it doesn't already exist.
//Then increase a counter which counts how many time the repository has been viewed on the site.
app.post('/stats', function(req, res) {

    //Fetch the posted data
    var owner = req.body.owner,
        repo = req.body.repo;

    //Prepare the json object to register in the database
    var views = 1;
    var context = {};
    context.db_url = uri;
    context.data = {owner: owner, repo: repo, views: views};

    //Add the fetched data to the context
    context.owner = owner;
    context.repo = repo;

    openDatabaseConnection(context)
        .then(saveApiData)
        .then(closeDatabaseConnection);
});

//To set the port
app.set('port', (process.env.PORT || 5000));

//To define the dir-name
app.use(express.static(__dirname + '/'));

//To start the server
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

//----------------------------------------------------------------------------------------------------------------------
// Functions:
//----------------------------------------------------------------------------------------------------------------------



function sendData(context){
    var array = {};
    var data = new Array();
    var labels = new Array();

    var i = 0;
    while(i < context.data.length && i < 5){
        data.push(context.data[i].views);
        labels.push('/' + context.data[i].owner + '/' + context.data[i].repo);
        ++i;
    }
    array.data = data;
    array.labels = labels;
    context.response.json(array);
}

function getStats(context) {

    console.log("Retrieving data...");
    var collection = context.db.collection("statistics");
    return new Promise(function (resolve, reject) {
        (collection.find({}).sort({ views: -1 }).toArray(function(err, res){
            //console.log(res);
            context.data = res;
            console.log("Data retrieved.");
            resolve(context);
        }));
    });
}


//Open the connection to the database
function openDatabaseConnection(context) {
    // what do I need? Connection options (server address, credentials)
    // what do I promise? A connection to the MongoDB server (mongoDB driver api)
    console.log("Open DB connection...")
    return MongoClient.connect(context.db_url)
        .then(function(db) {
            console.log("DB connection opened.");
            context.db = db;
            return context;
        });
}

//Save the data to the database
function saveApiData(context) {
    // what do I need? An array of TV shows + a connection to MongoDB
    // what do I promise? A confirmation that save operation has been processed or that data have been updated
    console.log("Saving data in MongoDB...");

    //Define the name of the collection in which data are stored
    var collection = context.db.collection("statistics");

    return new Promise(function (resolve, reject) {
        //Watch if the owner/repo has already been stored once
        collection.find({owner: context.owner, repo: context.repo}).toArray(function(err, res){
            if(err){
                reject(err);
            }
            else{
                //The owner/repo has never been visited yet
                if(res.length == 0) {
                    //The owner/repo is stored in the database with a number of view equals to one
                    return collection.insertOne(context.data)
                        .then(function() {
                            console.log("Data saved");
                            resolve(context);
                        });
                }
                //The owner/repo has already been visited once
                else {
                    //The number of time the repo has been viewed is incremented
                    return collection.findOneAndUpdate({owner: context.owner, repo: context.repo}, {$set: {views: res[0].views += 1}})
                        .then(function() {
                            console.log("Data updated");
                            resolve(context);
                        });
                }
            }
        });
    });
}

//Close the connection to the database
function closeDatabaseConnection(context) {
    // what do I need? A connection to MongoDB
    // what do I promise? A confirmation that DB connection has been closed
    console.log("Closing db connection...");
    return context.db.close()
        .then(function() {
            console.log("DB connection closed.");
            return context;
        });
}


