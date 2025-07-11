import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import postRoutes from "./routes/post.routes.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import { app,server } from "./lib/socket.js"
import { deleteOldMessages,deleteOldPosts,deleteOldUsers } from "./controllers/post.controller.js"
import path from "path"
// import cron from 'node-cron'

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// app.use(express.json());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb", extended:true}));

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth", authRoutes )
app.use("/api/messages", messageRoutes )
app.use("/api/posts", postRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}


// cron.schedule('0 12 * * *', () => {
//     console.log('Running daily deletion task...');
//     deleteOldUsers();
//     deleteOldMessages();
//     deleteOldPosts();
// });



server.listen(PORT,()=>{
    console.log("Hello Abhishek, Server is running on port:"+PORT);
    connectDB();
})
