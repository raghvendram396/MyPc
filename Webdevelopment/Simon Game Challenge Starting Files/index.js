var buttoncolors=["red","blue","green","yellow"];
var level=0;
var started=false;
var userClickedpattern=[];
var randomChosenColour ;
var gamepattern=[];
gamepattern.push(randomChosenColour);
document.addEventListener("keypress",function(){
  if (!started) {
//3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
     $("#level-title").text("Level " + level);
     nextSequence();
     started = true;
   }
});
function nextSequence()
{ level++;
$("#level-title").text("Level " + level);
  var random=Math.floor(Math.random()*4);
  randomChosenColour=buttoncolors[random];
  gamepattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
function playSound(randomChosenColour)
{ var audio=new Audio("sounds/"+randomChosenColour+".mp3");
audio.play() ;
}
// $("#"+randomChosenColour).fadeOut().fadeIn();
$(".btn").click(function()
{ var userChosenColor=$(this).attr("id");
userClickedpattern.push(userChosenColor);
checkanswer(userClickedpattern[userClickedpattern.length-1]);
}
)
function checkanswer(k)
{ if(k==gamepattern[gamepattern.length-1]);
  {$("#level-title").text("Success!");
   setTimeout(function()
 {nextSequence();},1000);
}
  else {$("#level-title").text("Wrong!");
gamepattern.clear();
userClickedpattern.clear();
started=false;
}
}
$(".btn").click(function(){
  var id=$(this).attr("id");
  var audio=new Audio("sounds/"+id+".mp3");
  audio.play();
});
$(".btn").click(function(){
  var id=$(this);
  id.addClass("pressed");
setTimeout(function(){id.removeClass("pressed");},100);
});
