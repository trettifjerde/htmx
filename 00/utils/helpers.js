import path from 'path';
import fs from 'fs';

export function getPage(...breadcrumps) {
    return fs.readFileSync(path.join(process.cwd(), ...breadcrumps)).toString();
}