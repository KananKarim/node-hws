import http from "http";
import url from "url";
import fs from "fs";

let newsArticles;
try {
    const data = fs.readFileSync("data.json", "utf-8");
    newsArticles = JSON.parse(data);
} catch (error) {
    console.error('Error reading or parsing data.json:', error);
    newsArticles = [];
}

const server = http.createServer((req, res) => {
    try {
        const queryObject = url.parse(req.url,true).query;
        const page = Number(queryObject.page) || 1;
        const size = Number(queryObject.size) || 10;
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

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
