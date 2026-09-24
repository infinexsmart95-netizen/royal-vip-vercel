const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const JOIN_LINK = "https://t.me/+aU8NKqNzrlNhZWY0";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    return res.status(200).send("👑 Royal VIP Bot is Online");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const update = req.body;

    if (!update?.chat_join_request) {
      return res.status(200).json({ ok: true });
    }

    const request = update.chat_join_request;
    const userId = request.user_chat_id;
    const firstName = request.from?.first_name || "Trader";

    if (!userId) {
      return res.status(200).json({ ok: true });
    }

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: userId,
        text: `👑 𝗥𝗢𝗬𝗔𝗟 𝗩𝗜𝗣 𝗔𝗖𝗖𝗘𝗦𝗦 👑

🔥 Hello ${firstName}!

Your join request has been received successfully. ✅

💎 𝗩𝗜𝗣 𝗦𝗜𝗚𝗡𝗔𝗟𝗦
⚡ Premium Sessions
📊 Market Updates
👑 Exclusive VIP Access

👇 𝗝𝗢𝗜𝗡 𝗡𝗢𝗪 👇`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "👑 JOIN VIP CHANNEL",
                url: JOIN_LINK
              }
            ]
          ]
        }
      }
    );

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};
