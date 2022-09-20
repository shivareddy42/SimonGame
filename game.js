
var buttonColors = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started=false;
//get the next nextSequence of color

function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //fade in and out
  $('#'+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  $('#level-title').text("level "+level);
  level=level+1;
  // $('#level-title').text("level "+level);
  // nextSequence();
}

//function Call
$('body').on('keydown',function(){
  if(!started){
    $('#level-title').text("Level "+level);
    nextSequence();
    started=true;
  }

})



//user Input
$('.btn').on('click',function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(this.id);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length -1 );
})


//sound
function playSound(name){
  var aud = new Audio('sounds/'+name+".mp3");
  aud.play();
}

//animation on click
function animatePress(currentColor){
  $('#'+currentColor).addClass("pressed");
  setTimeout(function(){
    $('#'+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log('success');
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    console.log('wrong');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
