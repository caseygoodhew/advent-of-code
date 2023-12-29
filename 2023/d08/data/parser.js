//AAA = (BBB, CCC)

const readLine = (line, index) => {
    const match = line.match(/([a-z0-9]+)\s*=\s*\(([a-z0-9]+), ([a-z0-9]+)\)/i)

    return {
        id: match[1],
        starter: match[1][2] === 'A',
        ender: match[1][2] === 'Z',
        lr: {
            L: match[2],
            R: match[3]
        }
    }
}

const readCoords = (block) => {
    const coords = block.split('\n').filter(line => line.trim().length > 0).map(readLine);
    return coords.reduce((acc, coord) => {
        acc[coord.id] = coord;
        return acc;
    }, {});
}

export default (text) => {
    const parts = text.split('\n\n');

    return {
        directions: parts[0].trim().split(''),
        coords: readCoords(parts[1])
    }
}
