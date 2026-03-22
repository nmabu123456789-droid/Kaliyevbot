const BOT_TOKEN = process.env.BOT_TOKEN || "8692777817:AAGaZzuo2-ygDGC6_mocXXaSVPgCGrpKbqc';
const WEBAPP_URL = process.env.WEBAPP_URL || "https://zesty-cupcake-569a17.netlify.app";
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function send(chatId, text, extra) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, ...extra }),
  });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, status: "Bot ishlayapti!" });
  }
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true });
  }
  try {
    const body = req.body;
    if (!body || !body.message) return res.status(200).json({ ok: true });
    const msg = body.message;
    const chatId = msg.chat.id;
    const text = (msg.text || "").trim();
    const name = msg.from?.first_name || "Do'st";
    if (text.startsWith("/start")) {
      await send(chatId,
        `✨ Assalomu alaykum, ${name}!\n\n📖 KaliyevVocab — ingliz so'zlarini o'rganish uchun maxsus dastur.\n\n━━━━━━━━━━━━━━━━\n🃏 Flashcard yodlash\n🧩 Test va viktorina\n🔁 SRS takrorlash\n🏆 XP va darajalar\n🔥 Streak\n━━━━━━━━━━━━━━━━\n\n👇 Boshlash uchun tugmani bosing:`,
        { reply_markup: { inline_keyboard: [[{ text: "📚 Dasturga kirish", web_app: { url: WEBAPP_URL } }]] } }
      );
    } else if (text.startsWith("/help")) {
      await send(chatId, `🆘 Yordam\n\n/start — Bosh menyu\n/help — Yordam\n/app — Dasturni ochish`,
        { reply_markup: { inline_keyboard: [[{ text: "📚 Dasturga kirish", web_app: { url: WEBAPP_URL } }]] } }
      );
    } else if (text.startsWith("/app")) {
      await send(chatId, "👇 Dasturni oching:", { reply_markup: { inline_keyboard: [[{ text: "📚 Dasturga kirish", web_app: { url: WEBAPP_URL } }]] } });
    } else {
      await send(chatId, "❓ /start yoki /help yozing.");
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ ok: true });
  }
}
