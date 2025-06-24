import * as model from '../models/user.model.js';

export function addUser(user) {
    const users = model.listUsers();
    user.id = (users.toSorted((a, b) => b.id - a.id)[0]?.id ?? 0) + 1;
    model.saveUser(user);
    return user;
}

export function getUserByID(id) {
    return model.getUserByID(id);
}

export function updateUserByID(id, data) {
    const user = model.getUserByID(id);
    if (!user) {
        return null;
    }
    model.saveUser(Object.assign(user, data));
    return user;
}

export function deleteUserByID(id) {
    const user = model.getUserByID(id);
    if (!user) {
        return null;
    }
    model.deleteUserByID(id);
    return user;
}

export function listUsers() {
    return model.listUsers();
}