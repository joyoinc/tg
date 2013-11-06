//var WorkItemProvider = require('../model_accessor/workItemProvider-mem').WorkItemProvider
var WorkItemProvider = require('../model_accessor/workItemProvider-db').WorkItemProvider
var UserProvider = require('../model_accessor/userProvider-mem').UserProvider
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Home Page' });
};

exports.newItem = function(req, res){
  res.render('itemnew.jade', { title: 'New a work item' })
};

exports.editItem = function(req, res){
  var id = req.param('id')
  var workItemProvider = new WorkItemProvider()
  workItemProvider.findById(id, function(err, result){
    res.render('itemedit.jade', { title: 'Edit a work item', item:result })
  })
};

exports.doNewItem= function(req, res){
  var workItemProvider = new WorkItemProvider()
  var obj = { title: req.param('title')
    , dueDate: req.param('dueDate')
    , owner: req.param('owner')
    , detailLink: req.param('detailLink')
    , statusCode : 1
    , lastChange : new Date()
  }
  workItemProvider.addWorkItem(obj, function(err, result){
    if(err) throw err
    var logmsg = '[Add] workitem'
    console.log(logmsg)
    console.log(result)
    res.redirect("/workitem/list/y")
  })
};

exports.doEditItemStatus = function(req, res){
  var id = req.param('id')
  var statusCode = req.param('status')
  statusCode = parseInt(statusCode)
  var workItemProvider = new WorkItemProvider()
  var obj = { statusCode: statusCode
    , lastChange: new Date()
  }
  workItemProvider.udtWorkItem(id, obj, function(err, result){
    if(err) throw err
    var logmsg = '[Udt] workitem'
    console.log(logmsg)
    console.log(result)
    res.send(result)
  })
};

exports.doEditItem = function(req, res){
  var id = req.param('id')
  var workItemProvider = new WorkItemProvider()
  var obj = { title: req.param('title')
    , dueDate: req.param('dueDate')
    , owner: req.param('owner')
    , detailLink: req.param('detailLink')
    , lastChange: new Date()
  }
  workItemProvider.udtWorkItem(id, obj, function(err, result){
    if(err) throw err
    var logmsg = '[Udt] workitem'
    console.log(logmsg)
    console.log(result)
    res.redirect("/workitem/list/y")
  })
};

exports.workItemList = function(req, res){
  var workItemProvider = new WorkItemProvider()
  var isLive = req.param('live') == 'y'
  var iUser = ''
  if(req.cookies && req.cookies.iUser) iUser = req.cookies.iUser
  var callback = function(err, result){
      if(err) throw err
      else {
        res.render('itemlist.jade', {items:result, user:iUser, live: isLive})
      }
  }
  if(isLive) {
    if(req.cookies && req.cookies.saUser)
      workItemProvider.allLiveWorkItemsByLastChange(callback)
    else
      workItemProvider.ownerFilterLiveWorkItemsByLastChange(iUser, callback)
  }
  else
    workItemProvider.allFrozenWorkItems(callback)
};

exports.authUser = function(req, res) {
  var userProvider = new UserProvider()
  var name = req.param('account')
  var passwd = req.param("passwd")
  userProvider.authiUser({ name:name, passwd:passwd }
    , function(err, result) {
      if(err) throw err
      else {
        res.clearCookie('iUser')
        if(result.errCode===0) {
          //console.log('pos1 ' + name)
          res.cookie('iUser', name, {maxAge:900000})
          if(name==='xxd')
            res.cookie('saUser', name, {maxAge:900000})
          else
            res.clearCookie('saUser')
        }
        res.redirect('/workitem/list/y')
      }
  })
};

exports.sendMail = function(req, res) {
  res.render('simplemail',{msg:{succ:'',fail:''}})
}

exports.doSendMail = function(req, res) {
  var nodemailer = require("nodemailer")
  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: { user: "super.int2013@gmail.com", pass: "SI2013@yx" }
  })
  smtpTransport.sendMail(
  /*
  {
    from: "super.int2013@gmail.com",
    to: "Yuan Zhi <zhi.yuan.skywalker@gmail.com>",
    subject: "Howdy!",
    text: "Check TG out: floating-mountain-2831.herokuapp.com",
    html: "Check <a href='http://floating-mountain-2831.herokuapp.com'>TG</a> out ",
    attachments:[
      {filePath: __dirname + "/a.txt"}
    ]
  }
  */
  {
    from: "super.int2013@gmail.com",
    to: req.param('receiver'),
    subject: req.param('subject'),
    text: req.param('body'),
  }
  , function(err, result){
    if(err) {
      console.log(err)
      res.render('simplemail',{msg:{succ:'',fail:'send failed!'}})
    }
    else {
      console.log("email sent:" + result.message)
      res.render('simplemail',{msg:{succ:'send ok!',fail:''}})
    }
  })
}
