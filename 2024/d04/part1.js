const searchU = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y - i][x] !== word[i]) {
            return false;
        }
    }

    return true;
}

const searchD = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y + i][x] !== word[i]) {
            return false;
        }
    }

    return true;
}

const searchL = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y][x - i] !== word[i]) {
            return false;
        }
    }

    return true;
}

const searchR = (data, x, y, word) => {
    for (let i = 1; i < word.length; i++) {
        if (data[y][x + i] !== word[i]) {
            return false;
        }
    }

    return true;
}

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
    if (data[y][x] !== word[0]) {
        return 0;
    }

    return [
        searchU(data, x, y, word),
        searchD(data, x, y, word),
        searchL(data, x, y, word),
        searchR(data, x, y, word),
        searchUL(data, x, y, word),
        searchUR(data, x, y, word),
        searchDL(data, x, y, word),
        searchDR(data, x, y, word),
    ].map(x => x ? 1 : 0)
        .reduce((partialSum, a) => partialSum + a, 0);
}


export default function (data, { isTest }) {

    data.splice(0, 0, []);
    data.push([]);

    let matches = 0;
    const word = 'XMAS';

    for (var y = 0; y < data.length; y++) {
        for (var x = 0; x < data.length; x++) {
            matches += search(data, x, y, word);
        }
    }

    return matches;
}
