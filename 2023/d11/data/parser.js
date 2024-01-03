const makeStar = (x, y) => {

    let _x = x;
    let _y = y;

    const result = {
        getPosition: () => {
            return { x: _x, y: _y };
        },

        setPosition: (x, y) => {
            _x = x;
            _y = y;
        }
    }

    return result;
}

const makeSky = () => {

    const _stars = [];

    const result = {
        add: (star) => {
            const pos = star.getPosition();

            for (let y = _stars.length - 1; y < pos.y; y++) {
                _stars.push([]);
            }

            const width = Math.max(pos.x, result.getSize().x - 1)

            for (let y = 0; y <= pos.y; y++) {
                for (let x = _stars[y].length - 1; x < width; x++) {
                    _stars[y].push(undefined);
                }
            }

            _stars[pos.y][pos.x] = star;
        },

        getSize: () => {
            return {
                x: Math.max(..._stars.map(s => s.length)),
                y: _stars.length
            }
        },

        getStarAt: (x, y) => {
            return _stars[y][x];
        },

        expand: (factor = 1) => {
            let size = result.getSize();

            for (let y = size.y - 1; y >= 0; y--) {
                if (_stars[y].filter(s => s && s !== '+').length == 0) {
                    const newRow = Array(size.x).fill('+');
                    //console.log(newRow);
                    _stars.splice(y, 1, newRow);
                }
            }

            size = result.getSize();

            for (let x = size.x - 1; x >= 0; x--) {
                if (_stars.filter(s => s[x] && s[x] !== '+').length == 0) {
                    for (let y = 0; y < size.y; y++) {
                        _stars[y].splice(x, 1, '+');
                    }
                }
            }

            // update positions
            size = result.getSize();

            let yFactor = 0;

            for (let y = 0; y < size.y; y++) {
                if (_stars[y][0] === '+') {
                    yFactor += factor - 1;
                } else {
                    let xFactor = 0;
                    for (let x = 0; x < size.x; x++) {
                        if (_stars[y][x] === '+') {
                            xFactor += factor - 1;
                        } else if (_stars[y][x]) {
                            _stars[y][x].setPosition(x + xFactor, y + yFactor);
                        }
                    }
                }
            }
        },

        getStars: () => {
            return _stars.flat().filter(s => s && s !== '+')
        }
    }

    return result;
}

export default (text) => {
    const sky = makeSky();

    text.split('\n').filter(line => line.trim().length > 0).forEach((line, y) => {
        line.split('').forEach((char, x) => {
            if (char === '#') {
                sky.add(makeStar(x, y));
            }
        });
    });

    return sky;
}
