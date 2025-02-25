// 3267: 81 40 27

const readLine = (line, index) => {
    const parts = line.split(':');

    return {
        target: parseInt(parts[0]),
        values: parts[1].split(' ').filter(x => x.trim().length).map(x => parseInt(x)),
    }
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
