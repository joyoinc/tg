var express = require('express');
var routes= require('./routes')
var restapi= require('./routes/restapi')
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser('my$ecret'));
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

app.configure('production', function(){
  //GLOBAL.connStr = 'mongodb://heroku_app18564124:6558j5ooiplu2600d21rjrdj5n@ds049548.mongolab.com:49548/heroku_app18564124'
  GLOBAL.connStr = 'mongodb://xxd:xxd@ds049538.mongolab.com:49538/tinygroup'
  //var connStr = 'mongodb://xxd:xxd@ds049538.mongolab.com:49538/tinygroup'
  //var connStr = 'mongodb://heroku_app18564124:6558j5ooiplu2600d21rjrdj5n@ds049548.mongolab.com:49548/heroku_app18564124';

  app.use(express.errorHandler());
});

var checkiUser = function(req, res, next) {
  if(req.cookies && req.cookies.iUser){
    next();
  }
  else
    res.redirect('/')
}

app.get('/f/allRestfulApi', checkiUser, restapi.getAllAPIs)
app.get('/f/sendmail', checkiUser, routes.sendMail)
app.post('/f/sendmail', checkiUser, routes.doSendMail)

app.get('/r/encrypt/:str', restapi.encrypt)
app.get('/r/alliUsers', restapi.alliUsers)
app.get('/r/allWorkItems', restapi.allWorkItems)
app.post('/r/addWorkItem', restapi.addWorkItem)
app.post('/r/addiUser', restapi.addiUser)
app.delete('/r/delWorkItem/:id', restapi.delWorkItem)
app.put('/r/iUser/resetPasswd', restapi.iUserResetPasswd)
app.get('/r/iUser/auth/:name/:passwd', restapi.authiUser)

app.get('/workitem/new', checkiUser, routes.newItem)
app.get('/workitem/list/:live', routes.workItemList)
app.post('/workitem/new', routes.doNewItem)
app.get('/workitem/:id', routes.editItem)
app.put('/workitem/update/:id', routes.doEditItem)
app.put('/workitem/changeStatus/:id/:status', routes.doEditItemStatus)
app.post('/iUser/auth', routes.authUser)
app.get('/', routes.index)

var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('listening on ' + port)
})
