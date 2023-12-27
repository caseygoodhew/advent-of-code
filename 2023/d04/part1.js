export default function (data) {
    return data.map(({ winners, mine }) => {
        const matches = mine.filter(value => winners.includes(value)).length;
        if (matches === 0) {
            return 0;
        }
        return Math.pow(2, matches - 1);
    }).reduce((acc, val) => acc + val, 0)
}
