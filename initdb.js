var Mdbc = require('./mdbc').Mdbc
var mdbc = new Mdbc()

mdbc.initWorkItem(function(err){
  if(err) throw err
  else console.log('insert ok')
})
