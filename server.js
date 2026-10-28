require("dotenv").config();
const express=require("express"), mongoose=require("mongoose"), cors=require("cors");
const routes=require("./routes/courseRoutes");
const app=express(); app.use(cors()); app.use(express.json());
app.get("/api/health",(req,res)=>res.json({status:"ok"}));
app.use("/api/courses",routes);
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI||"mongodb://127.0.0.1:27017/course_management")
.then(()=>{console.log("MongoDB connected");app.listen(PORT,()=>console.log(`Backend running at http://localhost:${PORT}`));})
.catch(e=>{console.error("MongoDB connection failed:",e.message);process.exit(1);});
