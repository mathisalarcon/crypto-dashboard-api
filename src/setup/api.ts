import * as fs from 'fs';
import * as path from 'path';

import { Router } from 'express';

const api = Router();

function loadRoutes(dirname: string = path.resolve(process.cwd(), 'dist/routes')) {
    if(!fs.existsSync(dirname)) return console.log(`No routes found in ${dirname}`);
    fs.readdirSync(dirname).forEach(dir => {
        if(fs.statSync(path.join(dirname, dir)).isDirectory()) return loadRoutes(path.join(dirname, dir));
        const route: Router = require(path.relative(__dirname, path.join(dirname, dir)))?.default;
        if(route instanceof Router) api.use(route);
    });
}; loadRoutes();

export default api;