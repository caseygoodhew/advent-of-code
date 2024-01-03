import part1 from './part1.js';
import part2 from './part2.js';
import dataLoader from './data/index.js'

export default (useTestData) => {

    return {
        part1: (options) => part1(dataLoader(useTestData, 1), options),
        part2: (options) => part2(dataLoader(useTestData, 2), options),
    }
}
