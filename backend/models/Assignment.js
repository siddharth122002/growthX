import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    content:{
        type:Object,
    },
    taggedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    tagged:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    },
    status:{
        type:String,
        enum:["accept","reject","pending"],
        default:"pending",
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
const Assignment =  mongoose.model('Assignment', assignmentSchema);
export default Assignment;
