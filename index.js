const express = require('express');
const { pinterest } = require('pinterest-dl');
const app = express();
const PORT = process.env.PORT || 3000;

// API එන්ඩ්පොයින්ට් එක
app.get('/pinterest', async (req, res) => {
    const query = req.query.text;
    
    if (!query) {
        return res.json({ 
            success: false, 
            message: "කරුණාකර සෙවුම් පදයක් ලබා දෙන්න (උදා: /pinterest?text=cat)" 
        });
    }

    try {
        const data = await pinterest(query);
        
        if (!data || data.length === 0) {
            return res.json({ success: false, message: "පින්තූර සොයාගත නොහැකි විය." });
        }

        res.json({
            creator: "Mr Hashuu Bot",
            success: true,
            result: data // මෙහි පින්තූර ලින්ක් අඩංගු වේ
        });
    } catch (error) {
        res.json({ success: false, message: "Error: " + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ API Server is running on port ${PORT}`);
});
