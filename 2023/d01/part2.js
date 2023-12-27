const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

const getValue = (text) => {
    if (text.length === 1) {
        return parseInt(text);
    }

    return numbers[text]
}

export default function (data) {
    const startRe = /^([0-9]|one|two|three|four|five|six|seven|eight|nine)/;
    const endRe = /([0-9]|one|two|three|four|five|six|seven|eight|nine)$/;

    const calib = data.map(line => {
        while (line.length && !startRe.test(line)) {
            line = line.substring(1);
        }

        const tens = getValue(line.match(startRe)[1]) * 10;

        while (line.length && !endRe.test(line)) {
            line = line.substring(0, line.length - 1);
        }

        const ones = getValue(line.match(endRe)[1])

        return tens + ones;
    })

    return calib.reduce((acc, val) => acc + val, 0);
}
