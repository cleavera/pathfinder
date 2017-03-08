"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingStartError extends Error {
    constructor() {
        super('Problem missing start');
    }
}
exports.MissingStartError = MissingStartError;
