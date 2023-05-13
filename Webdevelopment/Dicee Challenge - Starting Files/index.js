var random1=Math.random();
random1=random1*6;
random1=Math.floor(random1)+1;
var rimage="images/dice"+random1+".png";
document.querySelectorAll("img")[0].setAttribute("src", rimage);
var r1=Math.floor(Math.random()*6)+1;
var ri="images/dice"+r1+".png";
document.querySelectorAll("img")[1].setAttribute("src", ri);
if(random1 > r1)
{document.querySelector("h1").innerHTML="Player 1 wins";
}
else if(random1<r1)
{document.querySelector("h1").innerHTML="Player 2 wins";
}
else
{ document.querySelector("h1").innerHTML="Draw !";
}
