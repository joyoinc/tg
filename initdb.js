var Mdbc = require('./Mdbc').Mdbc
var mdbc = new Mdbc()

mdbc.initWorkItem(function(err){
  if(err) throw err
  else console.log('insert ok')
})
