import mongoose from 'mongoose'

const superadminSchema = new mongoose.Schema({
    username:{type:String,required: true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    role:{type:String, required:true, enum:["superadmin"]}
});

const superadminModel = mongoose.models.superadmins || mongoose.model('superadmins', superadminSchema);

export default superadminModel;


