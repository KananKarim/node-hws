import fs from "fs"

let newsPosts = JSON.parse(fs.readFileSync("./data.json", "utf-8"));


export function getNewsPosts(req, res) {
    const page = +(req.query.page) || 1
    const size = +(req.query.size) || 10
    const start = (page - 1) * size
    const end = page + size
    console.log(page, size, start, end);
    res.json(newsPosts.slice(start, end))
}
export function getNewsPostById(req, res) {
    console.log(req.params);
    const post = newsPosts.find(p => p.id === +req.params.id)
    if (!post) return res.status(404).send("given id is not found")
    res.json(post)
}
export function createNewsPost(req, res) {
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
}
export function updateNewsPost(req, res) {
    const post = newsPosts.find(p => p.id === +req.params.id);
    if (!post) return res.status(404).send("there is error");
    post.title = req.body.title || post.title
    post.text = req.body.text || post.text
    res.json(post)
}
export function deleteNewsPost(req, res) {
    const id = +req.params.id
    const post = newsPosts.find(p => p.id === id);
    if (!post) return res.status(404).send('The news post with the given ID was not found.');

    newsPosts = newsPosts.filter(p => p.id !== id);
    res.status(200).json(post);
}