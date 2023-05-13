var inp=document.querySelectorAll("input");
for(var i=0;i<inp.length;i++)
{
inp[i].addEventListener("click",function()
{
this.parentElement.style.textDecoration="line-through";
var k=this.parentElement;
setTimeout(function(){k.remove();},500);
var kk=$("input");
$(".ite").text(kk.length-2 +" items left");
});
}
