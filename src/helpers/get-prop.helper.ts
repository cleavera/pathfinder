export function $get<T>(object: any, path: Array<string | number>, defaultValue: T): T {// tslint:disable-line no-any
    let prop: any = object; // tslint:disable-line no-any

    if (!prop) {
        return defaultValue;
    }

    for (const pathPart of path) {
        prop = prop[pathPart];

        if (!prop) {
            return defaultValue;
        }
    }

    return prop as T;
}
