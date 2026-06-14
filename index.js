const express = require('express');
const { pinterest } = require('peth-pinterest');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/pinterest', async (req, res) => {
    const query = req.query.text;
    
    if (!query) return res.json({ success: false, message: "Query එකක් දෙන්න!" });

    try {
        // මේක තමයි හරියටම වැඩ කරන ක්‍රමය
        const data = await pinterest(query);
        
        res.json({
            creator: "Mr Hashuu Bot",
            success: true,
            result: data
        });
    } catch (error) {
        res.json({ success: false, message: "Error: " + error.message });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
