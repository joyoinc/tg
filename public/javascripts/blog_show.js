$(document).ready(function(){
  $('#comments').delegate('i', 'click', function() {
      //console.log( $(this).index('i'));
      var index = $(this).index('i');
      var o = $(this).parent();
      var url = window.location.href + '/delComment';
      $.post(url, {idx: index}, function success(){
        console.log('server says ok');
        $(o).remove();
      });
  });
});
