import { draw, findAllDistances } from './part1.js';

export default function (sky, { isTest }) {
    sky.expand(isTest ? 10 : 1000000);
    draw(sky)
    //return findAllDistances(sky.getStars());
    return findAllDistances(sky.getStars()).reduce((acc, cur) => acc + cur.dist, 0);
}
