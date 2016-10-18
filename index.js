//----------------------------------------------------------------------------------------------------------------------
// Server code:
//----------------------------------------------------------------------------------------------------------------------

var express = require('express');
var app = express();

var request = require('request-promise');
var MongoClient = require('mongodb').MongoClient;

var context = {};
context.db_url = "mongodb://0.0.0.0:27017/github";



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index.html');
});

/*server.post('/post.html', function(request, response) {
    context.data = request.body.p1;

    openDatabaseConnection(context)
        .then(saveApiData)
        .then(closeDatabaseConnection);
});*/


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


//----------------------------------------------------------------------------------------------------------------------
// Functions:
//----------------------------------------------------------------------------------------------------------------------

function saveApiData(context) {
    // what do I need? An array of TV shows + a connection to MongoDB
    // what do I promise? A confirmation that save operation has been processed
    console.log("Saving data in MongoDB...");
    var collection = context.db.collection("github");
    return collection.insertMany(context.data)
        .then(function(results) {
            console.log("Data saved");
            return context;
        });
}

function openDatabaseConnection(context) {
    // what do I need? Connection options (server address, credentials)
    // what do I promise? A connection to the MongoDB server (mongoDB driver api)
    console.log("Open DB connection...")
    return MongoClient.connect(context.db_url)
        .then(function(db) {
            console.log("DB connection opened");
            context.db = db;
            return context;
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
