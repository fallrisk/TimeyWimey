var express = require('express');
var path = require('path');
var router = express.Router();
var timestamp = require("./timestamp")
var RSVP = require("rsvp")
var Promise = RSVP.Promise
var fs = require("fs")
var path = require("path")
var marked = require("marked")

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Routes
////////////////////////////////////////////////////////////////////////////////

router.get("/", function(req, res, next){
  // Render the README file.
  var p = new Promise(function(res, rej){
    var fileData = fs.readFileSync(path.join(__dirname, "\\README.md"), "utf8")
    res(fileData)
  }).then(function(val){
    res.status(200).send(marked(val.toString()))
  })
})

router.get("/:userDate", function(req, res, next){
  var result = timestamp.getTimestamp(req.params.userDate)
  res.status(200).json(result)
})

app.use(router)

// Error Handlers
////////////////////////////////////////////////////////////////////////////////

// Development Error Handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production Error Handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
