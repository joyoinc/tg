var express = require('express');
var Mdbc = require('./mdbc').Mdbc
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

app.get('/s/allRestfulApi', checkiUser, restapi.getAllAPIs)
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

/*

app.get('/user/new', function(req, res) {
  res.render('user_new.jade', {
    title: 'New a user'
  });
});

app.post('/user/new', function(req, res){
  userAdmin.addUsers({
    account: req.param('account'),
    email: req.param('email'),
    passwd: '123456'
  }, function( error, docs) {
    res.redirect('/')
  });
});

app.get('/blog/:id', function(req, res) {
  articleProvider.findById(req.params.id, function(error, article) {
    res.render('blog_show.jade', {
        title: article.title,
        article:article
    });
  });
});

app.post('/blog/:id', function(req, res) {
  articleProvider.appendToArticle(req.params.id, {
    comment: req.param('content'),
    created_at: new Date()
  } , function( error, docs) {
       res.redirect('/blog/' + req.params.id)
  });
});

app.post('/blog/:id/delComment', function(req, res) {
  articleProvider.deleteCommentFromArticle(req.params.id, req.param('idx'),
    function( error, docs) {
      res.redirect('/blog/' + req.params.id)
  });
});

app.post('/blog/addComment', function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/blog/' + req.param('_id'))
       });
});
*/

var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('listening on ' + port)
})
