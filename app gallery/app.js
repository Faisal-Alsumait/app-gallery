var express        = require("express"),
    app            = express(),
    bodyparser     = require("body-parser"),
    mongoose       = require('mongoose'),
    passport       = require("passport"),
    localstrategy  = require("passport-local"),
    User           = require("./models/user"),
    place          = require("./models/place"),
    seeedDB        = require("./seeds"),
    Comment        = require("./models/comment");
    seeedDB();
mongoose.connect('mongodb://localhost:27017/place', {useNewUrlParser: true});

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static('public'));

//passport config

app.use(require("express-session")({
    secret:"do it fi 010",
    resave:false,
    saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//end passport config

app.use(function(req,res,next){
res.locals.username=req.user;
next();
});




app.get("/",function (req,res) {
    res.render("home");

})

app.get("/gallery",function(req,res) {
    //res.render("gallery",{photos:photos});
  // console.log( (Boolean)(Islogedin()));
  
  


  
    place.find({},function (err,allplaces) {
        if(err){
            console.log("Error")
        }
        else{
            res.render("gallery",{photos:allplaces});
        }
    });

});

app.post("/gallery", function(req,res){

    var creatplace ={
        name:req.body.name,
        image:req.body.image,
        desc: req.body.descreption
        
    };
    
    place.create(creatplace,function(err,createdplace){
        if (err) {
            console.log("error")
        }
        else{
            res.redirect("/gallery")
        }


    })


});


////////////////////
app.get("/gallery/:id",function (req,res) {

    

    place.findById(req.params.id).populate("comments").exec(function(err,placefound){
     if (err){
         console.log(err)
     }else{
         res.render("place",{photo:placefound});
     }


    });
    
    
});

app.get("/newplace", Islogedin,function(req,res){

    res.render("newplace");
    

});

////////////////
app.post("/gallery/:id/comments",function (req,res) {
    place.findById(req.params.id,function (err,place) {
        if(err){
            console.log(err);
            res.redirect("/gallery");
        }
        else{
    Comment.create(req.body.cooment,function (err,newcomment) {
        if(err){
            console.log(err);
        }
       else{
           place.comments.push(newcomment);
           place.save();
           res.redirect("/gallery/"+req.params.id);

       }
   
 });  

  }
}); 
});   


//regster rout
app.get("/register",function(req,res){
res.render("register");
});
app.post("/register",function(req, res){


   
var newUser = new User({ username: req.body.username});
User.register(newUser,req.body.password,function(err,user){
    if(err){
        console.log(err);
       return  res.render("register");
    }
passport.authenticate("local")(req,res,function(){
   
    res.redirect("/gallery");
    
});
});

});

app.get("/login",function(req,res){
       
    res.render("login");

});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/gallery",
    failureRedirect:"/login"
}),function(req,res){


});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/gallery");
});

function Islogedin(req,res,next){
    if(req.isAuthenticated()){
        return next();

    }
    res.redirect("/login");
}

app.listen(3000,function(){
    console.log("photo server start");
    
        });