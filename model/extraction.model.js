import mongoose from "mongoose";

const extractionSchema = new mongoose.Schema({
     data:{
        type: mongoose.Schema.Types.Mixed,
        required: true
     },
     rawContent: {
        type: String,
        required: true,
     },
     CreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        req:true
     },
    },{
    timestamps:true
})

const extraction = mongoose.model("Extraction", extractionSchema)

export default extraction;