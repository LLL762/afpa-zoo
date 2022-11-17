function escape(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function startsWith(string: string) {
    return new RegExp("^" + escape(string));
}

function contains(string: string) {
    return new RegExp(escape(string));
}

function containsWordStartingBy(string: string) {
    return new RegExp("\\b" + escape(string));
}




export default { escape, startsWith, contains, containsWordStartingBy }