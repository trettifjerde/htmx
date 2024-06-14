import path from 'path';
import fs from 'fs';

export function getIndexPage(...breadcrumps) {
    return fs.readFileSync(path.join(process.cwd(), ...breadcrumps, 'index.html')).toString();
}