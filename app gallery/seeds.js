var mongoose    = require("mongoose");
var place       = require("./models/place");
var  Comment    = require("./models/comment"); 
var data =[
   {
  name:"place",
  image:"https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  desc :"nice place, thx"
},
{
  name:"place",
  image:"https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  desc :"nice place, thx"
},
{
  name:"place",
  image:"https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  desc :"nice place, thx"
}
]
function seedDB() {
  place.deleteMany({},function (err) {
    if(err){
        console.log(err);
    }
    console.log("removed place");
data.forEach(function (seed) {
  place.create(seed,function (err,newplace) {
    if(err){
      console.log(err);
    }
    else{
      console.log("added place");
      //add comment
      Comment.create(
        { text:"good place thanks for sharing",
        author:"saku"

      },function (err, comment) {
        if(err){
          console.log(error);
        }
        newplace.comments.push(comment);
        newplace.save();
        console.log("added comment");
      }); //endcomment
    }
  });
  
});

});  




}

module.exports=seedDB;