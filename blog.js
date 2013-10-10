var express = require('express');
var ArticleProvider = require('./articleprovider-mongodb').ArticleProvider;
var UserAdmin = require('./user-mongodb').UserAdmin;
//var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var articleProvider= new ArticleProvider('localhost',27017);
var userAdmin= new UserAdmin('localhost',27017);
//var articleProvider= new ArticleProvider();

app.get('/', function(req, res){
  articleProvider.findAll( function(error,docs){
    res.render('index.jade', { 
      title: 'Blog Home',
      articles:docs
    });
  });
});

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

app.get('/blog/new', function(req, res) {
  res.render('blog_new.jade', {
    title: 'New Post'
  });
});

app.post('/blog/new', function(req, res){
  articleProvider.save({
    title: req.param('title'),
    body: req.param('body')
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

app.listen(3000);
