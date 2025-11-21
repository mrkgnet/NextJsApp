import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export default async function handler(req, res) {

    //connect to db
    await connectDB();
    if (req.method == "PATCH") {
        try {
            const { id } = req.query;

            const contact = await Contact.findById(id);
            if (!contact)
                return res.status(404).json({ message: "Contact not found" });



            contact.favorite = !contact.favorite;

            await contact.save();


            return res.status(200).json({
                // message: contact.favorite ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد",
                // favorite: contact.favorite
                message:contact.favorite ?"به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد",
                favorite: contact.favorite
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }

    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);

}