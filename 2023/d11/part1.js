import chalk from 'chalk';

export const draw = (sky) => {

    const size = sky.getSize();

    const map = [];

    for (let y = 0; y < size.y; y++) {
        const row = [];
        for (let x = 0; x < size.x; x++) {
            const star = sky.getStarAt(x, y);
            switch (star) {
                case undefined:
                    row.push(chalk.grey('.'));
                    break;
                case '+':
                    row.push(chalk.grey('+'));
                    break;
                default:
                    row.push(chalk.yellow('*'));
                    break;
            }
        }
        map.push(row.join(''));
    }
    console.log(size)
    console.log(map.join('\n'));
}

const findDistanceBetween = (s1, s2) => {
    const p1 = s1.getPosition();
    const p2 = s2.getPosition();
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

export const findAllDistances = (stars) => {
    const distances = [];
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const p1 = stars[i].getPosition();
            const p2 = stars[j].getPosition();
            distances.push({
                [`s${i + 1}`]: `(${p1.x}, ${p1.y})`,
                [`s${j + 1}`]: `(${p2.x}, ${p2.y})`,
                dist: findDistanceBetween(stars[i], stars[j])
            })
        }
    }

    return distances;
}

export default function (sky, { isTest }) {
    //draw(sky)
    sky.expand(2);
    draw(sky)
    return findAllDistances(sky.getStars()).reduce((acc, cur) => acc + cur.dist, 0);
}
