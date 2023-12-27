
const reduce = (text, index, length) => {
    return text.substring(index - 1, index + length + 1).replace(/[0-9\.]/g, ' ');
}

const findSymbols = (all, row, index, length) => {
    const _rows = [
        reduce(all[row - 1], index, length),
        reduce(all[row], index, length),
        reduce(all[row + 1], index, length)
    ]

    const rows = _rows.map(r => r.split(''));

    const result = [];

    for (var j = 0; j < rows.length; j++) {
        for (var i = 0; i < rows[j].length; i++) {
            if (rows[j][i].length && rows[j][i] !== ' ') {
                result.push({
                    symbol: rows[j][i],
                    row: row - 1 + j,
                    col: index + i
                });
            }
        }
    }

    return result;
}

const readLine = (all, line, row) => {
    const result = [];
    for (let match of line.matchAll(/[0-9]+/g)) {
        result.push({
            number: parseInt(match[0]),
            symbols: findSymbols(all, row, match.index, match[0].length)
            //row: reduce(all[row], match.index, match[0].length),
            //before: reduce(all[row - 1], match.index, match[0].length),
            //after: reduce(all[row + 1], match.index, match[0].length)
        })
    }

    return result;
}

export default (text) => {
    const data = ['', ...text.split('\n').filter(line => line.trim().length > 0), ''].map(line => `.${line}.`);
    return data.map((line, i) => readLine(data, line, i)).flat();
}
