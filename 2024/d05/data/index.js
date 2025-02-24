import fs from 'fs'
import parser from './parser.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (useTestData, part) => {
    const fileName = useTestData ? `test-data-${part}.txt` : 'data.txt'
    const contents = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
    return parser(contents);
}
