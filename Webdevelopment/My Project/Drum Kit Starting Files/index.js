var n=document.querySelectorAll(".drum");
for(var i=0;i<n.length;i++)
{n[i].addEventListener("click", handleClick);
}
function handleClick()
{ var btn=this.innerHTML;
makeSound(btn);
animation(btn);
}

document.addEventListener("keydown", function(event){
  makeSound(event.key);
  animation(event.key);
}
)
function animation(key)
{var k=document.querySelector("."+key);
k.classList.add("pressed");
setTimeout(function()
{k.classList.remove("pressed")},100)}


function makeSound(btn)
{
  switch(btn) {
    case "w":
    var audio=new Audio("sounds/tom-1.mp3");
    audio.play();
    break;
    case "a":
    var audio=new Audio("sounds/tom-2.mp3");
    audio.play();
    break;
    case "s":
    var audio=new Audio("sounds/tom-3.mp3");
    audio.play();
    break;
    case "d":
    var audio=new Audio("sounds/tom-4.mp3");
    audio.play();
    break;
    case "j":
    var audio=new Audio("sounds/crash.mp3");
    audio.play();
    break;
    case "l":
    var audio=new Audio("sounds/kick-bass.mp3");
    audio.play();
    break;
    case "k":
    var audio=new Audio("sounds/snare.mp3");
    audio.play();
    break;
    default: console.log(btn);

  }
}
