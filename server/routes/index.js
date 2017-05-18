import fs from 'fs';
import Router from 'koa-router';
import path from 'path';
const router = new Router({
    prefix: '/api'
});
let subRouter;
// 读取文件名字
fs.readdirSync(__dirname)
    .filter((filename) => {
        // 除去自身名字的文件
        return filename !== path.basename(__filename)
    })
    .forEach((filename) => {
        subRouter = require(`./${filename}`);
        router.use(subRouter.default.routes(), subRouter.default.allowedMethods())
    })
export default router;