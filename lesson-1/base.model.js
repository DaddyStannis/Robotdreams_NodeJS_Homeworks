import fs from "node:fs/promises";

export class BaseModel {
    constructor(file) {
        this._file = file;
    }

    async readFile() {
        try {
            const habit = await fs.readFile(this._file);
            return JSON.parse(habit);
        } catch {
            throw new Error("invalid db file");
        }
    }

    async writeFile(data) {
        try {
            const json = JSON.stringify(data);
            await fs.writeFile(this._file, json, null, 4);
        } catch {
            throw new Error("invalid db file");
        }
    }
}