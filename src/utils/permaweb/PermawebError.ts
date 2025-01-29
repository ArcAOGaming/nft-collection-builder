export class PermawebError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PermawebError';
    }
}
