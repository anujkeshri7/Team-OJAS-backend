import { Schema,model } from "mongoose";

const gallerySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    images:[
        {
            url:{
                type:String,   
            },
            publicId:{
                type:String,
            }

    }
    ]
},{ timestamps: true })

const GalleryModel = model("GalleryImage",gallerySchema)

export default GalleryModel;