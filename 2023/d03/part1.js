const accumulate = (item) => {
    if (!item.symbols.length) {
        return 0;
    }

    return item.number
}

export default function (data) {
    return data.reduce((acc, item) => acc + accumulate(item), 0)
}

// answer 535078
