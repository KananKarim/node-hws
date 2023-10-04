const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} query:${req.query ? JSON.stringify(req.query) : ''} body:${req.body ? JSON.stringify(req.body) : ''}`);
    next();
};

export default logger;