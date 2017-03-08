"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DuplicateEndError extends Error {
    constructor() {
        super('More than one end position found');
    }
}
exports.DuplicateEndError = DuplicateEndError;
