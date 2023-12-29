export default function (data) {

    const allStats = Object.values(data.coords).filter(coord => coord.starter).map(coord => ({ next: coord.id, start: coord.id, visited: [], enders: [], firstEnderAt: 0, secondEnderAt: 0 }));

    let index = 0;
    let count = 0;

    while (!allStats.every(stats => /*data.coords[stats.next].ender ||*/ stats.enders.length > 1)) {

        const direction = data.directions[index];
        allStats.forEach(stats => {
            if (data.coords[stats.next].ender) {
                stats.enders.push(stats.next);
                if (stats.enders.length === 1) {
                    stats.firstEnderAt = count;
                } else if (stats.enders.length === 2) {
                    stats.secondEnderAt = count;
                }
            }

            stats.next = data.coords[stats.next].lr[direction];
        });

        index = index === data.directions.length - 1 ? 0 : index + 1;
        count++
    }

    allStats.forEach(stats => {
        stats.diff = stats.secondEnderAt - stats.firstEnderAt;
    })

    //console.log(firstEnderAt)
    return lcm(allStats.map(stats => stats.firstEnderAt))

    //return count;
}

function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if (!b) return b === 0 ? a : NaN;
    return gcd2(b, a % b);
}
function gcd(array) {
    // Greatest common divisor of a list of integers
    var n = 0;
    for (var i = 0; i < array.length; ++i)
        n = gcd2(array[i], n);
    return n;
}
function lcm2(a, b) {
    // Least common multiple of 2 integers
    return a * b / gcd2(a, b);
}
function lcm(array) {
    console.log(array)
    // Least common multiple of a list of integers
    var n = 1;
    for (var i = 0; i < array.length; ++i)
        n = lcm2(array[i], n);
    return n;
}
