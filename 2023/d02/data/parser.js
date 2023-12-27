//Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

const getGame = (line) => {
    const parts = line.split(' ');
    return parseInt(parts[1]);
}

const getSets = (line) => {
    const sets = line.split(';');

    return sets.map((set) => {
        return set.split(',').reduce((acc, value) => {
            const parts = value.trim().split(' ');
            acc[parts[1]] = parseInt(parts[0]);
            return acc;
        }, {})
    })
}

const parseLine = (line) => {
    const parts = line.split(':');

    return {
        game: getGame(parts[0]),
        sets: getSets(parts[1])
    }
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(line => parseLine(line));
}
