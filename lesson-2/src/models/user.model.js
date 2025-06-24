import path from 'node:path';
import {readJSON, writeJSON} from "../utils/fs.util.js";

const DB_FILE = path.resolve('src', 'database.json');

export function saveUser(data) {
    const users = listUsers();
    const foundUser = users.find(user => user.id === data.id);
    if (!foundUser) {
        users.push(data);
    } else {
        Object.assign(foundUser, data);
    }
    writeJSON(DB_FILE, users);
}

export function deleteUserByID(id) {
    const users = readJSON(DB_FILE);
    const filteredUsers = users.filter(user => user.id !== id);
    writeJSON(DB_FILE, filteredUsers);
}

export function getUserByID(id) {
    const users = readJSON(DB_FILE);
    const foundUser = users.find(user => user.id === id);
    return foundUser || null;
}

export function listUsers(id, data) {
    return readJSON(DB_FILE);
}