//----------------------------------------------------------------------------------------------------------------------
// Server code:
//----------------------------------------------------------------------------------------------------------------------


//TWEB_2016

var express = require('express');
var app = express();

var request = require('request-promise');
var MongoClient = require('mongodb').MongoClient;

var Promise = require('promise');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var uri = "mongodb://mike10:TWEB_2016@ds061676.mlab.com:61676/heroku_90rq7346";
//var uri = "mongodb://127.0.0.1:27017/github"

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index.html');
});

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

app.post('/stats', function(req, res) {
    var owner = req.body.owner,
        repo = req.body.repo;
    console.log(owner, repo);

    var views = 1;
    var context = {};
    context.db_url = uri;
    context.data = {owner: owner, repo: repo, views: views};

    context.owner = owner;
    context.repo = repo;

    openDatabaseConnection(context)
        .then(saveApiData)
        .then(closeDatabaseConnection);
});

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


function saveApiData(context) {
    // what do I need? An array of TV shows + a connection to MongoDB
    // what do I promise? A confirmation that save operation has been processed
    console.log("Saving data in MongoDB...");
    var collection = context.db.collection("statistics");

    return new Promise(function (resolve, reject) {
        collection.find({owner: context.owner, repo: context.repo}).toArray(function(err, res){
            if(err){
                reject(err);
            }
            else{
                if(res.length == 0) {
                    return collection.insertOne(context.data)
                        .then(function() {
                            console.log("Data saved");
                            resolve(context);
                        });
                }
                else {
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


