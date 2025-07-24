export function filterUniqueByTitle(items) {
    const seen = new Set();
    return items.filter((item) => {
        if (seen.has(item.title)) return false;
        seen.add(item.title);
        return true;
    });
}