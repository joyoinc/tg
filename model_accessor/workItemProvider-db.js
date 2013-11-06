var mongoskin = require('mongoskin');

function date2Str(date) {
  if (date instanceof Date) {
    var array = [date.getFullYear() , date.getMonth()+1 , date.getDate() ]
      return array.join('/')
  }
  return "";
}

function workitemSlug(workitem) {
  //workitem.dueDate = date2Str(workitem.dueDate)
  workitem.lastChange = date2Str(workitem.lastChange)
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

WorkItemProvider.prototype.allLiveWorkItemsByLastChange= function(callback) {
  this.db.collection('workitem').find({statusCode:{$in:[1,2,3,4,5]}})
  .sort({lastChange:-1}).toArray(function(err, results) {
    if(err)
      callback(err, results)
    else {
      results.forEach(function(elem, index, array){
        workitemSlug(elem)
      })
      callback(null, results)
    }
  })
}

WorkItemProvider.prototype.ownerFilterLiveWorkItemsByLastChange= function(ownerFilter, callback) {
  this.db.collection('workitem').find({owner:ownerFilter, statusCode:{$in:[1,2,3,4,5]}})
  .sort({lastChange:-1}).toArray(function(err, results) {
    if(err)
      callback(err, results)
    else {
      results.forEach(function(elem, index, array){
        workitemSlug(elem)
      })
      callback(null, results)
    }
  })
}

WorkItemProvider.prototype.ownerFilterFrozenWorkItems= function(ownerFilter, callback) {
  this.db.collection('workitem').find({owner:ownerFilter, statusCode:{$not:{$in:[1,2,3,4,5]}}})
  .sort({lastChange:-1}).toArray(function(err, results) {
    if(err)
      callback(err, results)
    else {
      results.forEach(function(elem, index, array){
        workitemSlug(elem)
      })
      callback(null, results)
    }
  })
}

WorkItemProvider.prototype.allFrozenWorkItems= function(callback) {
  this.db.collection('workitem').find({statusCode:{$not:{$in:[1,2,3,4,5]}}})
  .sort({lastChange:-1}).toArray(function(err, results) {
    if(err)
      callback(err, results)
    else {
      results.forEach(function(elem, index, array){
        workitemSlug(elem)
      })
      callback(null, results)
    }
  })
}

WorkItemProvider.prototype.allWorkItemsByLastChange= function(callback) {
  this.db.collection('workitem').find().sort({lastChange:-1}).toArray(function(err, results) {
    if(err)
      callback(err, results)
    else {
      results.forEach(function(elem, index, array){
        workitemSlug(elem)
      })
      callback(null, results)
    }
  })
}

WorkItemProvider.prototype.allWorkItems= function(callback) {
  this.db.collection('workitem').find().toArray(function(err, results) {
    if(err)
      callback(err, results)
    else {
      results.forEach(function(elem, index, array){
        workitemSlug(elem)
      })
      callback(null, results)
    }
  })
}

WorkItemProvider.prototype.findById= function(id, callback) {
  var oid = this.db.bson_serializer.ObjectID(id)
  this.db.collection('workitem').findOne({"_id":oid}, function(err, result){
    if(err) callback(err, result)
    else {
      workitemSlug(result)
      callback(null, result)
    }
  })
}

WorkItemProvider.prototype.udtWorkItem= function(id, obj, callback) {
  var oid = this.db.bson_serializer.ObjectID(id)
  this.db.collection('workitem').findAndModify({"_id":oid}, [['title',1]], {$set:obj}, {new:true}, function(err, result){
    if(err) callback(err, result)
    else {
      workitemSlug(result)
      callback(null, result)
    }
  })
}
/** End */

exports.WorkItemProvider = WorkItemProvider
