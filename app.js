
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , hoganA = require('./hogan-express')
  , hogan = require('hogan.js')
  , _ = require('underscore')

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register('html',hoganA.init(hogan));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.get('/engine',routes.engine);
app.get('/assets',routes.assets);

app.listen(3002);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
