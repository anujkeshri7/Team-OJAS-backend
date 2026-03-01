
import cloudinary from "../config/cloudinary.js";
import Member from "../models/member.js";



const addMembers = async (req, res) => {

   

    const { name, position, linkedin, github, instagram, bio } = req.body;
    const profilePic = req.file


    try {

        let url = "";
        let publicId = "";

        if(req.file){
            try {
                
                const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ojas/members",
            
          });
                 url=result.secure_url
                 publicId=result.public_id

                 console.log("Image uploaded to Cloudinary:", result);

            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
                res.json({
                    success: false,
                    message: "Error uploading image",   
                    error: error.message,
                })
                
            }
        }

        const newMember = new Member({
            name,
            position,
            linkedin,
            github,
            instagram,
            bio,
            profilePic: {
                url,
                publicId,
            },
    
        });
        
        await newMember.save();

        res.status(201).json({
            success: true,
            message: "Member added successfully",
            member: newMember });
    } catch (error) {
        res.status(500).json({ message: "Error adding member", error: error.message });
        
    }
}

const fetchMembers = async (req, res) => {
    try {

        const members = await Member.find();
        console.log(members);
        res.status(200).json({ members });
        
        
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ message: "Error fetching members", error: error.message });
        
    }
}

const deleteMember = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
     if(user.role !== "Admin" && user.role !== "SuperAdmin"){
        return res.status(403).json({
            success: false,
            message: "Only Admins can delete members",
        });
     }

     try {
        
        const member = await Member.findById(id);
        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found",
            });
        }
        // Delete profile picture from Cloudinary
        try {
            await cloudinary.uploader.destroy(member.profilePic.publicId);
        } catch (error) {
            console.log("Error deleting profile picture from Cloudinary:", error);
            // Proceed with member deletion even if image deletion fails
        }

        await Member.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Member deleted successfully",
        });

     } catch (error) {

        console.log("Error deleting member:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting member",
            error: error.message,
        });
        
     }
}


export { addMembers  ,fetchMembers, deleteMember};