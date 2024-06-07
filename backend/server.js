const express = require('express');
const cors = require('cors');
const marked = require('marked');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());

app.post('/convert', (req, res) => {
    const { markdown } = req.body;
    if (!markdown) {
        return res.status(400).json({ error: 'Markdown field is required' });
    }

    try {
        const html = marked(markdown);

        res.status(200).json({ html });
    } catch (error) {

        console.error('Error converting markdown to HTML:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});