export function pathToRegex(path) {
    const pattern = path
        .replace(/\[([^\]]+)\]/g, (_, name) => `(?<${name}>[^/]+)`)
        .replace(/\/$/, '');

    return new RegExp(`^${pattern.startsWith('/') ? '' : '/'}${pattern}/?$`);
}