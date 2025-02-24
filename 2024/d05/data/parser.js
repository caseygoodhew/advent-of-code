const readRule = (line, index) => {
    return line.split('|').map(x => x.trim()).filter(x => x.length).map(x => parseInt(x));
}

const readUpdate = (line, index) => {
    return line.split(',').map(x => x.trim()).filter(x => x.length).map(x => parseInt(x));
}

export default (text) => {
    const sections = text.split('\n\n');

    return {
        rules: sections[0].split('\n').filter(line => line.trim().length > 0).map(readRule),
        updates: sections[1].split('\n').filter(line => line.trim().length > 0).map(readUpdate)
    }
}
