const calcWins = ({ time, distance }) => {
    const d = distance + 1;

    // x = (-t +- sqrt(t^2 - 4d)) / -2

    const x = -1 * time;
    const y = Math.sqrt(time * time - 4 * d);
    const z = -2;

    const o1 = Math.ceil((x + y) / z);
    const o2 = Math.floor((x - y) / z);

    return (o2 - o1) + 1
}

export default function (data) {
    return data.map(calcWins).reduce((acc, val) => acc * val, 1)
}
