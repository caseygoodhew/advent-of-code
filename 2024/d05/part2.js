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
    return evaluateWithNodes(nodes, update);
}

const evaluateWithNodes = (nodes, update) => {
    for (var i = 0; i < update.length; i++) {
        const num = update[i];
        const alreadyPrinted = update.slice(0, i);
        const allAbove = collectUp(nodes, num);

        const notPrinted = allAbove.filter(num => !alreadyPrinted.includes(num));

        if (notPrinted.length) {
            return i;
        }
    }

    return -1;
}

const findRoot = (nodes) => {
    const roots = Object.keys(nodes).filter(x => !nodes[x].up.length);
    if (roots.length !== 1) {
        throw new Error(`Found ${roots.length} root node candidates`);
    }
    return nodes[roots[0]];
}

const permeate = (root) => {

    const inner = (node) => {
        if (!node.down.length) {
            return [[node.value]];
        }

        const all = node.down.map(cn => inner(cn)).flat();
        return all.map(r => [node.value, ...r])
    }

    const result = inner(root);
    return result;
}

const correctFailingResult = (rules, update) => {
    const nodes = makeRuleNodes(rules);
    const root = findRoot(nodes);

    const permutations = permeate(root, nodes);

    const candidates = permutations
        // expected length
        .filter(x => x.length === update.length)
        // has all expected pages
        .filter(x => x.every(n => update.includes(n)));

    if (candidates.length === 0) {
        throw new Error('No candidates found')
    }

    const selected = candidates.filter(x => evaluateWithNodes(nodes, x) === -1);

    if (selected.length === 0) {
        throw new Error('Could node find a valid combo')
    }

    if (selected.length > 1) {
        throw new Error('Found multiple matches');
    }

    return selected[0]
}

export default function ({ rules: allRules, updates }, { isTest }) {
    const sets = updates.map(update => {
        return {
            rules: allRules.filter(rule => update.includes(rule[0]) && update.includes(rule[1])),
            update
        }
    });

    const failingResults = sets.map(({ rules, update }) => {
        const result = evaluate(rules, update);
        return {
            result,
            rules,
            update
        }
    }).filter(x => x.result >= 0);

    const correctedResults = failingResults.map((x, index) => {
        console.log(`Correcting ${index + 1} of ${failingResults.length}`)
        return correctFailingResult(x.rules, x.update, x.result);
    });


    return correctedResults
        // take the middle number
        .map(x => x[(x.length - 1) / 2])
        // Math.sum() (why doesn't this exist!)
        .reduce((sum, x) => sum += x, 0);
}
