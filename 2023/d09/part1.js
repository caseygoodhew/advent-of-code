const sum = (array) => {
    return array.reduce((a, b) => a + b, 0);
}

const solve = (_data) => {
    const data = [_data];

    while (data[data.length - 1].some(x => x !== 0)) {
        const line = [];
        for (let i = 1; i < data[data.length - 1].length; i++) {
            line.push(data[data.length - 1][i] - data[data.length - 1][i - 1]);
        }
        data.push(line);
    }

    let result = 0;
    for (let i = data.length - 1; i >= 0; i--) {
        result += data[i][data[i].length - 1]
    }

    return result;
}

export default function (data) {
    //return solve(data[0])

    return sum(data.map(solve));
}
