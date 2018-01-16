const normalize = (text) => {
    const patterns = {
        'whitespaces': /[\s-]+/g,
        'dot': /\./g
    };

    return text
        .replace(patterns.whitespaces, '-')
        .replace(patterns.dot, '')
        .toLowerCase();
}

export default normalize;
