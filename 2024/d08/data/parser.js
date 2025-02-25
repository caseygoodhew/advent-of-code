const readLine = (line, index) => {
    return line.split('');
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
