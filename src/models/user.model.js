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
        fullName:{
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

userSchema.methods.generateToken = function (){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

    )
}
userSchema.methods.generateRefreshToken = function (){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }

    )
}


export const User = mongoose.model("User", Schema);