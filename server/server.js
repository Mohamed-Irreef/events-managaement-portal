import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import authRouter from "./router/userRouter.js";
import userVerifyToken from "./middlewares/verifyToken.js";
import bodyParser from "body-parser";
import path from 'path';
import multer from 'multer';
import eventPostRouter from "./router/postRouter.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
app.use('/uploads', express.static(path.join(process.cwd(),'uploads'))); // uploads folder - is now static

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

connectDb();

app.get("/", (req, res) => {
  res.send(`Server is running on the port ${PORT}`);
});

app.use('/api/auth',authRouter);
app.use('/api/posts', eventPostRouter);




app.listen(PORT, () => {
  try {
    console.log(`Server is running on the port ${PORT}`);
  } catch (error) {
    console.log(`Error in server setup: `, error);
  }
});

// app.use(userVerifyToken,(req,res,err,next)=>{
//   res.status(200).json({})
//   next();
// })
// app.use((req, res, err) => {
//   console.log("Middleware Error: ", err);
// });
