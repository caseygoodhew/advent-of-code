export default function (data, { isTest }) {

    const leftRightUnsorted = data.reduce((all, item) => {
        all.left.push(item[0]);
        all.right[item[1]] = (all.right[item[1]] || 0) + 1;
        return all;
    }, { left: [], right: {} });

    const left = leftRightUnsorted.left.sort();
    const right = leftRightUnsorted.right;

    const similarityScore = left.reduce((sum, value) => {
        sum += value * (right[value] || 0)
        return sum;
    }, 0)

    return similarityScore;
}
