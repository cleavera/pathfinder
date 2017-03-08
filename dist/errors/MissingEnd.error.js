"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingEndError extends Error {
    constructor() {
        super('Problem missing end');
    }
}
exports.MissingEndError = MissingEndError;
