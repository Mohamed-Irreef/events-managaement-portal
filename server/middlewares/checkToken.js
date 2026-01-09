import jwt from 'jsonwebtoken';

const checkUserToken = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({status:false, message:'No Token Available',role:'unauthorized', id:''});
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id= decodeToken.id;
        req.role=decodeToken.role;

        console.log('id: ',req.id);
        console.log('role: ',req.role);
        next();
    } catch (error) {
        return res.status(500).json({status:false, message:'Verify Token Error'});
    }
}

export default checkUserToken;