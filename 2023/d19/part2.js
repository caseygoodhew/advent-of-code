import { calc } from './part1.js'

const splitRanges = (part, conditions) => {

    const result = {
        x: [...part.x],
        m: [...part.m],
        a: [...part.a],
        s: [...part.s],
    }

    for (let condition of conditions) {
        if (!condition.symbol) {
            continue;
        }

        const { symbol, operation, value } = condition;
        const newUpper = operation === '>' ? value : value - 1;
        const newLower = newUpper + 1;

        result[symbol] = result[symbol].flatMap(range => {
            if (range.lower < newUpper && range.upper >= newUpper) {
                return [{
                    lower: range.lower,
                    upper: newUpper
                }, {
                    lower: newLower,
                    upper: range.upper
                }]
            } else {
                return range;
            }
        });

    }

    return result;
}

const makeParts = (ranges) => {
    const { x: X, m: M, a: A, s: S } = ranges;

    const parts = [];

    for (var x = 0; x < X.length; x++) {
        for (var m = 0; m < M.length; m++) {
            for (var a = 0; a < A.length; a++) {
                for (var s = 0; s < S.length; s++) {
                    parts.push({
                        x: X[x].upper,
                        m: M[m].upper,
                        a: A[a].upper,
                        s: S[s].upper,
                        lx: X[x].lower,
                        lm: M[m].lower,
                        la: A[a].lower,
                        ls: S[s].lower
                    });
                }
            }
        }
    }

    return parts;
}

const sum = (array) => {
    return array.reduce((a, b) => a + b, 0);
}

const take = (array, start, end) => {
    return array.slice(start, Math.min(end, array.length));
}

const filterWorkflows = (workflows, symbol) => {
    const keys = Object.keys(workflows);

    return keys.reduce((acc, key) => {
        acc[key] = workflows[key].filter(condition => {
            return condition.symbol === symbol || condition.symbol === undefined;
        })

        return acc;
    }, {})
}

const makePartsForRange = (symbol, ranges) => {
    return ranges.map(({ lower, upper }) => ({
        [symbol]: upper,
        ['l' + symbol]: lower
    }))
}

export default function ({ workflows }) {
    let ranges = {
        x: [{
            lower: 1,
            upper: 4000
        }],
        m: [{
            lower: 1,
            upper: 4000
        }],
        a: [{
            lower: 1,
            upper: 4000
        }],
        s: [{
            lower: 1,
            upper: 4000
        }],
    }

    for (let condition of Object.values(workflows)) {
        ranges = splitRanges(ranges, condition)
    }

    const doCalcForRange = (ranges) => {
        const parts = makeParts(ranges);

        const result = calc(parts, workflows)
            .filter(({ accept }) => accept)
            .map(x => x.part)
        /*.map(part => {
            return {
                x: part.x - part.lx + 1,
                m: part.m - part.lm + 1,
                a: part.a - part.la + 1,
                s: part.s - part.ls + 1
            }
        })
        .map(part => {
            return part.x * part.m * part.a * part.s;
        })*/

        return result;
        return sum(result);
    }
    return doCalcForRange(ranges)
    /*
        const acceptedRanges = Object.keys(ranges).reduce((acc, symbol) => {
            const result = calc(
                makePartsForRange(symbol, ranges.x),
                filterWorkflows(workflows, symbol)
            ).filter(result => result.accept).map(result => result.part);

            if (result.length === 0) {
                result.push({
                    [symbol]: 4000,
                    ['l' + symbol]: 1
                })
            }

            acc[symbol] = result.map(part => ({
                lower: part['l' + symbol],
                upper: part[symbol]
            }));
            return acc;
        }, {});

        acceptedRanges.s.push({ lower: 1, upper: 2662 })
        acceptedRanges.m.push({ lower: 1416, upper: 4000 })

        return doCalcForRange(acceptedRanges);*/


    /*    const rangeResults = [];

        var i = 0;
        while (i < ranges.s.length) {
            const step = 1;
            console.log(`${i} of ${ranges.s.length}`)
            rangeResults.push(doCalcForRange({
                x: ranges.x,
                m: ranges.m,
                a: ranges.a,
                s: take(ranges.s, i, i + step),
            }));
            i += step;
        }

        return sum(rangeResults);
        */
}
