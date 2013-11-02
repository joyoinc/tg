var bcrypt = require("bcrypt")

var WorkItemProvider = require('../model_accessor/workItemProvider-db').WorkItemProvider
var UserProvider = require('../model_accessor/userProvider-mem').UserProvider

exports.getAllAPIs = function(req, res){
  res.render('restapilist')
};

exports.encrypt = function(req, res) {
  var str = req.param('str')
  var salt = bcrypt.genSaltSync()
  var hash = bcrypt.hashSync(str, salt)
  res.send(hash)
}

exports.iUserResetPasswd = function(req, res){
  var userProvider = new UserProvider()
  userProvider.iUserResetPasswd( { 
      name: req.param('name') ,
      passwd: req.param('passwd')
    }
    , function(err, result){
      if(err) throw err
      else {
        var logmsg = '[Udt] iUser'
        res.send(logmsg);
        console.log(logmsg)
        console.log(result)
      }
  })
};
exports.addiUser = function(req, res){
  var userProvider = new UserProvider()
  userProvider.addiUser( {
      name: req.param('name'),
      email: req.param('email'),
      passwd: '123456',
    }
    , function(err, result){
      if(err) throw err
      else {
        var logmsg = '[Add] iUser'
        res.send(logmsg);
        console.log(logmsg)
        console.log(result)
      }
  })
};

exports.authiUser = function(req, res){
  var userProvider = new UserProvider()
  userProvider.authiUser({
      name: req.param('name'),
      passwd : req.param("passwd")
    }
    , function(err, result) {
      if(err) throw err
      else {
        res.send(result.msg);
      }
  })
};

exports.alliUsers = function(req, res){
  var userProvider = new UserProvider()
  userProvider.alliUsers(function(err, result) {
    res.send(result);
  })
};

exports.allWorkItems = function(req, res){
  var workItemProvider = new WorkItemProvider()
  workItemProvider.allWorkItems(function(err, result) {
    res.send(result);
  })
};

exports.addWorkItem = function(req, res){
  var workItemProvider = new WorkItemProvider()
  var obj = { title: req.param('title')
    , statusCode : 5
    , lastChange : new Date()
  }
  workItemProvider.addWorkItem(obj , function(err, result){
    if(err) throw err
    else {
      var logmsg = '[Add] workitem'
      console.log(logmsg)
      console.log(result)
      res.send(logmsg);
    }
  })
};

exports.delWorkItem = function(req, res){
  var id = req.param('id')
  var workItemProvider = new WorkItemProvider()
  workItemProvider.delWorkItem( id , function(err, result){
    if(err) throw err
    var logmsg = '[Del] workitem'
    console.log(logmsg)
    console.log(id)
    res.send(logmsg)
  })
}
