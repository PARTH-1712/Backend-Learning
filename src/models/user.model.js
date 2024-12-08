import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken" //used for authentication and authorization of users
import bcrypt from "bcrypt" //used for password encryption and decryption, stores in database and verifies password when user logs in

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim: true
        },
        fullname:{
            type:String,
            required:true,
            trim: true,
            index: true
        },
        avatar:{
            type:String, //cloudinary url
            required:true,  
        },
        coverImage:{
            type:String, //cloudinary url
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type:String,
            required:[true, "Password is required"]
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)


userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password, 10);
    next()
}) 

userSchema.methods.isPasswordCorrect = async function (password){
    return await brypt.compare(password, this.password)
}


export const User = mongoose.model("User", Schema);