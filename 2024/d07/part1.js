const equations = [
    (l, r) => l + r,
    (l, r) => l * r
]

// count: combos
// 1: [0], [1]
// 2: [0, 0], [0, 1], [1, 0], [1, 1]
// 3: [0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]


const findCombinations = (count) => {
    let result = [[0], [1]];

    for (var i = 0; i < count - 1; i++) {
        const zero = result.map(x => [...x])
        const one = result.map(x => [...x])
        zero.forEach(arr => arr.splice(0, 0, 0));
        one.forEach(arr => arr.splice(0, 0, 1));
        result = zero.concat(one);
    }

    return result;
}

const testOperators = (target, values, operators) => {
    let lhs = values[0];
    for (var i = 1; i < values.length; i++) {
        let rhs = values[i];
        lhs = equations[operators[i - 1]](lhs, rhs);
    }

    return lhs === target;
}

const processEquation = ({ target, values }) => {
    const combinations = findCombinations(values.length - 1);

    return combinations.some(operators => testOperators(target, values, operators));
}

export default function (data, { isTest }) {
    return data.filter(x => processEquation(x)).reduce((sum, val) => sum + val.target, 0);
}
