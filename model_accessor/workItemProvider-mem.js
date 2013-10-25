var data = [
  { title:'title 1'
    , detailLink:'https://www.dropbox.com/s/dvsv8ckqo3e6spb/.vimrc'
    , statusCode:1
    , dueDate:'2013/11/15'
    , lastChange:'2013/10/23'},
  { title:'workItemProvider-db impl'
    , statusCode:1
    , dueDate:'2013/11/15'
    , lastChange:'2013/10/23'},
  {}
]


WorkItemProvider = function(){}

/** Begin
 *  add all function definition here
 */

WorkItemProvider.prototype.delWorkItem= function(id, callback) {}

WorkItemProvider.prototype.addWorkItem= function(obj, callback) {}

WorkItemProvider.prototype.allWorkItemsByLastChange= function(callback) {}

WorkItemProvider.prototype.allWorkItems= function(callback) {
  callback(null, data)
}

/** End */

exports.WorkItemProvider = WorkItemProvider
