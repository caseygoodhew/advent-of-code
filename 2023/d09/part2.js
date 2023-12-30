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

    //return data;
    let results = [];
    //console.log('data.length', data.length)

    for (let i = data.length - 1; i >= 0; i--) {
        const dataVal = data[i][0];
        const resultVal = results[data.length - (i + 2)] ?? 0;
        const result = dataVal - resultVal;
        //console.log('data', dataVal, 'pres', resultVal, 'result', result);
        results.push(result);
    }

    return results[results.length - 1]
}

export default function (data) {
    //return data.map(solve)

    return sum(data.map(solve));
}
