const readLine = (line, index) => {
    return line.split(' ').map(x => x.trim()).filter(x => x.length).map(x => parseInt(x))
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
