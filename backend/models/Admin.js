import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    taggedAssignments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Assignment'
    }],
});

const Admin =  mongoose.model('Admin', adminSchema);
export default Admin;
