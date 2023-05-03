
const Users=require('../models/User');
const cryptojs=require('crypto-js');

//UPDATE

const update = async (req,res)=>{

    if(req.params.id === req.user.userId || req.user.isAdmin)
    {

        if(req.body.password)
        {
            req.body.password= cryptojs.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString();
        }

        try {
            
            const updatedUser= await Users.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators:true});
            res.status(200).json(updatedUser);

        } catch (error) {
            
            res.status(404).json("User Not FOUND");
        }
    } 

    else
        res.status(403).json(" You are not allowed ")

}

//DELETE


const deleteUser = async (req,res)=>{


    if(req.params.id===req.user.userId || req.user.isAdmin)
    {
        try {
            
            await Users.findByIdAndDelete(req.params.id);

            res.status(200).json("User was Deleted");

        } catch (error) {
            
            console.log(error);
            res.status(501).json(error);
        }
    }

    else
        res.status(403).json("You are not allowed to delete");


}

//GET 

const GetUser=async (req,res)=>{

    if(req.params.id===req.user.userId || req.user.isAdmin)
    {

        try {
            

            const userInfo= await Users.findById(req.params.id);

            const {password, ...info}=userInfo._doc;

            res.status(200).json(info);

        } catch (error) {
            
            res.status(404).json("User Info not Found");

        }


    }

    else
        res.status(403).json("Not allowed");

}

//GET ALL

//if there is a 'limit' query then that much amount of users are given back else all of them
const GetAll=async (req,res)=>{

    const query=req.query.limit

    console.log(req.query.limit);

    if(req.user.isAdmin)
    {

        try {
            const ret_users=query ? await Users.find().limit(query) : await Users.find();
    
            res.status(200).json(ret_users);
            
        } catch (error) {
                
            console.log(error);
            res.status(503).json("Internal Server Error");
            
        }

    }

    else
        res.status(403).json("Restricted Access");
}

//GET STATS

module.exports={update,deleteUser,GetUser,GetAll};