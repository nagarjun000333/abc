var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
var mongoose = require("mongoose");
 mongoose.connect("mongodb://localhost/frndinfo");
//mongoose.connect("mongodb://antoo:randygold22@ds014388.mlab.com:14388/cora");
var friendSchema = new mongoose.Schema({
    name: String
});
var Friend = mongoose.model("Friend",friendSchema);
 Friend.create({
     name:"nagarjun"
 },function(err,friend){
     if(err){
         console.log("error found "+err);
     }else{
         console.log("stored in database");
         console.log(friend);
     }
 });
app.get("/friends",function(req,res){
    Friend.find({},function(err,friend){
        if(err){
            console.log(err);
        }else{
            res.render("friends.ejs",{friends:friend});
        }
    });
});
app.post("/redirect",function(req,res){
    var newfrnd = req.body.newfrnd;
    Friend.create(newfrnd,function(err,frnd){
        if(err){
            console.log(err);
        }else{
            res.redirect("/friends");
        }
    });
});
app.listen(3000,function(){
    console.log("connected to server");
});
