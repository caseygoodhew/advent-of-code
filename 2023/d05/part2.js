

const dereference = (range, map) => {
    const result = [];
    const allocate = (start, end, offset) => {
        if (start == null || end == null || offset == null) {
            return;
        }

        result.push({ start: start + offset, end: end + offset })

        if (range.start === start && range.end === end) {
            range.start = undefined;
            range.end = undefined;
        } else {
            range.start = end + 1;
        }
    }

    for (var item of map) {
        if (range.start < item.source && range.end < item.source) {
            allocate(range.start, range.end, 0);
        } else if (range.start < item.source) {
            allocate(range.start, item.source - 1, 0);
            allocate(item.source, Math.min(range.end, item.source + item.length - 1), item.destination - item.source);
        } else if (range.start >= item.source && range.start < item.source + item.length - 1) {
            allocate(Math.max(range.start, item.source), Math.min(range.end, item.source + item.length - 1), item.destination - item.source);
        }
    }

    allocate(range.start, range.end, 0);
    //console.log(result);
    return result;
}

const makeRanges = (start, length) => ({
    start,
    end: start + length - 1,
});

export default function (data) {

    Object.keys(data).forEach(key => {
        if (data[key].map) {
            data[key].map.sort((a, b) => a.source - b.source);
        }
    });

    const _result = [];

    for (let i = 0; i < data.seeds.data.length; i += 2) {
        _result.push(makeRanges(data.seeds.data[i], data.seeds.data[i + 1]));
    }

    let result = _result.flat();

    //console.log(result);

    let next = data[data.seeds.to];

    while (next) {
        //console.log(next.from, '->', next.to)
        result = result.map(x => dereference(x, next.map)).flat();
        //console.log(result);
        next = data[next.to];
    }
    return Math.min(...result.map(x => x.start));
    //return Math.min(...result);

}
