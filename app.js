var express = require('express')
	, http = require('http')
	, routes= require('./routes');

var app = express();

// all env
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use(express.cookieParser('my$ecret'));
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

// dev env
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

// prod env
app.configure('production', function(){
  app.use(express.errorHandler());
});

var checkiUser = function(req, res, next) {
  if(req.cookies && req.cookies.iUser){
    next();
  }
  else
    res.redirect('/')
}

/* to do 
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
*/
app.get('/', routes.index);
app.get('/q/:id', routes.question);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on ' + app.get('port'))
});
