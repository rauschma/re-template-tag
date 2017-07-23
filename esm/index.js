export function re(strs, ...substs) {
    let reStr = transformRaw(strs.raw[0]);
    for (const [i, subst] of substs.entries()) {
        if (subst instanceof RegExp) {
            reStr += subst.source;
        } else if (typeof subst === 'string') {
            reStr += quoteText(subst);
        } else {
            throw new Error('Illegal substitution: '+subst);
        }
        reStr += transformRaw(strs.raw[i+1]);
    }
    return (arg) => {
        let flags;
        if (Array.isArray(arg)) {
            // Called as a template tag function
            flags = arg[0];
        } else if (typeof arg === 'string') {
            // Called as a function with a string parameter
            flags = arg;
        } else {
            throw new Error('Illegal argument: '+arg);
        }
        return new RegExp(reStr, flags);
    }
}

function transformRaw(str) {
    return str.replace(/\\`/g, '`');
}

/**
 * All special characters are escaped, because you may want to quote several characters inside parentheses or square brackets.
 */
export function quoteText(text) {
    return text.replace(/[\\^$.*+?()[\]{}|=!<>:-]/g, '\\$&');
}