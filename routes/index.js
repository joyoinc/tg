
var restapi = require('./restapi')
//var WorkItemProvider = require('../model_accessor/workItemProvider-mem').WorkItemProvider
var WorkItemProvider = require('../model_accessor/workItemProvider-db').WorkItemProvider
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Home Page' });
};

exports.newItem = function(req, res){
  res.render('itemnew.jade', { title: 'New a work item' })
};

exports.editItem = function(req, res){
  var id = req.param('id')
  var workItemProvider = new WorkItemProvider()
  workItemProvider.findById(id, function(err, result){
    res.render('itemedit.jade', { title: 'Edit a work item', item:result })
  })
};

exports.doNewItem= function(req, res){
  var workItemProvider = new WorkItemProvider()
  var obj = { title: req.param('title')
    , dueDate: req.param('dueDate')
    , detailLink: req.param('detailLink')
    , statusCode : 1
    , lastChange : new Date()
  }
  workItemProvider.addWorkItem(obj, function(err, result){
    if(err) throw err
    var logmsg = '[Add] workitem'
    console.log(logmsg)
    console.log(result)
    res.redirect("/workitem/list")
  })
};

exports.doEditItemStatus = function(req, res){
  var id = req.param('id')
  var statusCode = req.param('status')
  var workItemProvider = new WorkItemProvider()
  var obj = { statusCode: statusCode
    , lastChange: new Date()
  }
  workItemProvider.udtWorkItem(id, obj, function(err, result){
    if(err) throw err
    var logmsg = '[Udt] workitem'
    console.log(logmsg)
    console.log(result)
  })
};

exports.doEditItem = function(req, res){
  var id = req.param('id')
  var workItemProvider = new WorkItemProvider()
  var obj = { title: req.param('title')
    , dueDate: req.param('dueDate')
    , detailLink: req.param('detailLink')
    , lastChange: new Date()
  }
  workItemProvider.udtWorkItem(id, obj, function(err, result){
    if(err) throw err
    var logmsg = '[Udt] workitem'
    console.log(logmsg)
    console.log(result)
    res.redirect("/workitem/list")
  })
};

exports.workItemList = function(req, res){
  var workItemProvider = new WorkItemProvider()
  workItemProvider.allWorkItemsByLastChange(function(err, result){
      if(err) throw err
      else {
        res.render('itemlist.jade', {items:result})
      }
  })
};

