
var Mdbc = require('../Mdbc').Mdbc

exports.getAllAPIs = function(req, res){
  res.render('restapilist')
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
      title: req.param('inputTitle'),
      desc: '',
      created_at: new Date()
    }
    , function(err, result){
      if(err)
        throw err
      else {
        var msg = 'Work Item Added!'
        res.send(msg);
        console.log(msg)
        console.log(result)
      }
  })
};

exports.delWorkItem = function(req, res){
  var mdbc = new Mdbc()
  var id = req.param('id')
  mdbc.delWorkItem( id , function(err, result){
      if(err)
        throw err
      else {
        var msg = 'Work Item Deleted!'
        res.send(msg);
        console.log(msg)
      }
  })
}
