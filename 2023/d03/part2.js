const sharedGear = (item1, item2) => {
    for (let symbol1 of item1.symbols) {
        for (let symbol2 of item2.symbols) {
            //console.log(symbol1, symbol2)
            if (symbol1.row === symbol2.row && symbol1.col === symbol2.col) {
                return true;
            }
        }
    }
}

export default function (data) {
    const touchingGears = data.filter(item => item.symbols.some(symbol => symbol.symbol === '*'));
    //console.log(touchingGears)

    let result = 0;
    let results = [];

    for (var i = 0; i < touchingGears.length; i++) {
        for (var j = i + 1; j < touchingGears.length; j++) {
            if (sharedGear(touchingGears[i], touchingGears[j])) {
                result += touchingGears[i].number * touchingGears[j].number;
                results.push([touchingGears[i].number, touchingGears[j].number])
            }
        }
    }

    return result;
}
