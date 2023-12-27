export default function (data) {
    const cards = data.map(({ card, winners, mine }) => {
        const matches = mine.filter(value => winners.includes(value)).length;

        return {
            card,
            wins: (new Array(matches).fill(0)).map((x, i) => card + i + 1)
        }
    })

    let results = [];
    for (let i = cards.length - 1; i >= 0; i--) {
        results[i] = cards[i].wins.reduce((acc, card) => acc + results[card], 1);
    }

    return results.reduce((acc, val) => acc + val, 0);
}
