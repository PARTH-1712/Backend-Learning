import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; //Paginate use to for large datasets and help in loading in page by page

const videoSchema = new Schema(
    {
        videoFile:{
            type: String, //cloudinary url
            required: true
        },
        thumbnail:{
            type: String,
            required: true 
        },
        title:{
            type: String,
            required: true 
        },
        description:{
            type: String,
            required: true 
        },
        duration:{
            type: Number, //cloudinary url
            required: true 
        },
        views:{
            type: Number,
            default: 0 
        },
        isPublishes:{
            type: Boolean,
            default: true 
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate) //upar humne import kiya hai yaha humne use kiya hai



export const Video = mongoose.model("Video", videoSchema)