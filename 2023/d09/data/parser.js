const readLine = (line, index) => {
    return line.trim().split(' ').map(num => parseInt(num));
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
