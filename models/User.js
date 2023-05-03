const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const UserSchema= new mongoose.Schema(
    {
        username: { 
            type:String, 
            unique:true,
            required:true,
            minlength:3
        },
        email: { 
            type: String, 
            required:true, 
            unique: true, 
            match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"]
        },
        password:{
            type:String,
            requried:[true,"Please provide password"],
            minlength:8,
        },
        
        isAdmin: {type:String, default: false}
    }
)

UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.username, isAdmin: this.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      }
    )
  }

module.exports= mongoose.model('User',UserSchema);