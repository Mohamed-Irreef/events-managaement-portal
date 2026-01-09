import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    eventTitle:{type:String , required: true},
    eventDate:{type:Date , required: true},
    eventPlace:{type:String , required: true},
    eventDescription:{type:String , required: true},
    readMore:{type:String , required: true},
    postedBy:{type:String , required: true},
    postedTime:{type:Date , required: true},
    postedDate:{type:String , required: true},
    eventImage:{type:String , required: true},
    postLike:{type:Number , required: true, default:0},
    isEdited:{type:Boolean , required: true, default:false},
    adminId:{type:String , required: true},
    postedRole:{type:String, required:true},

});

const postModel = mongoose.models.posts || mongoose.model('posts', postSchema);

export default postModel;