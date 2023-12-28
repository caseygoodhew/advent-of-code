const dereference = (source, _map) => {
    const map = [..._map].sort((a, b) => a.source - b.source);

    if (source < map[0].source) {
        return source;
    }

    const choose = map.find(item => source >= item.source && source < item.source + item.length);
    if (!choose) {
        return source;
    }

    const delta = choose.destination - choose.source;
    return source + delta;
}

export default function (data) {
    let result = data.seeds.data;
    //console.log(result);

    let next = data[data.seeds.to];

    while (next) {
        //console.log(next.from, '->', next.to)
        result = result.map(x => dereference(x, next.map));
        //console.log(result);
        next = data[next.to];
    }

    return Math.min(...result);
}
