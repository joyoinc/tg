
var restapi = require('./restapi')
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
/*

exports.workitemlist = function(req, res){
  var mdbc = new Mdbc()
  mdbc.allWorkItemsByCreated(function(err, result){
      if(err) throw err
      else {
        res.render('itemlist.jade', { title: 'Workitem list', items:result})
      }
  })
};

*/
