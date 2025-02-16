export default function (data, { isTest }) {
    const leftRightUnsorted = data.reduce((all, item) => {
        all.left.push(item[0]);
        all.right.push(item[1]);
        return all;
    }, { left: [], right: [] });

    const left = leftRightUnsorted.left.sort();
    const right = leftRightUnsorted.right.sort();

    const distance = left.reduce((sum, _, index) => {
        sum += Math.abs(left[index] - right[index]);
        return sum;
    }, 0)

    return distance;
}
