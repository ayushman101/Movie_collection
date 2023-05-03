const Movie = require('../models/Movie');
const movies=require('../models/Movie');
//const User = require('../models/User');

//CREATE

const createMovie= async (req,res)=>{
    

    if(req.user.isAdmin)
    {
        try {
            
            const movie= await movies.create(req.body);

            res.status(201).json(movie);
        } catch (error) {
            
            console.log(error);
            res.status(500).json("Server Error");
        }
    }

    else
        res.status(403).json("Unrestricted Access");

}





//UPDATE

const updateMovie=async (req,res)=>{

    if(req.user.isAdmin)
    {
        try {
            const updatedMovie= await movies.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
    
    
            res.status(201).json(updatedMovie);
            
        } catch (error) {
            
            console.log(error);
            res.status(404).json("Movie Not found");
        }

    }

    else
        res.status(403).json("Not Allowed");
}

//GET 

const getMovie = async (req,res)=>{

    try {
        const payloadmovie= await movies.findById(req.params.id);        
        res.status(201).json(payloadmovie);

    } catch (error) {
        
        console.log(error);
        res.status(404).json("No Movie");
    }

}

//GET ALL

const getAllMovies= async (req,res)=>{

    try {
        
        const payloadmovie= await movies.find();        
        res.status(201).json(payloadmovie);


    } catch (error) {
        
        console.log(error);
        res.status(404).json("No Movie");
        
    }


}

//DELETE

const deleteMovie= async (req,res)=>{

    if(req.user.isAdmin)
    {
        try {
            
            const deletedmovie=await movies.findByIdAndDelete(req.params.id);
            res.status(201).json(deletedmovie);


        } catch (error) {
            console.log(error);
            res.status(404).json("No Movie");
           
        }
    }
    else
        res.status(403).json("Restricted Access");

}
//GET RANDOM

const getRandom= async (req,res)=>{

    const type=req.query.type;
    let movie;
    try {
        
        if(type==="series")
        {
            movie= await movies.aggregate([
                {$match: {isSeries:true}},
                {$sample: {size: 1}},
            ]
            );
        }
        else
        {

            movie= await movies.aggregate([
                {$match: {isSeries:false}},
                {$sample: {$size: 1}},
            ]
            );
        }

        res.status(201).json(movie);


    } catch (error) {
        
        console.log(error);
        res.status(500).json("Some Error occured");
    }


}


module.exports={createMovie,updateMovie,getMovie,getAllMovies,deleteMovie,getRandom};