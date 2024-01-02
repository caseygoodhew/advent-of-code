import { makeGrid, makeNode } from "./data/parser.js";
import chalk from 'chalk'

const clonePath = (grid) => {
    const newGrid = makeGrid(grid.getSize());
    let sNode = grid.getSNode();
    sNode.type = 'P'
    newGrid.add(sNode, true);

    let from = sNode;
    let node = grid.getSNode().neighbours()[0].node;
    let count = 1;

    while (node && node.id() !== sNode.id()) {
        node.type = 'P';
        newGrid.add(node)
        let newNode = node.route(from);
        from = node;
        node = newNode;
        count++;
    }

    return newGrid;
}

const makeNonPathNode = (grid, x, y) => {

    let _type = 'U';

    return {
        get type() {
            return _type;
        },

        set type(value) {
            _type = value;
        },

        getCoordinates: () => {
            return { x, y };
        },

        getConnections: () => {
            return [];
        },

        resolveOuter: () => {
            const isOuter = grid.getNeighbours(x, y).some(n => n.type === 'O' || n.type === undefined);
            if (isOuter) {
                return _type = 'O';
            }
        }
    }
}

const fillGrid = (grid) => {
    const size = grid.getSize();

    for (let x = 0; x < size.x; x++) {
        for (let y = 0; y < size.y; y++) {
            if (!grid.hasNodeAt(x, y)) {
                grid.add(makeNonPathNode(grid, x, y));
            }
        }
    }
}

const resolveNodeTypes = (grid) => {
    const nodes = grid.nodes().filter(n => n.type === 'U');
    let resolvedCount = 0;
    nodes.forEach(node => {
        if (node.resolveOuter()) {
            resolvedCount++;
        }
    });

    if (resolvedCount > 0) {
        return resolveNodeTypes(grid);
    }

    grid.nodes().filter(n => n.type === 'U').forEach(n => n.type = 'I')
}

const draw = (grid) => {
    const types = [];
    const size = grid.getSize();
    const space = () => ' '
    const tm = {
        P: chalk.grey,
        I: chalk.blue,
        O: chalk.green,
        '*': chalk.red
    }

    for (let y = 0; y < size.y; y++) {
        types.push([]);
        for (let x = 0; x < size.x; x++) {
            const type = grid.getNodeAt(x, y).type ?? '*';
            types[types.length - 1].push((tm[type] ?? tm['*'])(type));
        }
    }

    console.log(
        types
            .map(row => row.join(''))
            .join('\n')
    );
}

const expand = (grid) => {
    const size = grid.getSize();
    const newGrid = makeGrid({ x: size.x * 2, y: size.y * 2 });

    for (let y = 0; y < size.y; y++) {
        for (let x = 0; x < size.x; x++) {
            if (!grid.hasNodeAt(x, y)) { continue; }

            const node = grid.getNodeAt(x, y);
            const newNode = makeNode(newGrid, x * 2, y * 2, node.getConnections());
            newNode.type = node.type;
            newGrid.add(newNode);

            if (node.west() && grid.hasNodeAt(x - 1, y)) {
                const prevNode = grid.getNodeAt(x - 1, y);
                if (prevNode.east()) {
                    const nextNode = makeNode(newGrid, x * 2 - 1, y * 2, ['E', 'W'])
                    nextNode.type = 'P'
                    newGrid.add(nextNode);
                }
            }

            if (node.north() && grid.hasNodeAt(x, y - 1)) {
                const prevNode = grid.getNodeAt(x, y - 1);
                if (prevNode.south()) {
                    const nextNode = makeNode(newGrid, x * 2, y * 2 - 1, ['N', 'S'])
                    nextNode.type = 'P'
                    newGrid.add(nextNode);
                }
            }
        }
    }

    return newGrid;
}

const contract = (grid) => {
    const size = grid.getSize();
    const newGrid = makeGrid({ x: size.x / 2, y: size.y / 2 });

    for (let y = 0; y < size.y; y += 2) {
        for (let x = 0; x < size.x; x += 2) {
            const node = grid.getNodeAt(x, y);
            const newNode = makeNode(newGrid, Math.floor(x / 2), Math.floor(y / 2), node.getConnections())
            newNode.type = node.type;
            newGrid.add(newNode);
        }
    }
    return newGrid;
}

export default function (_grid) {
    _grid.getSNode().resolveConnections();
    let grid = clonePath(_grid);
    grid = expand(grid);

    fillGrid(grid);
    resolveNodeTypes(grid);

    grid = contract(grid);
    //draw(grid);

    return grid.nodes().reduce((acc, node) => {
        acc[node.type] = (acc[node.type] || 0) + 1;
        return acc;
    }, {}).I;
}
