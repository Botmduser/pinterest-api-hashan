const express = require('express');
const Pinterest = require('pinterest-scraper');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/pinterest', async (req, res) => {
    const query = req.query.text;
    if (!query) return res.json({ success: false, message: "Query එකක් දෙන්න!" });

    try {
        const data = await Pinterest.search(query);
        // ප්‍රතිඵල 10ක් විතරක් ගමු
        const results = data.slice(0, 10);
        
        res.json({
            creator: "Mr Hashuu",
            success: true,
            result: results
        });
    } catch (error) {
        res.json({ success: false, message: "Error: " + error.message });
    }
});

app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
