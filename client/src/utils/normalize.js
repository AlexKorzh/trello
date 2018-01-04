const normalize = (text) => {
    const patterns = {
        'whitespace': / /g,
        'dot': /\./g
    };

    return text
        .replace(patterns.whitespace, '-')
        .replace(patterns.dot, '');
}

export default normalize;
