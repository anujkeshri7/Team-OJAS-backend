
import Member from "../models/member.js";

const addMembers = async (req, res) => {

    console.log("Request body:", req.body);

    const { name, position, linkedin, github, instagram, description } = req.body;
    const profilePic = req.file

    try {

        const newMember = new Member({
            name,
            position,
            linkedin,
            github,
            instagram,
            description,
        });
        
        await newMember.save();

        res.status(201).json({ message: "Member added successfully", member: newMember });
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


export { addMembers  ,fetchMembers};