import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()

let newsArticles;
try {
    const data = fs.readFileSync("data.json", "utf-8");
    newsArticles = JSON.parse(data);
} catch (error) {
    console.error('Error reading or parsing data.json:', error);
    newsArticles = [];
}

const app = express();

app.get('/', (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 10;
        const start = (page - 1) * size;
        const end = start + size;
        const paginatedArticles = newsArticles.slice(start, end);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(paginatedArticles));
    } catch (error) {
        console.error('Error handling request:', error);
        res.statusCode = 500;
        res.end('An error occurred');
    }
});

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
