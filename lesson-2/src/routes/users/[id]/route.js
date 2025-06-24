import {getUserByID, updateUserByID, deleteUserByID} from "../../../services/user.service.js";

export function GET(req, res) {
    if (!req.params.id) {
        res.statusCode = 400;
        res.end('ID not found');
    }
    const userID = Number(req.params.id);
    const user = getUserByID(userID);
    if (!user) {
        res.statusCode = 404;
        return res.end(`User with id ${userID} not Found`);
    }
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(getUserByID(userID)));
}

export function PUT(req, res) {
    if (!req.params.id) {
        res.statusCode = 400;
        res.end('ID not found');
    }
    if (typeof req.body !== 'object') {
        res.statusCode = 400;
        res.end('Bad Request');
    }
    const userID = Number(req.params.id);
    const updatedUser = updateUserByID(userID, req.body);
    if (!updatedUser) {
        res.statusCode = 404;
        return res.end(`User with id ${userID} not Found`);
    }
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify(updatedUser));
}

export function DELETE(req, res) {
    if (!req.params.id) {
        res.statusCode = 400;
        res.end('ID not found');
    }
    const userID = Number(req.params.id);
    const deletedUser = deleteUserByID(userID);
    if (!deletedUser) {
        res.statusCode = 404;
        return res.end(`User with id ${userID} not Found`);
    }
    res.statusCode = 204;
    res.end(`No Content`);
}