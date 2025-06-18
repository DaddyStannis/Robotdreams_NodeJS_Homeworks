function sumNestedNumbers(val) {
    if (typeof val === 'number') {
        return val;
    }

    if (!Array.isArray(val) || val.length === 0) {
        return 0;
    }

    const [first, ...rest] = val;

    return sumNestedNumbers(first) + sumNestedNumbers(rest);
}

function parseArgs() {
    try {
        return JSON.parse(process.argv[2])
    } catch (e) {
        return 0;
    }
}

console.log('Sum:', sumNestedNumbers(parseArgs()));

