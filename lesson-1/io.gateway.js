import readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

export class IOGateway {
    constructor() {
        this._rl = null;
    }

    async read(question = '') {
        return await this._rl.question(question);
    }

    async writeLine(msg) {
        await this._rl.write(msg + '\n');
    }

    open() {
        if (this._rl !== null) {
            throw new Error('gateway already open');
        }
        this._rl = readline.createInterface({input, output});
    }
}