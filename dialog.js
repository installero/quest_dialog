var DIALOG = {
  words:'Привет, меня зовут Вадим Венедиктов!',
  variants:[{
    answer:'Я тут недавно пользовался вашим Таксовиком.',
    words:'Ну и как?',
    variants:[{
      answer:'Очень клёво! Всем друзьям рекомендую!',
      words:'Рад, что сделал полезный сервис. С тебя — пиво!',
      variants:[{
        answer:'Да без проблем!',
        words:'Хе-хе!'
      }]
    },{
      answer:'Нормально доехали! Но тарифы немного неточные.',
      words:'Ну да, таксопарки часто меняют тарифы. Нам постоянно об этом сообщают, мы обновляем информацию.',
      variants:[{
        answer:'Прикольно. А как с монетизацией?',
        words:'Да пока чё-то не очень.'
      }]
    }]
  },{
    answer:'Работу-то нашёл?',
    words:'Нашёл. Потом уволили, правда.',
    variants:[{
      answer:'Где работал?',
      words:'В «Аймобилко», технологом.',
      variants:[{
        answer:'Ого, это ты коллегой Чикуёнка был?',
        words:'Не совсем. Я работал над другим проектом.',
        variants:[{
          answer:'Над каким?',
          words:'Боюсь, это секрет.'
        }]
      },{
        answer:'Первый раз слышу',
        words:'Интернет-магазин по продаже мобильного контента. Ну, электронные книжки, фильмы, музыка, аудиокниги... Есть своя читалка для айфона и андройда.',
        variants:[{
          answer:'Ну и как тебе там?',
          words:'Весёлые ребята. Интересно было поработать.'
        }]
      }]
    }]
  },{
    answer:'Не женился ещё?',
    words:'Нет, пока. Мир-то не захвачен ещё.',
    variants:[{
      answer:'А девушка есть?',
      words:'Угу',
      variants:[{
        answer:'Познакомишь?',
        words:'Всему своё время.'
      }]
    }]
  }]
};

var current_dialog = DIALOG;

$(function(){
  $('.person').html('&mdash; '+current_dialog['words']);
  drawVariants(current_dialog['variants']);
  bindVariants();
});

function drawVariants(variants){
  $('.variants').html('');
  for(i in variants){
    var variant = variants[i];
    if(!variant['used']){
      var li = $('<li/>',{'class':'variant','data-variant-id':i}).appendTo('.variants');
      $('<a/>',{href:'#'}).html('&mdash; '+variant['answer']).appendTo(li);
    }
  };
}

function bindVariants(){
  $('.variant').click(function(){
    current_dialog = current_dialog['variants'][$(this).attr('data-variant-id')];
    current_dialog['used'] = true;

    updateDialog('&mdash; '+current_dialog['answer']);
    $('.person').html('&mdash; '+current_dialog['words']);

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
