const rateReport = levels => {
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

export default function (data, { isTest }) {
    const reportRatings = data.map(levels => rateReport(levels));
    //return reportRatings;
    return reportRatings.filter(x => x).length
}
