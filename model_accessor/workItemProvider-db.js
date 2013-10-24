var mongoskin = require('mongoskin');

function date2Str(date) {
  if (date instanceof Date) {
    var array = [date.getFullYear() , date.getMonth()+1 , date.getDate() ]
      return array.join('/')
  }
  return "";
}

WorkItemProvider = function(){
  var connStr = 'mongodb://localhost/sampleDB'
  if(GLOBAL.connStr) connStr = GLOBAL.connStr
  this.db = mongoskin.db(connStr, {safe:true})
}

/** Begin
 *  add all function definition here
 */

WorkItemProvider.prototype.delWorkItem= function(id, callback) {
  var oid = this.db.bson_serializer.ObjectID(id)
  //this.db.collection('workitem').remove({"_id":oid}, callback)
  this.db.collection('workitem').findAndRemove({"_id":oid},[['title',1]], callback)
}

WorkItemProvider.prototype.addWorkItem= function(obj, callback) {
  this.db.collection('workitem').insert(obj,{},callback)
}

WorkItemProvider.prototype.allWorkItemsByCreated= function(callback) {
  this.db.collection('workitem').find().sort({created_at:-1}).toArray(function(err, result) {
    if(err)
      callback(err, result)
    else
      callback(null, result)
  })
}

WorkItemProvider.prototype.allWorkItems= function(callback) {
  this.db.collection('workitem').find().toArray(function(err, results) {
    if(err)
      callback(err, results)
    else
    {
      results.forEach(function(elem, index, array){
        elem.created_at = date2Str(elem.created_at)
        elem.dueDate = date2Str(elem.dueDate)
        elem.lastChange = date2Str(elem.lastChange)
      })
      callback(null, results)
    }
  })
}

/** End */

exports.WorkItemProvider = WorkItemProvider
