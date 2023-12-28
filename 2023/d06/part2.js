import part1 from './part1.js';

export default function (data) {
    const time = [];
    const distance = [];

    data.forEach(item => {
        time.push(item.time);
        distance.push(item.distance);
    })

    return part1([{
        time: parseInt(time.join('')),
        distance: parseInt(distance.join(''))
    }])
}
