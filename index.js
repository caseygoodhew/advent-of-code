import { Timer } from 'timer-node';
import chalk from "chalk";
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = (year, day) => {
    fs.cpSync(`${__dirname}/template`, `${__dirname}/${year}/${day}`, { recursive: true, errorOnExist: true });
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
            //create(year, day);
            return main();
        }
    }
    const parts = moduleA.default(test);
    const timer = new Timer({ label: `${part} runtime` });
    timer.start();
    const result = parts[part]()
    timer.stop();

    return {
        command: `${year} ${day} ${part} ${test ? '(test)' : ''}`,
        time: timer.time(),
        result: result
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

const formatTime = (time) => {
    const parts = ['d', 'h', 'm', 's', 'ms'].reduce((acc, unit) => {
        if (acc.length < 2 && (acc.length > 0 || time[unit] > 0)) {
            acc.push(`${time[unit]}${unit}`);
        }

        return acc;
    }, []);

    const chalkFn = (time.d > 0 || time.h > 0 || time.m >= 1)
        ? chalk.red
        : (time.s > 30 ? chalk.yellow : chalk.green)

    return chalkFn(`(${parts.join(' ')})`)
}

main(true).then((_result) => {
    if (_result == null) {
        return;
    }
    const { command, result, time } = _result;
    console.log(`Command: ${chalk.yellow(command)}`);
    console.log(`Time: ${formatTime(time)}`);
    console.log(`Result: ${chalk.green(formatValue(result))
        }`);
    console.log();
}).catch(err => {
    console.error(err);
});
