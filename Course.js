const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true,maxlength:100},
 description:{type:String,required:true,trim:true,maxlength:1000},
 duration:{type:String,required:true,trim:true,maxlength:50},
 instructor:{type:String,trim:true,default:"Not assigned",maxlength:100},
 level:{type:String,enum:["Beginner","Intermediate","Advanced"],default:"Beginner"}
},{timestamps:true});
module.exports=mongoose.model("Course",schema);
