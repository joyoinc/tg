var iUsers = [
  {name:'xxd', passwd:'xxd'}
  , {name:'xzx', passwd:'xhx'}
]

UserProvider = function(){}

/** Begin
 *  add all function definition here
 */

UserProvider.prototype.iUserResetPasswd= function(obj, callback) {
  iUsers.forEach(function(elem){
    if(elem.name===obj.name) 
      elem.passwd = obj.passwd
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
      if(elem.passwd===obj.passwd) {
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
