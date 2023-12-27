const MAX_OF_EACH = {
    red: 12,
    green: 13,
    blue: 14
}

const shouldCount = (sets) => {

    const result = sets.every(set => {

        const sumKeys = Object.keys(set);

        if (!sumKeys.every(key => key in MAX_OF_EACH)) {
            return false;
        }

        if (!sumKeys.every(key => set[key] <= MAX_OF_EACH[key])) {
            return false;
        }

        return true;
    })

    return result ? 1 : 0
}

export default function (data) {
    return data.reduce((acc, item) => {
        const mul = shouldCount(item.sets);
        if (mul === 1) {
            //console.log(JSON.stringify(item))
        }

        return acc + (mul * item.game);
    }, 0);
}
