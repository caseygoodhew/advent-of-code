// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53

const toNumbers = (string) => {
    return string.split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
}

const readLine = (line, index) => {
    const parts = line.split(':')[1].split('|');

    return {
        card: index,
        winners: toNumbers(parts[0]),
        mine: toNumbers(parts[1])
    }
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
