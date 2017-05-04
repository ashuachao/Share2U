import fs from 'fs';
// import middleware from 'koa-webpack'; 
import Koa from 'koa';
import mongoose from 'mongoose';
import User from './db/Models/UserModel';

const app = new Koa();
mongoose.connect('mongodb://localhost/share2U', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success connect');
    }
})
app.use(async (ctx, next) => {
    console.log('第一层');
    // await User.findByName('joechan', (err, user) => {
    //     console.log(user);
    // });
    const user = await User.find({}).exec((err, user) => {
        console.log(user);
    });
    const num = await User.countUser('joechan').exec((err, num) => {
        console.log(num)
    })
    await next();
    console.log('返回第一层');
    ctx.body = '流程完成'
})

app.use(async (ctx, next) => {
    console.log('第二层');
    // ctx.body = 'show_data11'
    await next();
    console.log('返回第二层');
})

app.use(async (ctx, next) => {
    console.log('第三层');
    // ctx.body = 'show_data'
    console.log('开始返回');
})
app.listen(3000, () => {
    console.log('success')
})