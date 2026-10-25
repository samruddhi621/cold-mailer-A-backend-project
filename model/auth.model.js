import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowecase : true
    },
     password : {
        type : String,
        required : true,  
    },
     Domain : {
        type : String,
        trim : true,
    },
     skills : [{
        type :String,
        trim : true,
     }],
     files :[{
        type:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "file",
            required : true
        }
     }],
     mails:[{
          type:mongoose.Schema.Types.ObjectId,
          ref: "Mail"
     }]
},
{timestamps : true})
const User = mongoose.model("user" , userSchema)
export default User