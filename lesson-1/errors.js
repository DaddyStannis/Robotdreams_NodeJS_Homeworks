export class ValidationError extends Error {
    constructor(errors, code = 400) {
        super('Validation failed');
        this.errors = errors;
        this.code = code;
        this.name = "ValidationError";
    }
}

export class NotFoundError extends Error {
    constructor(message, code = 404) {
        super(message);
        this.code = code;
        this.name = "NotFoundError";
    }
}

export class ConflictError extends Error {
    constructor(message, code = 409) {
        super(message);
        this.code = code;
        this.name = "ConflictError";
    }
}
