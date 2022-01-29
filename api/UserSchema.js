const mongoose = require("mongoose")
const {Schema}= mongoose;

const UserSchema= new Schema({
    firstname: {type:String},
    lastname: {type:String},
    email: {type:String},
    password: {type:String},
    image:{type:String}
})


const UsersCollection = mongoose.model("users",UserSchema)

module.exports= UsersCollection;