import jwt from 'jsonwebtoken';

const userVerifyToken = async (req,res,next)=>{
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

        return res.status(200).json({status:false, message:'Token Available', role: req.role, id: req.id})
        // next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ status: false, message: 'Token Expired', role: 'unauthorized' });
        }
        return res.status(403).json({ status: false, message: 'Invalid Token', role: 'error' });
      }
}

export default userVerifyToken;