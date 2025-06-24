import {listUsers, addUser} from "../../services/user.service.js";

export function POST(req, res) {
    const user = addUser(req.body);
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(user));
}

export function GET(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(listUsers()));
}