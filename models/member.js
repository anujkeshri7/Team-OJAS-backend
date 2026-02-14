import {Schema, model} from 'mongoose';

const memberSchema = new Schema({
    name: {
        type: String,
   
    },
    profilePic: {
        url: String,
        publicId: String,
     
    },
    position:{
        type: String,
    
    },
    linkedin: {
        type: String,
       
    },
    github: {
        type: String,
        
    },
    instagram: {
        type: String,
        
    },
    description: {
        type: String,
   
    },
    role:{
        type: String,
        default: "Member",
    }
})

const Member = model('Member', memberSchema);

export default Member;