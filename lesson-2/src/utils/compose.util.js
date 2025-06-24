export function compose(middlewares) {
    return (req, res) => {
        let i = -1;
        function next(err) {
            if (err) return finish(500, { error: err.message });
            i += 1;
            const mw = middlewares[i];

            if (mw) return mw(req, res, next);
            return; // chain ended
        }
        function finish(code, bodyObj) {
            res.writeHead(code, { "Content-Type": "application/json" });
            res.end(JSON.stringify(bodyObj));
        }
        req.finish = finish;
        next();
    };
};