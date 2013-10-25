
var Mdbc = require('../mdbc').Mdbc
var WorkItemProvider = require('../model_accessor/workItemProvider-db').WorkItemProvider

exports.getAllAPIs = function(req, res){
  res.render('restapilist')
};

exports.iUserResetPasswd = function(req, res){
  var mdbc = new Mdbc()
  mdbc.iUserResetPasswd( {
      name: req.param('name'),
      passwd: req.param('passwd'),
    }
    , function(err, result){
      if(err)
        throw err
      else {
        var msg = '[Udt] iUser'
        res.send(msg);
        console.log(msg)
        console.log(result)
      }
  })
};
exports.addiUser = function(req, res){
  var mdbc = new Mdbc()
  mdbc.addiUser( {
      name: req.param('name'),
      email: req.param('email'),
      passwd: '123456',
    }
    , function(err, result){
      if(err)
        throw err
      else {
        var msg = '[Add] iUser'
        res.send(msg);
        console.log(msg)
        console.log(result)
      }
  })
};

exports.authiUser = function(req, res){
  var mdbc = new Mdbc()
  var name = req.param("name")
  var passwd = req.param("passwd")
  var res1 = {auth:0, msg:'authentication failed!'}
  mdbc.authiUser(name, function(err, result) {
    if(!err && result && result.passwd && result.passwd===passwd) {
      res1.auth=1
      res1.msg='authenticated iUser!'
    }
    res.send(res1)
  })
};

exports.alliUsers = function(req, res){
  var mdbc = new Mdbc()
  mdbc.alliUsers(function(err, result) {
    res.send(result);
  })
};

exports.allWorkItems = function(req, res){
  var mdbc = new Mdbc()
  mdbc.allWorkItemsByCreated(function(err, result) {
    res.send(result);
  })
};

exports.addWorkItem = function(req, res){
  var mdbc = new Mdbc()
  mdbc.addWorkItem( {
      title: req.param('title'),
      desc: '',
      created_at: new Date()
    }
    , function(err, result){
      if(err)
        throw err
      else {
        var msg = '[Add] workitem'
        res.send(msg);
        console.log(msg)
        console.log(result)
      }
  })
};

exports.delWorkItem = function(req, res){
  var id = req.param('id')
  var workItemProvider = new WorkItemProvider()
  workItemProvider.delWorkItem( id , function(err, result){
    if(err) throw err
    var logmsg = '[Del] workitem' + id
    console.log(logmsg)
    res.send(logmsg)
  })
}
