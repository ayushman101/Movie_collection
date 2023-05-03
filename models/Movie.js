const mongoose=require('mongoose');

const MovieSchema=new mongoose.Schema({
    title:{type:String, required: true, unique: true},
    desc:{
        type: String,
        required: true

    },
    year: { type: Number,
        required: true
    },
    duration:{ type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    imgtitle:{
        type: String
    },
    thumbnail:{
        type: String
    },
    trailer:{
        type: String
    },
    isSeries: {type: Boolean,default:false}
})

module.exports= mongoose.model('Movie',MovieSchema);