$(document).ready(function(){
  $(".nav a").click(function(){
    $(".nav li").removeClass("active")
    $(this).parent().addClass("active")
    var destUrl = $(this).attr("href")
    if(destUrl==='#'){
      destUrl = $(this).attr("dest")
      $.get(destUrl, function(data){
        var htmls = data2htmlview(data, destUrl)
        $('.jumbotron').html(htmls)
      })
    }
  })
})

function data2htmlview(data, restapiname)
{
  var res = '';
  var func = restapiname.replace(/\//g,"_")
  try{
    res = window[func](data)
  }
  catch(err) {
    res = "error in data2htmlview"
  }
  return res;
}

function datetime2str(datetime) {
  var d = new Date(datetime)
  return d.getMonth()+1 + '/' + d.getDate() + '  ' + d.getHours() + ':' + d.getMinutes()
}

function strSlug(str) {
  return str ? str : ''
}

function dateSlug(str) {
  return str ? datetime2str(str) : ''
}

function _(data) {
  return 'Home Page'
}

function changeStatus(_tr, statusCode, callback) {
  var params = [ $(_tr).attr('itemId') , statusCode ]
  var url = '/workitem/changeStatus/' + params.join('/')
  $.ajax(url, {type:'put'}).done(function(data) { callback() })
}

function statusP1(_this) {
  var _tr = $(_this).parent()
  var s = parseInt($(_this).attr('status')) + 1
  if(s>5) s=1
  changeStatus(_tr, s, function(){
    $(_this).attr('status', s)
  })
}

function statusOpen(_this) {
  var _tr = $(_this).parent().parent()
  changeStatus(_tr, 1, function(){
    $(_tr).remove()
  })
}

function statusClose(_this) {
  var _tr = $(_this).parent().parent()
  changeStatus(_tr, 100, function(){
    $(_tr).remove()
  })
}

function edtWorkItem(_this) {
  var oTR = $(_this).parent().parent()
  var url = '/workitem/' + $(oTR).attr('itemId')
  document.location.href = url
}

function delWorkItem(_this) {
  var oTR = $(_this).parent().parent()
  var url = '/r/delWorkItem/' + $(oTR).attr('itemId')
  $.ajax(url, {type:'delete'}).done(function(data) {
    console.log('back 2')
    $(oTR).remove()
  })
}

function _r_allWorkItems(data) {
  var res = '';
  res += "<table class='table table-hover'><thead><tr>"
    + "<th class='col-md-1'> # </th>"
    + "<th class='col-md-8'> item title </th>"
    + "<th class='col-md-2'> create time </th>"
    + "<th class='col-md-1'>  </th></thead></tr>"
  for(var i=0; i<data.length; i++) {
    res += "<tr itemId=" + data[i]._id + ">"
    res += "<td>" + (i+1) + "</td>"
    res += "<td>" + strSlug(data[i].title) + "</td>"
    res += "<td>" + dateSlug(data[i].created_at) + "</td>"
    res += "<td onclick='delWorkItem(this)' > <span class='glyphicon glyphicon-trash'></span> </td>"
    res += "</tr>"
  }
  res += "</table>"
  return res;
}
