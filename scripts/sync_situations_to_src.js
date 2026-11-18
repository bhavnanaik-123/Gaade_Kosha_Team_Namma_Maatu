import fs from 'fs';
import path from 'path';

const srcData = fs.readFileSync('data/situations_400.json', 'utf8');
fs.writeFileSync('src/data/situations_400.json', srcData, 'utf8');
console.log('Synced situations_400.json to src/data/situations_400.json');
