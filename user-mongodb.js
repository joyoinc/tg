var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

UserAdmin = function(host, port) {
  this.db= new Db('node-mongo-blog',
    new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

UserAdmin.prototype.getCollection= function(callback) {
  this.db.collection('users', function(error, collection) {
    if( error ) callback(error);
    else callback(null, collection);
  });
};

UserAdmin.prototype.addUsers= function(users, callback) {
  this.getCollection(function(error, collection) {
    if( error ) callback(error)
    else {
      if( typeof(users.length)=="undefined" )
        users = [users];

      for( var i=0; i<users.length; i++ ) {
        user = users[i];
        user.created_at = new Date();
      }

      collection.insert(users, function() {
        callback(null, users);
      });
    }
  });
};

exports.UserAdmin = UserAdmin;
