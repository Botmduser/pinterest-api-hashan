const express = require('express');
const pinterest = require('pinterest-dl');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/pinterest', async (req, res) => {
    const query = req.query.text;
    
    if (!query) {
        return res.json({ success: false, message: "Query එකක් දෙන්න!" });
    }

    try {
        // මෙතනදී පින්තූර අදින ක්‍රමය
        const data = await pinterest.pinterest(query);
        
        if (!data || data.length === 0) {
            return res.json({ success: false, message: "පින්තූර සොයාගත නොහැකි විය." });
        }

        res.json({
            creator: "Mr Hashuu Bot",
            success: true,
            result: data
        });
    } catch (error) {
        res.json({ success: false, message: "Error: " + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ API Server is running on port ${PORT}`);
});
