const makeNode = (val) => {
    const node = {
        value: val,
        up: [],
        down: [],
        toString: () => {
            return node.value;
        }
    }
    return node;
}

const makeRuleNodes = (rules) => {
    const nodes = {};

    rules.forEach(([left, right]) => {
        if (!nodes[left]) {
            nodes[left] = makeNode(left);
        }

        if (!nodes[right]) {
            nodes[right] = makeNode(right);
        }

        const lNode = nodes[left];
        const rNode = nodes[right];

        lNode.down.push(rNode);
        rNode.up.push(lNode);
    });

    return nodes;
}

const collectUp = (nodes, startNum) => {
    const result = [];

    const inner = (num) => {
        nodes[num].up.forEach(uNode => {
            const val = uNode.value;
            if (!result.includes(val)) {
                result.push(val);
                inner(val);
            }
        })
    }

    inner(startNum);

    return result;
}

const evaluate = (rules, update) => {
    const nodes = makeRuleNodes(rules);

    for (var i = 0; i < update.length; i++) {
        const num = update[i];
        const alreadyPrinted = update.slice(0, i);
        const allAbove = collectUp(nodes, num);

        const notPrinted = allAbove.filter(num => !alreadyPrinted.includes(num));

        if (notPrinted.length) {
            return false;
        }
    }

    return true;
}

export default function ({ rules: allRules, updates }, { isTest }) {
    const sets = updates.map(update => {
        return {
            rules: allRules.filter(rule => update.includes(rule[0]) && update.includes(rule[1])),
            update
        }
    });

    const results = sets.map(({ rules, update }) => {
        const result = evaluate(rules, update);
        return {
            result,
            update
        }
    })

    return results
        // take passing results
        .filter(x => x.result)
        // take the middle number
        .map(x => x.update[(x.update.length - 1) / 2])
        // Math.sum() (why doesn't this exist!)
        .reduce((sum, x) => sum += x, 0);
}
