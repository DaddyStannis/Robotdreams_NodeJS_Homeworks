export function jsonBody(req, res, next){
    let buf = "";
    req.on("data", (c) => (buf += c));
    req.on("end", () => {
        try {
            req.body = JSON.parse(buf);
        } catch (e) {
        } finally {
            next();
        }
    });
};