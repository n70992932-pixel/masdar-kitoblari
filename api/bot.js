export default async function handler(req, res) {
  // We only accept POST requests from Telegram
  if (req.method === 'POST') {
    const body = req.body;
    
    // Check if there is a message and it is /start
    if (body.message && body.message.text && body.message.text.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const userName = body.message.from.first_name || 'Aziz kitobxon';
      
      const text = `Assalomu alaykum, ${userName}!\n\n📚 "Masdar Kitoblari" rasmiy botiga xush kelibsiz.\n\nQuyidagi "🛍 Do'konga kirish" tugmasini bosib, 2000 dan ortiq kitoblarimizni ko'rishingiz va to'g'ridan-to'g'ri buyurtma berishingiz mumkin.`;
      
      const BOT_TOKEN = '8157364100:AAFSVUaDT8V5b1RqDaTtmzQURNkqC0z1UC4';
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      
      const payload = {
        chat_id: chatId,
        text: text,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛍 Do'konga kirish",
                web_app: {
                  url: "https://masdarbooks.uz"
                }
              }
            ]
          ]
        }
      };

      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }
  
  // Always return 200 OK so Telegram knows we received the update
  res.status(200).send('OK');
}
