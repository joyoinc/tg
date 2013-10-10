
var Mdbc = require('../Mdbc').Mdbc
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.workitemlist = function(req, res){
  var mdbc = new Mdbc()
  mdbc.allWorkItems(function(err, result){
      if(err) throw err
      else {
        res.render('itemlist.jade', { title: 'Workitem list', items:result})
      }
  })
};
