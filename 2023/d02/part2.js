const powers = (data) => {
    return data.map(({ sets }) => {
        const mins = sets.reduce((acc, set) => {
            acc = {
                red: Math.max(acc.red, set.red ?? 0),
                blue: Math.max(acc.blue, set.blue ?? 0),
                green: Math.max(acc.green, set.green ?? 0),
            }
            return acc;
        }, { red: 0, blue: 0, green: 0 });

        return mins.red * mins.blue * mins.green;
    })
}

export default function (data) {
    return powers(data).reduce((a, b) => a + b, 0);
}
