var mongoskin = require('mongoskin');

var Mdbc = function() {
  var connStr = 'mongodb://localhost/sampleDB'
  if(GLOBAL.connStr) connStr = GLOBAL.connStr
  this.db = mongoskin.db(connStr, {safe:true})
}

Mdbc.prototype.authiUser= function(userName, callback) {
  this.db.collection('iUser').findOne({"name":userName},{"name":1,"passwd":1},callback)
}

Mdbc.prototype.addiUser= function(iuser, callback) {
  this.db.collection('iUser').insert(iuser,{},callback)
}

Mdbc.prototype.iUserResetPasswd= function(iuser, callback) {
  this.db.collection('iUser').findAndModify({"name":iuser.name}, [["name", 1]], {$set:{"passwd":iuser.passwd}}, callback)
}

Mdbc.prototype.alliUsers= function(callback) {
  this.db.collection('iUser').find({},{name:1, passwd:1}).toArray(function(err, result) {
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
