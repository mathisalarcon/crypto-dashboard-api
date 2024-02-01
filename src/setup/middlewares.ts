import * as fs from 'fs';
import * as path from 'path';

import { Router } from 'express';

const middlewares = Router();

function loadMiddlewares(dirname: string = path.resolve(process.cwd(), 'dist/middlewares')) {
    if(!fs.existsSync(dirname)) return console.log(`No middlewares found in ${dirname}`);
    fs.readdirSync(dirname).forEach(dir => {
        if(fs.statSync(path.join(dirname, dir)).isDirectory()) return loadMiddlewares(path.join(dirname, dir));
        const middleware: Router = require(path.relative(__dirname, path.join(dirname, dir)))?.default;
        if(middleware instanceof Router) middlewares.use(middleware);
    });
}; loadMiddlewares();

export default middlewares;