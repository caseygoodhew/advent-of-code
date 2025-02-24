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

    const defaults = {
        year: '2024',
        day: 'd05',
        part: 'part1',
        test: false
    };

    const args = process.argv;
    const provided = {};

    args.forEach(arg => {
        if (/^d[0-9]{2}$/.test(arg)) {
            provided.day = arg;
        }

        if (/^[0-9]{4}$/.test(arg)) {
            provided.year = arg;
        }

        if (/^part[0-9]$/.test(arg)) {
            provided.part = arg;
        }

        if (arg === 'test') {
            provided.test = true;
        }

        if (arg === 'notest') {
            provided.test = false;
        }

        if (arg === 'latest') {
            provided.latest = true;
        }
    })

    const latest = {};

    if (provided.latest) {
        const years = fs.readdirSync('./').filter(x => /^[0-9]{4,4}$/.test(x));
        latest.year = years.sort().reverse()[0];

        const days = fs.readdirSync(`./${latest.year}`).filter(x => /^d[0-9]{2,2}$/.test(x));
        latest.day = days.sort().reverse()[0];

        const latestPart2 = fs.readFileSync(`./${latest.year}/${latest.day}/part2.js`, 'utf8');
        const templatePart2 = fs.readFileSync(`./template/part2.js`, 'utf8');

        latest.part = latestPart2 === templatePart2 ? 'part1' : 'part2';
    }

    const resolve = (key) => {
        return provided[key] ?? latest[key] ?? defaults[key];
    }

    let year = resolve('year');
    let day = resolve('day');
    let part = resolve('part');
    let test = resolve('test');

    let moduleA;
    const folder = `./${year}/${day}`;
    try {
        moduleA = await import(`${folder}/index.js`);
    } catch (e) {
        if (make && !fs.existsSync(folder)) {
            create(year, day);
            return main();
        }
    }
    const parts = moduleA.default(test);
    const timer = new Timer({ label: `${part} runtime` });
    timer.start();
    const result = parts[part]({ isTest: test })
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
