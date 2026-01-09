import express from 'express';
import {deletePost, editEvent, getAllPost, newPost, updateEvent} from '../controllers/postController.js'
import multer from 'multer';
import path from 'path'
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      return cb(null, 'uploads/')
    },
    filename: (req,file,cb)=>{
      let currentFileName= file.originalname;
      if(currentFileName.startsWith("uploads")){
        let alteredFileName = currentFileName.slice(8,)
        return cb(null, alteredFileName);
      }
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  export const uploads = multer({
    storage:storage,
    fileFilter: (req,file,cb)=>{
      const fileTypes = /jpg|jpeg|png/;
      const fileExtn = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
      
      if(fileExtn && mimeType){
        return cb(null,true);
      }else{
        return cb(new Error('LIMIT_UNEXPECTED_FILE, Invalid File'))
      }
    },
    limits:{fileSize: 5 *1024 *1024} //Max file size allowed : 5Mb
  })

const eventPostRouter = express.Router();

eventPostRouter.post('/new-post', uploads.single('img'),newPost); // img is the name of the image set in formdata in frontend (submitHandler function)
eventPostRouter.get('/all-post',getAllPost);
eventPostRouter.get('/single-post/:id', editEvent);
eventPostRouter.put('/update-post/:id', uploads.single('img'), updateEvent);
eventPostRouter.delete('/delete-post/:id', deletePost);
export default eventPostRouter;