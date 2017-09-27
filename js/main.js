function init(){
  getTheNumber();
  initSettings();
  setState(global.state);
  setInterations();
}

function initSettings(){
  global = window.global || {};
  global.theNumber = getTheNumber();
  global.distance = 0;
  global.entries = 2;
  global.state = 1;
  global.locations = [];
}

function setInterations(){
  $('#Log').click(function(){
    setState(2);
  });

  $('.Share').click(function(){
    setState(5);
  });

  $('.Back').click(function(){
    setState(global.state -1);
  });

  $('#Calculate').click(function(){
    handleLocationSubmit();
  });

  $('#Submit').click(function(){

    $.get("http://localhost:8888/LongWay/longway.php");

    global.theNumber += global.distance;
    showMessage("Thank you. You are mile " + global.theNumber + ". <a onclick='setState(5)' class='Share'>Mention this to friends.</a>", 10000);
    setState(1);
  });

}

function setState(state){

  global.state = state;
  resetState();

  //Home
  if (state == 1){
    $('.MainView').show();
    $('.Back').hide();

    $('.TheNumber').html(numberWithCommas(global.theNumber));

    $('.Intro').html('');
    $('.Outro').html('miles of movement to America.<br/><br/><h3> From ' + global.entries + ' entries.</h3>');
    $('.Intro').css('opacity', .5);

    $('.Actions').css('top', 240);
  }

  //Calculator
  if (state == 2){
    $('.SubmitView').show();
    $('.Back').show();

    $('.Intro').css('opacity', .5);

    $('.Actions').css('top', 280);
  }

  //Journey
  if (state == 3){

    $('.JourneyView').show();
    $('.Back').show();

    $('.Intro').html('');
    $('.TheNumber').html(numberWithCommas(global.distance));
    $('.Outro').html('miles');

    $('.TheNumber').css('opacity', 1);
  }

  if(state == 4){

  }

  //Share
  if (state == 5){
    $('.ShareView').show();
    $('.Back').show();

    $('.Intro').show();
    $('.Outro').show();

    $('.Intro').html('Twitter');
    $('.Outro').html('Facebook');

    //Set back button to go home
    global.state = 2;
  }

  else{
    return;
  }

}

function resetState(){
  $('.MainView').hide();
  $('.SubmitView').hide();
  $('.JourneyView').hide();
  $('.ShareView').hide();
}

function handleLocationSubmit(){
  console.log("Loctions submitted");
  //Validate
  var origin = $('#OriginInput').val();
  var destination = $('#OriginInput').val();

  if(origin.length > 0 && destination.length > 0){
    global.locations[0] = $('#OriginInput').val();
    global.locations[1] = $('#DestinationInput').val();
    initDistanceCalculator(global.locations);
  }

  else(
    showMessage("Hm, did you fill in both forms?")
  )

}

function showMessage(message, length){
  $('.Message').html(message);
  $('.Message').addClass('On');

  if(!length){ var length = 4000; }

  setTimeout(function(){
    $('.Message').removeClass('On');
  }, length);
}

function numberWithCommas(x) {
    x = parseInt(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

////

$( document ).ready(function() {
    init();
});
