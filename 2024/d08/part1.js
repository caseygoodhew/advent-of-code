const toCoordinateMap = data => {
    const map = {};
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            map[data[y][x]] = map[data[y][x]] ?? [];
            map[data[y][x]].push({ x, y });
        }
    }
    delete map['.']

    return map;
}

/*
............
.....0...... (5, 1)
.......0.... (7, 2)
....0....... (4, 3)
......A.....

(5, 1) -> (7, 2) >> [2, 1]  >> (3, 0)  (9, 3)
(5, 1) -> (4, 3) >> [-1, 2] >> (6, -1) (3, 5)
(7, 2) -> (4, 3) >> [-3, 1] >> (10, 1) (1, 4)
*/

const findAntiNodeCoordinates = nodeCoordinates => {
    const anc = [];
    for (var i = 0; i < nodeCoordinates.length - 1; i++) {
        for (var j = i + 1; j < nodeCoordinates.length; j++) {
            const node1 = nodeCoordinates[i];
            const node2 = nodeCoordinates[j];
            const deltaX = node2.x - node1.x;
            const deltaY = node2.y - node1.y
            anc.push({
                x: node1.x - deltaX,
                y: node1.y - deltaY
            })
            anc.push({
                x: node2.x + deltaX,
                y: node2.y + deltaY
            })
        }
    }
    return anc;
}

export default function (data, { isTest }) {
    const map = toCoordinateMap(data);
    const keys = Object.keys(map);

    const collection = keys.map(key => ({
        key,
        nodes: map[key],
        antiNodes: findAntiNodeCoordinates(map[key])
    }));

    const allAntiNodes = collection.map(x => x.antiNodes).flat();


    const inboundsAntiNodes = allAntiNodes.filter(({ x, y }) => {
        if (x < 0 || y < 0) {
            return false;
        }
        if (y >= data.length) {
            return false;
        }
        if (x >= data[y].length) {
            return false;
        }
        return true;
    });

    const dedupMap = inboundsAntiNodes.reduce((o, coord) => {
        o[JSON.stringify(coord)] = coord
        return o;
    }, {})

    const deduped = Object.values(dedupMap)

    return deduped.length;
    //return inboundsAntiNodes;
    //return [allAntiNodes.length, inboundsAntiNodes.length, deduped.length]
}
