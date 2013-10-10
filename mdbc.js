var mongoskin = require('mongoskin');

var Mdbc = function() {
  var connStr = 'mongodb://localhost/sampleDB'
  if(GLOBAL.connStr) connStr = GLOBAL.connStr
  this.db = mongoskin.db(connStr, {safe:true})
}

Mdbc.prototype.allWorkItems= function(callback) {
  this.db.collection('workitem').find().toArray(function(err, result) {
    callback(null, result)
  })
}

Mdbc.prototype.initWorkItem= function(callback) {
  var fix1 = [
  {title:'route /workitem/:id ', desc:'', created_at: new Date()},
  {title:'new workitem function', desc:'', created_at: new Date()}
  ]

  this.db.collection('workitem').insert(fix1,{},callback)
}

exports.Mdbc = Mdbc
