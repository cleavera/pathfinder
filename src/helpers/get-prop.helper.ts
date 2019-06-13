export function $get(object: any, path: any[], defaultValue: any): any {
    let prop: any = object;

    if (!prop) {
        return defaultValue;
    }

    for (let x: number = 0; x < path.length; x++) {
        prop = prop[path[x]];

        if (!prop) {
            return defaultValue;
        }
    }

    return prop;
}
