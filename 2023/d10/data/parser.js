const connectionMap = {
    '|': ['N', 'S'],
    '-': ['E', 'W'],
    'L': ['N', 'E'],
    'J': ['N', 'W'],
    '7': ['S', 'W'],
    'F': ['S', 'E'],
    '.': []
}

const makeSNode = (grid, x, y) => {

    const connections = ['N', 'E', 'S', 'W'];
    const _node = makeNode(grid, x, y, connections);

    const result = {
        ..._node,
        resolveConnections: () => {
            // try north
            if (!grid.northOf(x, y).south()) {
                connections.splice(connections.indexOf('N'), 1);
            }

            if (!grid.eastOf(x, y).west()) {
                connections.splice(connections.indexOf('E'), 1);
            }

            if (!grid.southOf(x, y).north()) {
                connections.splice(connections.indexOf('S'), 1);
            }

            if (!grid.westOf(x, y).east()) {
                connections.splice(connections.indexOf('W'), 1);
            }

            if (connections.length === 2) {
                return;
            }

            //console.log('neighbours', _node.neighbours())

            _node.neighbours().forEach(({ direction, node }) => {
                if (!result.leadsToStart(node, _node)) {
                    connections.splice(connections.indexOf(direction), 1);
                }
            });

            if (connections.length !== 2) {
                throw new Error(connections.join(','))
            }
        },

        leadsToStart: (node, from) => {
            while (node && node.id() !== _node.id()) {
                let newNode = node.route(from);
                from = node;
                node = newNode;
            }

            return node && node.id() === _node.id();
        }
    }

    return result;
}

export const makeNode = (grid, x, y, connections) => {

    const result = {
        id: () => {
            return `${x},${y}`;
        },

        getConnections: () => {
            return connections;
        },

        getCoordinates: () => {
            return { x, y };
        },

        makeNewNode: (grid, size) => {
            return makeNode(grid, size?.x ?? x, size?.y ?? y, connections);
        },

        neighbours: () => {
            const nodes = [];

            if (result.north()) {
                nodes.push({ direction: 'N', node: grid.northOf(x, y) });
            }

            if (result.east()) {
                nodes.push({ direction: 'E', node: grid.eastOf(x, y) });
            }

            if (result.south()) {
                nodes.push({ direction: 'S', node: grid.southOf(x, y) });
            }

            if (result.west()) {
                nodes.push({ direction: 'W', node: grid.westOf(x, y) });
            }

            return nodes;
        },

        route: (from) => {
            const neighbours = result.neighbours();
            const nodes = neighbours.filter(({ node }) => node.id() !== from.id());

            if (nodes.length !== 1) {

                //throw new Error(`Expected exactly one neighbour for ${result.id()} but got ${nodes.length} (neighbours: ${neighbours.map(({ node }) => node.id()).join(', ')})`);
                return;
            }

            return nodes[0].node;
        },

        connections: () => {
            let count = 0;

            if (result.north() && grid.northOf(x, y).south()) {
                count++;
            }

            if (result.east() && grid.eastOf(x, y).west()) {
                count++;
            }

            if (result.south() && grid.southOf(x, y).north()) {
                count++;
            }

            if (result.west() && grid.westOf(x, y).east()) {
                count++;
            }

            return count;
        },

        north: () => {
            return connections.includes('N');
        },

        east: () => {
            return connections.includes('E');
        },

        south: () => {
            return connections.includes('S');
        },

        west: () => {
            return connections.includes('W');
        }
    }

    return result;
}

export const addNode = (grid, x, y, symbol) => {
    let _node;

    if (symbol === 'S') {
        _node = makeSNode(grid, x, y);
    } else {
        _node = makeNode(grid, x, y, connectionMap[symbol])
    }

    grid.add(_node, symbol === 'S');
}

export const makeGrid = ({ x, y } = {}) => {

    const _nodes = [];

    if (x != null) {
        _nodes.push(Array(x).fill())
    }

    if (y != null) {
        while (_nodes.length < y) {
            _nodes.push([]);
        }
    }

    let _sNode;

    const result = {
        add: (node, isSNode) => {
            if (isSNode) {
                _sNode = node;
            }

            const { x, y } = node.getCoordinates();

            _nodes[y] = _nodes[y] || [];
            _nodes[y][x] = node;
        },

        getSNode: () => {
            return _sNode;
        },

        nodes: () => {
            return _nodes.flat();
        },

        hasNodeAt: (x, y) => {
            const row = _nodes[y];
            if (!row || !row[x]) {
                return false;
            }
            return !!row[x];
        },

        getNodeAt: (x, y) => {
            const row = _nodes[y];
            if (!row || !row[x]) {
                return makeNode(result, x, y, []);
            }
            return row[x];
        },

        northOf: (x, y) => {
            return result.getNodeAt(x, y - 1);
        },

        eastOf: (x, y) => {
            return result.getNodeAt(x + 1, y);
        },

        southOf: (x, y) => {
            return result.getNodeAt(x, y + 1);
        },

        westOf: (x, y) => {
            return result.getNodeAt(x - 1, y);
        },

        getNeighbours: (x, y) => {
            return [
                result.northOf(x, y),
                result.eastOf(x, y),
                result.southOf(x, y),
                result.westOf(x, y)
            ]
        },

        getSize: () => {
            let maxX = 0;
            for (let i = 0; i < _nodes.length; i++) {
                maxX = Math.max(maxX, _nodes[i]?.length ?? 0);
            }

            return {
                x: maxX,
                y: _nodes.length
            }
        }
    }

    return result;
}

const readLine = (grid, line, y) => {
    line.split('').forEach((char, x) => {
        addNode(grid, x, y, char);
    });
}

export default (text) => {
    const grid = makeGrid();

    text.split('\n').filter(line => line.trim().length > 0).forEach((line, y) => readLine(grid, line, y));

    return grid;
}
