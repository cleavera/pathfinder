export class DuplicateEndError extends Error {
    constructor() {
        super('More than one end position found');
    }
}
