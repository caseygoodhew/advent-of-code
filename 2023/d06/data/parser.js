const nums = (str) => {
    return str.split(' ').filter(x => x.length).map(x => parseInt(x))
}

const readData = ([time, distance]) => {
    const t = nums(time);
    const d = nums(distance);

    return t.map((t, i) => ({ time: t, distance: d[i] }))
}

export default (text) => {
    return readData(text.split('\n').filter(line => line.trim().length > 0).map(x => x.split(':')[1].trim()));
}
