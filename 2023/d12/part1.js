const draw = (data) => {
    const msg = data.map(x => {
        switch (x) {
            case 0:
                return '#';
            case 1:
                return '.';
            case null:
                return '?';
            default:
                throw new Error(`Unknown value ${x}`);
        }
    })

    console.log(msg.join(''))
}

const solveForSet = (value, before, after, set) => {

}

const solveAll = ({ layout, data }) => {
    // this is wrong - it should be a result tree
    /*const  = [...layout]
    const sorted = layout.map((value, index) => ({ value, index })).sort((a, b) => b.value - a.value)
    let sets = [data];
    for (let i = 0; i < sorted.length; i++) {
        const result = [];
        for (let set of sets) {
            result.push(solveForSet(
                sorted[i].value,
                layout.slice(0, sorted[i].index),
                layout.slice(sorted[i].index + 1),
                set
            ));
        }
        sets =
    }*/
}

export default function (input, { isTest }) {
    solveAll(input[0])
    input.map(({ data }) => draw(data));
}
