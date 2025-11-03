import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export default async function handler(req, res) {
  // 1. اتصال به دیتابیس در ابتدای کار
  try {
    await connectDB();
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.status(500).json({ message: "Internal Server Error - DB Connection Failed" });
  }

  // -------------------------------------------------------------------
  // 🔹 مدیریت درخواست GET (کد شما عالی بود، فقط منتقل شد)
  // -------------------------------------------------------------------
  if (req.method === "GET") {
    try {
      const { gender, search } = req.query;
      const filter = {};

      if (gender) {
        filter.gender = gender.trim().toLowerCase();
      }

      if (search) {
        const words = search
          .trim()
          .split(/\s+/)
          .map((word) => new RegExp(word, "i"));

        filter.$or = [
          { firstname: { $in: words } },
          { lastname: { $in: words } },
        ];
      }

      const contacts = await Contact.find(filter);

      if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: "No contacts found" });
      }

      return res.status(200).json(contacts);

    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ message: "Error fetching data" });
    }
  }

  // -------------------------------------------------------------------
  // 🔹 مدیریت درخواست POST (بخش اصلاح‌شده)
  // -------------------------------------------------------------------
  if (req.method === "POST") {
    // کل منطق را در try...catch قرار می‌دهیم
    try {
      const { firstname, lastname, age, gender, phone } = req.body;
      const newContact = await Contact.create({
        firstname,
        lastname,
        age,
        gender,
        phone,
      });

      return res.status(201).json({
        message: "Contact created successfully",
        data: newContact,
      });

    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: "اطلاعات ارسالی معتبر نیست", details: error.message });
      }

      // اگر خطای کلید تکراری بود (مثلا شماره تلفن تکراری)
      if (error.code === 11000) {
        return res.status(409).json({ message: "این شماره تلفن قبلا ثبت شده است" });
      }

      // برای خطاهای دیگر
      return res.status(500).json({ message: "خطای داخلی سرور" });
    }
  }

  // -------------------------------------------------------------------
  // 🔹 مدیریت متدهای دیگر
  // -------------------------------------------------------------------
  // اگر متد ارسالی نه GET بود و نه POST
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}