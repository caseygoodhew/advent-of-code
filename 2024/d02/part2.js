const rateReport = (...levels) => {
    let diffSum = 0;
    let absDiffSum = 0;

    for (let x = 1; x < levels.length; x++) {
        const left = levels[x - 1];
        const right = levels[x];

        const diff = left - right;
        const absDiff = Math.abs(diff);
        if (absDiff < 1 || absDiff > 3) {
            return false;
        }

        diffSum += diff;
        absDiffSum += absDiff;
    }

    return Math.abs(diffSum) === absDiffSum;
}

const rateDampenedReport = levels => {
    let isSafe = rateReport(...levels);

    const left = [];
    const right = [...levels];

    let holding;

    while (right.length && !isSafe) {
        if (holding !== undefined) {
            left.push(holding);
        }

        holding = right.splice(0, 1);
        isSafe = rateReport(...left, ...right);
    }

    return isSafe;
}

export default function (data, { isTest }) {
    const reportRatings = data.map(levels => rateDampenedReport(levels));
    //return reportRatings;
    return reportRatings.filter(x => x).length
}
