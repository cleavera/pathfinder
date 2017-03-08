"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DuplicateStartError extends Error {
    constructor() {
        super('More than one start position found');
    }
}
exports.DuplicateStartError = DuplicateStartError;
