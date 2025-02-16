const readLine = (line, index) => {
    const parts = line.split(' ');

    return {
        layout: parts[1].split(',').map(x => parseInt(x)),
        data: parts[0].split('').map(x => {
            switch (x) {
                case '.':
                    return 1;
                case '#':
                    return 0;
                case '?':
                    return null;
                default:
                    throw new Error(`Invalid character ${x}`);
            }
        })
    }
}
// ???.### 1,1,3
export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
