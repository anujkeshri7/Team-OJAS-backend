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
   
    }
})

const Member = model('Member', memberSchema);

export default Member;