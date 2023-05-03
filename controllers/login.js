const Users=require('../models/User');
const cryptojs=require('crypto-js');

const Login=async (req,res)=>{

    try {
        
        console.log("Login")

        const {username,email, password}=req.body;
        const user= await Users.findOne({email});
    
        if(!user)
            res.status(404).json("Wrong Username or Password");
    
        else
        {
        console.log(user);
    
        const bytes= cryptojs.AES.decrypt(user.password,process.env.JWT_SECRET);
        const originalPassword= bytes.toString(cryptojs.enc.Utf8);
    
        if(originalPassword !==password) 
                res.status(404).json("Wrong Username or Password");
            
        else
        {
    
        const token= user.createJWT();
    
        res.status(200).json({user_info:{ email: user.email, username: user.username, user_id: user._id },token});
       } 
    }
}
    catch (error) {
        
        res.status(501).json(error);
        
    }

}

module.exports=Login