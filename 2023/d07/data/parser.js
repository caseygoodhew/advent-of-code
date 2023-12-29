const readLine = (line, index) => {
    const parts = line.split(' ');
    const cards = parts[0].split('');

    return {
        cards,
        bet: parseInt(parts[1])
    }
}

export default (text) => {
    return text.split('\n').filter(line => line.trim().length > 0).map(readLine);
}
