export default function (data, { isTest }) {
    const re = /((mul)\(([0-9]{1,3}),([0-9]{1,3})\))|((do)\(\))|((don't)\(\))/g

    let sum = 0;
    let doSum = true;

    var m;
    do {
        m = re.exec(data);
        if (m) {
            //console.log(m)

            if (doSum && m[2] === 'mul') {
                sum += parseInt(m[3]) * parseInt(m[4]);
            } else if (m[6] === 'do') {
                doSum = true;
            } else if (m[8] === 'don\'t') {
                doSum = false;
            }
        }
    } while (m);

    return sum
}
