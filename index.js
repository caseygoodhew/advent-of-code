import chalk from "chalk";

async function main() {

    const args = process.argv;
    let year = '2023';
    let day = 'd01'
    let part = 'part1';
    let test = false;

    args.forEach(arg => {
        if (/^d[0-9]{2}$/.test(arg)) {
            day = arg;
        }

        if (/^[0-9]{4}$/.test(arg)) {
            year = arg;
        }

        if (/^part[0-9]$/.test(arg)) {
            part = arg;
        }

        if (arg === 'test') {
            test = true;
        }
    })

    const moduleA = await import(`./${year}/${day}/index.js`);
    const parts = moduleA.default(test);
    return {
        command: `${year} ${day} ${part} ${test ? '(test)' : ''}`,
        result: parts[part]()
    };
}

const formatValue = (value) => {
    switch (typeof value) {
        case 'object':
            return JSON.stringify(value, 0, 2);
        default:
            return value;
    }
}

main().then(({ command, result }) => {
    console.log(`Command: ${chalk.yellow(command)}`);
    console.log(`Result: ${chalk.green(formatValue(result))}`);
    console.log();
}).catch(err => {
    console.error(err);
});
