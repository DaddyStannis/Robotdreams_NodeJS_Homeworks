import {loadEnv} from "./utils.js";

const FREQ_WHITELIST = ['daily', 'weekly', 'monthly'];

export class Habit {
    constructor({id = null, hits = [], ...props}) {
        this.id = id;
        this.hits = hits;
        this.update(props);
    }

    get wasDoneToday() {
        const now = this.getToday();
        return this.hits.some(stat => {
            return new Date(stat.doneAt).toDateString() === now.toDateString();
        });
    }

    markAsDone() {
        if (!this.wasDoneToday) {
            this.hits.push({doneAt: new Date()});
        }
    }

    getToday() {
        const env = loadEnv('.env');
        if (env.DAY_OFFSET && env.DAY_OFFSET !== 'none') {
            return new Date(Date.now() + env.DAY_OFFSET * 24 * 60 * 60 * 1000)
        }
        return new Date();
    }

    update({name, freq}) {
        this.name = name ?? this.name;
        this.freq = freq ?? this.freq;
    }

    validate() {
        const errors = [];

        if (typeof this.name !== "string" || this.name.length < 1) {
            errors.push("name must be a string longer than 1 character");
        }
        if (typeof this.freq !== "string" || !FREQ_WHITELIST.includes(this.freq)) {
            errors.push(`freq must be one of: ${FREQ_WHITELIST.join(', ')}`);
        }
        if (!Array.isArray(this.hits)) {
            errors.push("done must an array type");
        }

        return [Boolean(errors.length), errors];
    }
}
