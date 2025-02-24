const searchUL = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y - i][x - i] !== word[i]) {
            return false;
        }
    }

    return true;
}

const searchUR = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y - i][x + i] !== word[i]) {
            return false;
        }
    }

    return true;
}

const searchDL = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y + i][x - i] !== word[i]) {
            return false;
        }
    }

    return true;
}

const searchDR = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y + i][x + i] !== word[i]) {
            return false;
        }
    }

    return true;
}



const search = (data, x, y, word) => {
    if (data[y][x] !== 'A') {
        return 0;
    }

    return [
        (searchUL(data, x, y, 'AS') && searchDR(data, x, y, 'AM'))
        ||
        (searchUL(data, x, y, 'AM') && searchDR(data, x, y, 'AS')),
        (searchUR(data, x, y, 'AS') && searchDL(data, x, y, 'AM'))
        ||
        (searchUR(data, x, y, 'AM') && searchDL(data, x, y, 'AS'))
    ].every(x => x) ? 1 : 0;
}


export default function (data, { isTest }) {

    data.splice(0, 0, []);
    data.push([]);

    let matches = 0;

    for (var y = 0; y < data.length; y++) {
        for (var x = 0; x < data.length; x++) {
            matches += search(data, x, y);
        }
    }

    return matches;
}
