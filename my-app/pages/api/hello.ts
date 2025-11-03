// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method == "GET") {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (err) {
      res.status(200).json({ message: "Hello from Next.js!" });
    }
  }
}
