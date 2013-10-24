
var restapi = require('./restapi')
//var WorkItemProvider = require('../model_accessor/workItemProvider-mem').WorkItemProvider
var WorkItemProvider = require('../model_accessor/workItemProvider-db').WorkItemProvider
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Home Page' });
};

exports.newitem = function(req, res){
  res.render('itemnew.jade', { title: 'New a work item' })
};

exports.donewitem = function(req, res){
  restapi.addWorkItem(req, res)
  res.redirect("/")
};

exports.workitemlist = function(req, res){
  var workItemProvider = new WorkItemProvider()
  workItemProvider.allWorkItems(function(err, result){
      if(err) throw err
      else {
        res.render('itemlist.jade', {items:result})
      }
  })
};

