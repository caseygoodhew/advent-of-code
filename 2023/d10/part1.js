export default function (grid) {
    grid.getSNode().resolveConnections();

    let sNode = grid.getSNode();
    let from = sNode;
    let node = grid.getSNode().neighbours()[0].node;
    let count = 1;

    while (node && node.id() !== sNode.id()) {
        let newNode = node.route(from);
        from = node;
        node = newNode;
        count++;
    }

    return count / 2;
}
