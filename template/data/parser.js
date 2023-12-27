const readLine = (line, index) => {
    return line;
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
