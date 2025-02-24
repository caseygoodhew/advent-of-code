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

    const nextDir = turnRight(dir);
    while (nextDir !== dir) {
        nextPos = getNextPos(nextDir, pos);
        if (!isBlocked(data, nextPos)) {
            return { dir: nextDir, pos: nextPos };
        }
    }

    throw new Error('We\'re trapped!')
}

const countPositions = (data) => {
    return data.flat().filter(x => x === 'X').length
}

export default function (data, { isTest }) {
    let guard = {
        pos: findMarkedPosition(data),
        dir: 'up'
    }

    while (isInBounds(data, guard.pos)) {
        markVisited(data, guard.pos);
        guard = advanceGuard(data, guard);
    }

    return countPositions(data);
}
