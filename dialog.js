
var current_dialog = DIALOG;

$(function(){
  $('.person').html(md(current_dialog['line']));
  drawVariants(current_dialog['variants']);
  bindVariants();
});

function drawVariants(variants){
  $('.variants').html('');
  for(i in variants){
    var variant = variants[i];
    if(!variant['used']){
      var li = $('<li/>',{'class':'variant','data-variant-id':i}).appendTo('.variants');
      $('<a/>',{href:'#'}).html(md(variant['reply'])).appendTo(li);
    }
  };
}

function bindVariants(){
  $('.variant').click(function(){
    current_dialog = current_dialog['variants'][$(this).attr('data-variant-id')];
    current_dialog['used'] = true;

    updateDialog(md(current_dialog['reply']));
    $('.person').html(md(current_dialog['line']));

    if(!current_dialog['variants']) current_dialog = DIALOG;

    drawVariants(current_dialog['variants']);
    bindVariants();
    return false;
  });
};

function updateDialog(text){
  $('<li/>').html($('.person').html()).appendTo('.dialog');
  $('<li/>').html(text).appendTo('.dialog');
};

function md(text) {
  return '&mdash; '+text;
}
