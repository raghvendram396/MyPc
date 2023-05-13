const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
var Worki=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB");
const ItemsSchema={name:String};
const Item=mongoose.model("Item",ItemsSchema);
const item1=new Item({name: "Welcome to your todo List"});
const item2=new Item({name:"Hit + to add new item"});
const item3=new Item({name:"Hit <-- to delete the item"});
const defaultitems=[item1,item2,item3];
app.get("/",function(req,res){
  Item.find({},function(err,founditems){
  if(founditems.length==0)
  { Item.insertMany(defaultitems,function(err) {
  if(err)
  console.log(err);
else
console.log("Success");
});
res.redirect("/");
}
else res.render("list",{title:"Today", newlistitem:defaultitems});
});
});
app.get("/work",function(req,res)
{    res.render("list",{title:"Work List",newlistitem:Worki});
});
app.get("/about",function(req,res){
res.render("about");
});
app.post("/",function(req,res)
{var item=req.body.listitem;
  console.log(req.body);
  if(req.body.list==="Work")
  {Worki.push(item);
    res.redirect("/work");
  }
  else
{items.push(item);
res.redirect("/");
}

});
app.listen(3000);
