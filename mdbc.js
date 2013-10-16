var mongoskin = require('mongoskin');

var Mdbc = function() {
  var connStr = 'mongodb://localhost/sampleDB'
  if(GLOBAL.connStr) connStr = GLOBAL.connStr
  this.db = mongoskin.db(connStr, {safe:true})
}

Mdbc.prototype.delWorkItem= function(id, callback) {
  var oid = this.db.bson_serializer.ObjectID(id)
  this.db.collection('workitem').remove({"_id":oid}, callback)
}

Mdbc.prototype.addWorkItem= function(item, callback) {
  this.db.collection('workitem').insert(item,{},callback)
}

Mdbc.prototype.allWorkItems= function(callback) {
  this.db.collection('workitem').find().toArray(function(err, result) {
    if(err)
      callback(err, result)
    else
      callback(null, result)
  })
}

Mdbc.prototype.allWorkItemsByCreated= function(callback) {
  this.db.collection('workitem').find().sort({created_at:-1}).toArray(function(err, result) {
    if(err)
      callback(err, result)
    else
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
