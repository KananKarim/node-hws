import express from "express";
import logger from "./middleware/logger.js";
import fs from "fs";

const app = express();
app.use(express.json())
app.use(logger);

let newsPosts = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

app.get('/api/newsposts', (req, res) => {
    const page = +(req.query.page) || 1
    const size = +(req.query.size) || 10
    const start = (page - 1) * size
    const end = page + size
    console.log(page, size, start, end);
    res.json(newsPosts.slice(start, end))
})

app.get("/api/newsposts/:id", (req, res) => {
    console.log(req.params);
    const post = newsPosts.find(p => p.id === +req.params.id)
    if (!post) return res.status(404).send("given id is not found")
    res.json(post)
})

app.post("/api/newsposts", (req, res) => {
    try {
        const newPost = {
            id: newsPosts.length + 1,
            title: req.body.title,
            text: req.body.text
        }
        newsPosts.push(newPost);
        res.json(newPost)
    } catch (error) {
        res.status(500).send("Error occured while creating")
    }
})

app.put('/api/newsposts/:id', (req, res) => {
    const post = newsPosts.find(p => p.id === +req.params.id);
    if (!post) return res.status(404).send("there is error");
    post.title = req.body.title || post.title
    post.text = req.body.text || post.text
    res.json(post)
})

app.delete('/api/newsposts/:id', (req, res) => {
    const id = +req.params.id
    const post = newsPosts.find(p => p.id === id);
    if (!post) return res.status(404).send('The news post with the given ID was not found.');

    newsPosts = newsPosts.filter(p => p.id !== id);
    res.status(200).json(post);
})



const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, host, () => console.log(`Server is running on ${host}:${port}`));

