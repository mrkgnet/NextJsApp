import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { isValidObjectId } from "mongoose";

export default async function handler(req, res) {
    await connectDB();
    const { _id } = req.query;
    if (isValidObjectId(_id)) {
        // GET
        if (req.method === 'GET') {
            // Get contact by id
            const contact = await Contact.findById(_id);
            if (contact) {
                res.status(200).json(contact);
            } else {
                res.status(404).json({ message: 'Contact not found' });
            }
        }


        else if (req.method === 'DELETE') {
            // Delete contact by id
            const contact = await Contact.findByIdAndDelete(_id);
            if (contact) {
                return res.status(200).json({ message: 'Contact deleted successfully' });
            }
        }



        else if (req.method === 'PUT') {
            // Update contact by id
            await Contact.findByIdAndUpdate(_id, req.body, { new: true });
            res.status(200).json({ message: 'Contact updated successfully' });
        }


    } else {
        res.status(400).json({ message: 'Invalid ObjectId' });
    }

}




