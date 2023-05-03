const lists=require('../models/list');


//Create
const createList= async (req,res)=>{



    if(req.user.isAdmin)
    {
        try {
            
            const newList= await lists.create(req.body);
            res.status(201).json(newList);

        } catch (error) {
            
            console.log(error);
            res.status(500).json("Internal server error!!!");

        }

    }

    else
        res.status(403).json("You are not allowed")

};


//Delete
const deleteList= async (req,res)=>{



    if(req.user.isAdmin)
    {
        try {
            
            const deletedList=await lists.findByIdAndDelete(req.params.id);
            res.status(201).json({movie:deletedList,msg:"List has been deleted"});

        } catch (error) {
            
            console.log(error);
            res.status(500).json("Internal server error!!!");

        }

    }

    else
        res.status(403).json("You are not allowed")

};

//GET

const getList= async (req,res)=>{

    const typequery= req.query.type;
    const genrequery= req.query.genre;
    let List=[]

    try {

        if(typequery)
        {

            if(genrequery)
            {

                List=await lists.aggregate([
                    {$sample: {size:10}},
                    {$match:{type:typequery, genre: genrequery}}
                ])

            }
            else
                {
                    List = await lists.aggregate([
                        {$sample:{size:10}},
                        {$match : { type: typequery}}
                    ])
                }

        }

        else
            {
                List = await lists.aggregate([
                    {$sample:{size: 10}}
                ]);
            }
        

            res.status(201).json(List);


    } catch (error) {
        
        console.log(error);
        res.status(500).json(error);
    }

}


module.exports={createList,deleteList};