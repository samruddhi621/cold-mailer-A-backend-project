import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  fileName:{
    type:String,
    required:true
  },
   fileURL:{
    type:String,
    required:true
  },
   CreatedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
})

const File = mongoose.model("File",fileSchema)
export default File;