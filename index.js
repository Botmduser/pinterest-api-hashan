const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/pinterest', async (req, res) => {
    const query = req.query.text;
    if (!query) return res.json({ success: false, message: "Query එකක් දෙන්න!" });

    try {
        const url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const results = [];
        $('img').each((i, el) => {
            const src = $(el).attr('src');
            if (src && src.includes('pinimg.com')) {
                results.push(src);
            }
        });

        const uniqueResults = [...new Set(results)].slice(0, 10);
        res.json({ success: true, result: uniqueResults });
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
});

app.listen(PORT, () => console.log(`API Active on ${PORT}`));
