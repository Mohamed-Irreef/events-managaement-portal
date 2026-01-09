import { console } from "inspector";
import postModel from "../models/eventPostModel.js";
import superadminModel from "../models/superadminModel.js";
import userModel from "../models/userModel.js";


export const newPost = async (req, res) => {
  const { title, date, place, desc, readMore, postedId, postedOn, postedTime,  } =
    req.body;
  const { img } = req.file;
  const image = `uploads/${req.file.filename}`;
  if (
    !title ||
    !date ||
    !place ||
    !desc ||
    !readMore ||
    !postedId ||
    !postedOn ||
    !postedTime 
    
  ) {
    return res.status(400).json({ status: false, message: "Missing Details" });
  }
  try {
    const admin = await userModel.findOne({ _id: postedId });
    const superadmin = await superadminModel.findOne({ _id: postedId });
    let postedUserName = "";
    let postedRole = "";
    if (admin) {
      postedUserName = admin.username;
      postedRole = admin.role;
      console.log(postedUserName);
      console.log(postedRole);
    } else {
      postedUserName = superadmin.username;
      postedRole = superadmin.role;
      console.log(postedUserName);
      console.log(postedRole);
    }

    const postData = {
      eventTitle: title,
      eventDate: date,
      eventPlace: place,
      eventDescription: desc,
      readMore: readMore,
      postedBy: postedUserName,
      adminId: postedId,
      postedDate: postedOn,
      postedTime: postedTime,
      postLike: 0,
      eventImage: image,
      isEdited: false,
      postedRole: postedRole,
      
    };
    const newPostModel = new postModel(postData);
    await newPostModel.save();
    return res
      .status(200)
      .json({
        status: true,
        message: "image uploaded successfully",
        user: postedUserName,
        details: postData,
      });
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: "Create Event Error" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPostsDb = await postModel.find();

    function dateFormater(postDate) {
      let eventDate = new Date(postDate).toISOString().slice(0, 10);
      let dateArray = eventDate.split("-");
      return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    }

    const allPosts = allPostsDb.map((eachPost) => {
      return {
        ...eachPost.toObject(),
        eventDate: dateFormater(eachPost.eventDate),
      };
    });
    return res
      .status(201)
      .json({ status: true, message: "Fetched Successfully", allPosts });
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: "Create Event Error" });
  }
};

export const editEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById({ _id: id });
    if (!post) {
      return res.status(401).json({ status: false, message: "Invalid Post" });
    }
    return res
      .status(200)
      .json({
        status: true,
        message: "Single Post fetched Successfull",
        singlePost: post,
      });
  } catch (error) {
    return res.status(401).json({ status: false, message: "Fetch Error" });
  }
};

export const updateEvent = async (req, res) => { // if Edited, like will be zero (conditon need to be changed)
  const { title, date, place, desc, readMore, postedId , oldImg} = req.body;
  
  let image= '';
  if(req.file){
    const { img } = req.file;
    image = `uploads/${req.file.filename}`;
  }else{
    image = oldImg;
    

  }
  console.log('Image in controller: ', image);

  const id = req.params.id;
   
  try {
    const admin = await userModel.findOne({ _id:postedId  });
    const superadmin = await superadminModel.findOne({ _id:postedId });
    let postedUserName = "";
    let postedRole = "";
    if (admin) {
      postedUserName = admin.username;
      postedRole = admin.role;
    //   console.log(postedUserName);
    //   console.log(postedRole);
    } else if(superadmin) {
      postedUserName = superadmin.username;
      postedRole = superadmin.role;
    //   console.log(postedUserName);
    //   console.log(postedRole);
    }else{
      return res.status(400).json({status:false, message:'No Admin or Super Admin found'})
    }

    const oldPost = await postModel.findById(id);
    if(!oldPost){
      return res.status(400).json({status:false, message:'Old post is not available'})
    }
    const postData = {
        eventTitle: title, //
        eventDate: date, //
        eventPlace: place, //
        eventDescription: desc, //
        readMore: readMore, //
        postedBy: postedUserName, //
        adminId: postedId, //
        postedDate: oldPost.postedOn, //
        postLike: 0, //
        eventImage: image, //
        isEdited: true, //
        postedRole: postedRole, //
        postedTime: oldPost.postedTime, //
      
      };
      const updatePostModel = await postModel.findByIdAndUpdate({_id:id},postData,{new:true}); // automatically update and save
      
      return res.status(200).json({status:true, message:"Updated Successfully"})

  } catch (error) {
    return res.status(401).json({ status: false, message: "Upload Error" });
  }
};

export const deletePost = async (req,res) => {
  const id = req.params.id;
  try {
    await postModel.findByIdAndDelete({_id:id});
    return res.status(201).json({status: true, message: 'Post Successfully deleted'});
  } catch (error) {
    return res.status(401).json({status: false, message:'Deletion Error'})
  }
} 