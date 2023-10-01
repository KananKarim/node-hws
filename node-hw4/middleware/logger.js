const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} query:${JSON.stringify(req.query)} body:${JSON.stringify(req.body)}`);
    next();
};

export default logger;