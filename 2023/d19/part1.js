const evaluate = (part, condition) => {
    if (!condition.symbol) {
        return true;
    }

    const value = part[condition.symbol];
    switch (condition.operation) {
        case '>':
            return value > condition.value;
        case '<':
            return value < condition.value;
        default:
            throw new Error(`Unknown operator ${condition.operator}`);
    }
}

const step = (part, conditions) => {
    for (let condition of conditions) {
        const result = evaluate(part, condition);
        if (result) {
            return condition;
        }
    }

    throw new Error('oops')
}

const process = (part, conditions, workflows) => {
    let result = step(part, conditions);
    while (!(result.accept || result.reject)) {
        result = step(part, workflows[result.route]);
    }

    return {
        ...result,
        part
    }
}

const sum = (array) => {
    return array.reduce((a, b) => a + b, 0);
}

export const calc = (parts, workflows) => {
    return parts.map(part => process(part, workflows.in, workflows));
}

export default function ({ parts, workflows }) {
    const result = calc(parts, workflows);
    return sum(result.filter(({ accept }) => accept).map(({ part }) => sum(Object.values(part))));
}
