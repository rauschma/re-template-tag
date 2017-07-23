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
    let flags = '';
    if (reStr.startsWith('/')) {
        const lastSlashIndex = reStr.lastIndexOf('/');
        if (lastSlashIndex === 0) {
            throw new Error('If the `re` string starts with a slash, it must end with a second slash and zero or more flags: '+reStr);
        }
        flags = reStr.slice(lastSlashIndex+1);
        reStr = reStr.slice(1, lastSlashIndex);
    }
    return new RegExp(reStr, flags);
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