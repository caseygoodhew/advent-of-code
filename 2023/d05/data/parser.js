const parseFirst = (data) => {
    const parts = data.split(':');
    return {
        from: parts[0],
        to: parts[0].substring(0, 4),
        data: parts[1].trim().split(' ').map(x => parseInt(x)),
    }
}

const parseCoordinates = (data) => {
    const parts = data.trim().split(' ').map(x => parseInt(x));
    return {
        destination: parts[0],
        source: parts[1],
        length: parts[2]
    }
}

const parseTitle = (data) => {
    const matches = [...data.matchAll(/^([a-z]+)-to-([a-z]+) map:$/g)][0];

    return {
        from: matches[1],
        to: matches[2]
    }
}

const parseMap = (data) => {
    const parts = data.split('\n');
    const title = parts.shift();

    return {
        ...parseTitle(title),
        map: parts.filter(x => x && x.length).map(parseCoordinates)
    }
}

export default (text) => {
    const data = text.split('\n\n');
    const first = data.shift()

    return [
        parseFirst(first),
        ...data.map(parseMap)
    ].reduce((acc, cur) => {
        acc[cur.from] = cur;
        return acc;
    }, {});
}
