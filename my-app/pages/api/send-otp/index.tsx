import { code } from "framer-motion/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { phone } = req.body;
    console.log(phone);


    const code = Math.floor(10000 + Math.random() * 90000);
    const response = await fetch("https://edge.ippanel.com/v1/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "YTA2Njk0NzktMzQwNC00ZDU4LTg5MDYtNzNlMGE0ZWM4OGMxY2I2NjhlYzQ4NGRhN2U2MmM3YWVlODc3ZmI3NWUxY2E="
      },
      body: JSON.stringify({
        sending_type: "pattern",
        from_number: "+983000505",
        code: "ynmxn3w9zh37m3w",
        recipients: [phone],
        params: {
          code: code
        }
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
