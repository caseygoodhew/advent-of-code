export default function (data) {
    const startRe = /^[a-z]*([0-9])/;
    const endRe = /([0-9])[a-z]*$/;

    const calib = data.map(line => {
        const tens = parseInt(line.match(startRe)[1]) * 10;
        const ones = parseInt(line.match(endRe)[1])

        return tens + ones;
    })

    return calib.reduce((acc, val) => acc + val, 0);
}
