import {parseArgs} from "./utils.js";
import {ConflictError, NotFoundError, ValidationError} from "./errors.js";

export class App {
    constructor(io) {
        this._io = io;
        this._handlerMap = new Map();
    }

    async run() {
        this._io.open();

        while (true) {
            const input = await this._io.read();

            const [route, ...args] = input.split(' ');

            if (!this._handlerMap.has(route)) {
                await this._io.writeLine(`Route ${route} not found`);
                continue;
            }

            const {handler, args: expectedArgs} = this._handlerMap.get(route);
            const parsedArgs = parseArgs(args, expectedArgs);

            await this._handle(handler, parsedArgs);
        }
    }

    async _handle(handler, args) {
        try {
            const res = await handler(args);

            if (res) {
                await this._io.writeLine(res);
            }
        } catch (e) {
            if (e instanceof ValidationError) {
                await this._io.writeLine('Error: ' + e.message);
                await this._io.writeLine(e.errors.join(', '));
            } else if (e instanceof NotFoundError) {
                await this._io.writeLine('Error: ' + e.message);
            } else if (e instanceof ConflictError) {
                await this._io.writeLine('Error: ' + e.message);
            } else {
                throw e;
            }
        }
    }

    addRoute(route, handler, expectedArgs = {}) {
        this._handlerMap.set(route, {handler, args: expectedArgs});
    }
}