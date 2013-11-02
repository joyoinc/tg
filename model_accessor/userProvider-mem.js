var bcrypt = require("bcrypt")

var iUsers = [
  {name:'xxd', passwd:'$2a$10$3jMz6eIqteQ8cHAHyby94OIcdvXBTUWBdArNnlIfLyEUhMjLyI2uC'} 
  , {name:'xzx', passwd:'$2a$10$4Rte3nQ4JQtC4UN6sv4l3.fMfi9KWJhLZxiEP/QiYg.IIvP014YVu'} 
  , {name:'zyy', passwd:'$2a$10$jNc3fYt1EiP7Ddp0DBPOsuxYnZk0zGwkpGpq3sneTVwlFMDMe0nCe'}
]

UserProvider = function(){}

/** Begin
 *  add all function definition here
 */

UserProvider.prototype.iUserResetPasswd= function(obj, callback) {
  iUsers.forEach(function(elem){
    if(elem.name===obj.name) {
      var salt = bcrypt.genSaltSync()
      elem.passwd = bcrypt.hashSync(obj.passwd, salt)
    }
  })
  callback(null, obj)
}

UserProvider.prototype.addiUser= function(obj, callback) {
  iUsers.push(obj)
  callback(null, obj)
}

UserProvider.prototype.authiUser= function(obj, callback) {
  res = {errCode:1, msg:'no such iuser'}
  iUsers.forEach(function(elem){
    if(elem.name===obj.name) {
      if(bcrypt.compareSync(obj.passwd, elem.passwd)) {
      //if(elem.passwd===obj.passwd) {
        res.errCode=0; res.msg="auth successful"
      }
      else{
        res.errCode=2; res.msg="auth failed"
      }
    }
  })
  callback(null, res)
}

UserProvider.prototype.alliUsers= function(callback) {
  callback(null, iUsers)
}
/** End */

exports.UserProvider = UserProvider
