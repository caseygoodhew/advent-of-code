const mulStr = str => {
    const re = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/
}

export default function (data, { isTest }) {
    const re = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g

    let sum = 0;

    var m;
    do {
        m = re.exec(data);
        if (m) {
            sum += parseInt(m[1]) * parseInt(m[2])
        }
    } while (m);

    return sum
}
