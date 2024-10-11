import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import User from './models/User.js';
import Admin from './models/Admin.js';
import Assignment from './models/Assignment.js';

connectDB()

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/register',async(req,res)=>{
    const {username,password,role} = req.body;
    if(role==="User"){
        
        const exists = await User.findOne({
            username,
        })
        if(exists){
            return res.status(201).send({msg:"user exists"});
        }
        const newUser = await User.create({
            username,
            password,
        })
        return res.status(200).send({msg:"user created successfully",newUser})
    }else{
        
        const exists = await Admin.findOne({
            username,
        })
        if(exists){
            return res.status(201).send({msg:"user exists"});
        }
        const newUser = await Admin.create({
            username,
            password,
        })
        console.log(newUser)
        console.log("here i am")
        return res.status(200).send({msg:"user created successfully",newUser})
    }
})


app.post('/login',async(req,res)=>{
    const {username,role} = req.body;
    if(role==="User"){
        const exists = await User.findOne({
            username,
        })
        // console.log(exists)
        if(!exists){
            return res.status(201).send({msg:"no user found"});
        }
        return res.status(200).send({msg:"successful login",exists})
    }else{
        const exists = await Admin.findOne({
            username,
        })
        if(!exists){
            return res.status(201).send({msg:"no user found"});
        }
        return res.status(200).send({msg:"sucessful login",exists})
    }
})



app.get('/admins',async (req,res)=>{
    const allAdmins = await Admin.find({});
    console.log(allAdmins);
    res.status(200).send(allAdmins) 
})
app.post('/upload',async (req,res)=>{
    const {assignment,admin}=req.body;
    const token = req.headers['authorization'];
    const user =await  User.findById({
        _id:token
    })
    const add = await Admin.findOne({
        username:admin,
    })
    const newAssignment=await Assignment.create({
        content:assignment,
        taggedBy:user,
        tagged:add,
    }) 
    user.assignment.push(newAssignment);
    add.taggedAssignments.push(newAssignment);

    await user.save();
    await add.save();
    await newAssignment.save();
    res.status(200).send("uploaded") ;
})
app.get('/assignments',async(req,res)=>{
    const token = req.headers.authorization;
    const admin = await Admin.findById({
        _id:token,
    }).populate('taggedAssignments')
    // console.log(admin)
    res.send(admin)
})


app.get('/assignments/:id/accept',async(req,res)=>{
    const {id}=req.params
    const assignment=await Assignment.findById({
        _id:id
    })
    // console.log(assignment)
    assignment.status="accept";
    await assignment.save();
    res.send("ok")
})
app.get('/assignments/:id/reject',async(req,res)=>{
    const {id}=req.params
    const assignment=await Assignment.findById({
        _id:id
    })
    // console.log(assignment)
    assignment.status="reject";
    await assignment.save();
    res.send("ok")
})

app.listen(process.env.PORT,()=>{
    console.log("listening...",process.env.PORT)
})