const readParts = (parts) => {
    return parts.split('\n').map(line => {
        return line.split(',').reduce((acc, bit) => {
            const bits = bit.split('=');
            acc[bits[0]] = parseInt(bits[1]);
            return acc;
        }, {});
    });
}

const readCondition = (condition) => {
    if (/^[a-z]+$/i.test(condition)) {
        if (condition === 'A') {
            return { accept: true };
        } else if (condition === 'R') {
            return { reject: true };
        } else {
            return { route: condition }
        }
    }

    const matches = /([a-z])([><])([0-9]+):([a-z]+)/i.exec(condition);
    return {
        symbol: matches[1],
        operation: matches[2],
        value: parseInt(matches[3]),
        ...readCondition(matches[4])
    }
}

const readConditions = (conditions) => {
    return conditions.split(',').map(condition => {
        return readCondition(condition);
    });
}

const readWorkflows = (block) => {
    return block.split('\n').reduce((acc, line) => {
        const [name, conditions] = line.substring(0, line.length - 1).split('{');
        acc[name] = readConditions(conditions)
        return acc;
    }, {});
}

export default (text) => {
    const parts = text.split('\n\n').map(x => x.trim()).filter(line => line.length > 0);
    return {
        parts: readParts(parts[1]),
        workflows: readWorkflows(parts[0])
    }
}
