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

function delWorkItem(_this) {
  var url = '/r/delWorkItem/' + $(_this).parent().attr('itemId')
  $.ajax(url, {type:'delete'}).done(function(data) {
    //console.log(data)
    $('a#itemlist').click()
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
