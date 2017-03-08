"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function $get(object, path, defaultValue) {
    let prop = object;
    if (!prop) {
        return defaultValue;
    }
    for (let x = 0; x < path.length; x++) {
        prop = prop[path[x]];
        if (!prop) {
            return defaultValue;
        }
    }
    return prop;
}
exports.$get = $get;
