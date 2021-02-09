var mongoose = require("mongoose")
    passportLocalmongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    user:String,
    password: String
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
UserSchema.plugin(passportLocalmongoose);

module.exports= mongoose.model("User",UserSchema );