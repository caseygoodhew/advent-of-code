export default function (data) {
    let next = 'AAA';
    let index = 0;
    let count = 0;

    while (next !== 'ZZZ') {
        next = data.coords[next].lr[data.directions[index]];
        index = index === data.directions.length - 1 ? 0 : index + 1;
        count++;
    }

    return count;
}
