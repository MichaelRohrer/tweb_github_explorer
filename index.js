//----------------------------------------------------------------------------------------------------------------------
// Server code:
//----------------------------------------------------------------------------------------------------------------------

var express = require('express');
var app = express();

var request = require('request-promise');
var MongoClient = require('mongodb').MongoClient;

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// assuming POST: name=foo&color=red            <-- URL encoding
//
// or       POST: {"name":"foo","color":"red"}  <-- JSON encoding

app.post('/application', function(req, res) {
    var owner = req.body.owner,
        repo = req.body.repo;
});

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


function getApiContributorStat($http, vm, owner, repo) {

    var url = "https://api.github.com";
    var repos = "/repos";
    var stats = "/stats";
    var contributors = "/contributors";

    var fullurl = url + repos + owner + repo + stats + contributors;

    //Get contributors list with additions, deletions, and commit counts
    $http.get(fullurl)
        .then(function(response) {
            vm.data = response.data;
            formatContributorStats(vm);
        });
}

function getApiPunchCardStats($http, vm, owner, repo){

    var url = "https://api.github.com";
    var repos = "/repos";
    var stats = "/stats";
    var contributors = "/punch_card";

    var fullurl = url + repos + owner + repo + stats + contributors;


    //Get contributors list with additions, deletions, and commit counts
    $http.get(fullurl)
        .then(function(response) {

            vm.punchCard = response.data;
            formatPunchCardStats(vm);
        });
}

function formatPunchCardStats(vm){

    vm.data1 = [0, 0, 0, 0, 0, 0, 0];
    vm.labels1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    vm.series1 = ["Series A"];

    var j = 0;
    for(var i = 0; i < 7; ++i){
        while(j < (i+1)*24){
            vm.data1[i] += vm.punchCard[j][2];
            j++;
        }
    }
}

function formatContributorStats(vm){

    var obj = angular.fromJson(vm.data);

    var data = [];
    var label = [];

    for(var i = 0; i < obj.length; ++i){
        label.push(obj[i].author.login);
        data.push(obj[i].total);
    }
    vm.labels = label;
    vm.data = data;
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
