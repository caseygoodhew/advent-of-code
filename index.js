import chalk from "chalk";
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = (year, day) => {
    fs.cpSync(`${__dirname}/template`, `${__dirname}/${year}/${day}`, { recursive: true });
}

async function main(make) {

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

    let moduleA;
    try {
        moduleA = await import(`./${year}/${day}/index.js`);
    } catch (e) {
        if (make) {
            create(year, day);
            main();
        }
        return;
    }
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

main(true).then(({ command, result }) => {
    console.log(`Command: ${chalk.yellow(command)}`);
    console.log(`Result: ${chalk.green(formatValue(result))}`);
    console.log();
}).catch(err => {
    console.error(err);
});
