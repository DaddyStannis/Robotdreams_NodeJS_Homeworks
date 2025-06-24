import fs from 'node:fs';

export function readJSON(file) {
    try {
        const json = fs.readFileSync(file);
        return JSON.parse(json);
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function writeJSON(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data));
    } catch (err) {
        console.error(err);
        return null;
    }
}