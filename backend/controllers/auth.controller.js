const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {jwtSecret,jwtExpiresIn,demoMode}=require('../config/env');
const User=require('../models/User');
const demoUsers=new Map();

function signToken(user){return jwt.sign({id:String(user._id||user.id),name:user.name,email:user.email},jwtSecret,{expiresIn:jwtExpiresIn});}
async function register(req,res,next){try{
 const {name,email,password}=req.body;
 if(!name||!email||!password||password.length<6){const e=new Error('Invalid registration details.');e.status=400;throw e;}
 const key=email.toLowerCase();
 if(demoMode){if(demoUsers.has(key)){const e=new Error('An account with this email already exists.');e.status=400;throw e;}
   const user={id:'demo-'+Date.now(),name,email:key,passwordHash:await bcrypt.hash(password,10)};demoUsers.set(key,user);
   return res.status(201).json({token:signToken(user),user:{id:user.id,name:user.name,email:user.email}});
 }
 const existing=await User.findOne({email:key});if(existing){const e=new Error('An account with this email already exists.');e.status=400;throw e;}
 const passwordHash=await bcrypt.hash(password,10);const user=await User.create({name,email:key,passwordHash});
 res.status(201).json({token:signToken(user),user:{id:user._id,name:user.name,email:user.email}});
}catch(e){next(e)}}
async function login(req,res,next){try{
 const {email,password}=req.body,key=(email||'').toLowerCase();let user;
 if(demoMode) user=demoUsers.get(key);
 else user=await User.findOne({email:key});
 if(!user||!(await bcrypt.compare(password,user.passwordHash||''))){const e=new Error('Invalid email or password.');e.status=401;throw e;}
 res.json({token:signToken(user),user:{id:user._id||user.id,name:user.name,email:user.email}});
}catch(e){next(e)}}
module.exports={register,login};