import fs from 'node:fs';

function casting(val, type) {
    if (type === 'string') {
        return String(val);
    }

    if (type === 'number') {
        const num = Number(val);
        if (!isNaN(num)) {
            return num;
        }
    }

    if (type === 'boolean') {
        return Boolean(val);
    }

    throw new TypeError(`Unsupported type: ${type}`);
}

export function parseArgs(args, expectedArgs) {
    const [result, typeMap] = Object.entries(expectedArgs).reduce((acc, current) => {
        const result = {...acc[0], [current[0]]: undefined};
        const typeMap = {...acc[1], [current[0]]: current[1]}
        return [result, typeMap];
    }, [{}, {}]);

    for (let i = 0; i < args.length; ++i) {
        if (args[i].startsWith('--')) {
            const norm = args[i].replace('--', '');
            if (norm in result) {
                const val = args[i + 1];
                const type = typeMap[norm];
                result[norm] = casting(val, type);
            }
        }
    }

    return result;
}

export function loadEnv(path) {
    try {
        const content = fs.readFileSync(path, 'utf-8');
        const lines = content.split('\n');

        const result = {};

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;

            const [key, ...rest] = trimmed.split('=');
            const value = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
            result[key.trim()] = value;
        }

        return result;
    } catch (error) {
        console.error(`Failed to read env file at ${path}:`, error);
        return {};
    }
}