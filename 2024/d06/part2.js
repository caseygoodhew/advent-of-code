const findMarkedPosition = (data) => {
    for (var y = 0; y < data.length; y++) {
        for (var x = 0; x < data[y].length; x++) {
            if (data[y][x] === '^') {
                return { x, y };
            }
        }
    }
}

const markVisited = (data, pos) => {
    data[pos.y][pos.x] = 'X';
}

const isVisited = (data, pos) => {
    return data[pos.y][pos.x] === 'X';
}

const addBarrier = (data, pos) => {
    data[pos.y][pos.x] = '#';
}

const isInBounds = (data, pos) => {
    if (pos.x < 0 || pos.y < 0) {
        return false;
    }

    if (pos.y >= data.length) {
        return false;
    }

    if (pos.x >= data[pos.y].length) {
        return false;
    }

    return true;
}

const turnRight = dir => {
    switch (dir) {
        case 'up':
            return 'right';
        case 'right':
            return 'down';
        case 'down':
            return 'left';
        case 'left':
            return 'up';
        default:
            throw new Error('Unknown direction ' + dir)
    }
}

const isBlocked = (data, pos) => {
    if (!isInBounds(data, pos)) {
        return false;
    }

    return data[pos.y][pos.x] === '#';
}

const getNextPos = (dir, pos) => {
    switch (dir) {
        case 'up':
            return { x: pos.x, y: pos.y - 1 };
        case 'down':
            return { x: pos.x, y: pos.y + 1 };
        case 'left':
            return { x: pos.x - 1, y: pos.y };
        case 'right':
            return { x: pos.x + 1, y: pos.y };
        default:
            throw new Error('Unknown direction ' + dir)
    }
}

const advanceGuard = (data, { dir, pos }) => {

    let nextPos = getNextPos(dir, pos);

    if (!isBlocked(data, nextPos)) {
        return { dir, pos: nextPos };
    }

    let nextDir = turnRight(dir);
    while (nextDir !== dir) {
        nextPos = getNextPos(nextDir, pos);
        if (!isBlocked(data, nextPos)) {
            return { dir: nextDir, pos: nextPos };
        }
        nextDir = turnRight(nextDir);
    }

    throw new Error('We\'re trapped!')
}

const countPositions = (data) => {
    return data.flat().filter(x => x === 'X').length
}

const genAllPossiblePositions = (data) => {
    return data
        .map((row, y) => row.map((cell, x) => cell === '.' ? { x, y } : undefined))
        .flat()
        .filter(x => x);
}

export default function (inData, { isTest }) {
    const json = JSON.stringify(inData);

    const allPossiblePositions = genAllPossiblePositions(inData);

    const results = allPossiblePositions.map((barrierPos, index) => {

        console.log(`Processing position ${index + 1} of ${allPossiblePositions.left}`)

        if (index === 14) {
            debugger;
        }
        const data = {
            updated: JSON.parse(json),
            up: JSON.parse(json),
            down: JSON.parse(json),
            left: JSON.parse(json),
            right: JSON.parse(json)
        }

        addBarrier(data.updated, barrierPos);

        let guard = {
            pos: findMarkedPosition(data.updated),
            dir: 'up'
        }

        while (isInBounds(data.updated, guard.pos)) {
            if (isVisited(data[guard.dir], guard.pos)) {
                return true;
            }

            markVisited(data[guard.dir], guard.pos);
            guard = advanceGuard(data.updated, guard);
        }

        return false;
    })

    return results.filter(x => x).length
}
