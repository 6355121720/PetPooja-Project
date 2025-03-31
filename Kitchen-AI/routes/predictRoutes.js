import { Router } from "express";
import upload from '../middleware/multer.middleware.js'; // Ensure this is correctly imported

const router = Router();

router.post('/getgood', upload.single('image'), async (req, res) => {
    try {
        console.log("📌 Here in routes");

        if (!req.file) {
            return res.status(400).json({ success: false, message: "❌ Please Send Image file" });
        }

        let image = req.file;
        const base64Image = image.buffer.toString("base64"); // ✅ Convert image to Base64
        const mimeType = image.mimetype; // ✅ Extract MIME type

        console.log("📸 Base64 Image:", base64Image.slice(0, 50) + "..."); // Preview base64
        console.log("📌 MIME Type:", mimeType);

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Identiy fruits and vegetables for only who are good and not spoiled and give items,quantity(strictly only in numbers) in form of item,quantity and only give this response not anything else" },
                        { inlineData: { mimeType: mimeType, data: base64Image } }
                    ]
                }]
            })
        });

        const data = await geminiResponse.json();
        console.log("✅ Gemini API Response:", data);

        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

        const items = {};

        responseText.split("\n").forEach(s => {
            items[s.split(",")[0]] = s.split(",")[1];
        })

        console.log(items, responseText)

        return res.status(200).json({
            items : JSON.parse(JSON.stringify(items).toLowerCase())
        });

    } catch (error) {
        console.error("🚨 Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});



router.post('/getbad', upload.single('image'), async (req, res) => {
    try {
        console.log("📌 Here in routes");

        if (!req.file) {
            return res.status(400).json({ success: false, message: "❌ Please Send Image file" });
        }

        let image = req.file;
        const base64Image = image.buffer.toString("base64"); // ✅ Convert image to Base64
        const mimeType = image.mimetype; // ✅ Extract MIME type

        console.log("📸 Base64 Image:", base64Image.slice(0, 50) + "..."); // Preview base64
        console.log("📌 MIME Type:", mimeType);

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Identiy fruits and vegetables for only which are spoiled(rotten) and give items:quantity in form of item,quantity(strictly only in numbers) and only give this response not anything else" },
                        { inlineData: { mimeType: mimeType, data: base64Image } }
                    ]
                }]
            })
        });

        const data = await geminiResponse.json();
        console.log("✅ Gemini API Response:", data);

        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

        const items = {};

        responseText.split("\n").forEach(s => {
            items[s.split(",")[0]] = s.split(",")[1];
        })

        return res.status(200).json({
            items: JSON.parse(JSON.stringify(items).toLowerCase())
        });

    } catch (error) {
        console.error("🚨 Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;