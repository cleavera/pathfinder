export class DuplicateStartError extends Error {
    constructor() {
        super('More than one start position found');
    }
}
