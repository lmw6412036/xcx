/**
 * Created by MBENBEN on 2017/5/26.
 */
let co = require('co');
let q = require('./q');
const fs = require('fs');
let colors = require('colors');
let path = require("path");

module.exports = (gulp) => {
    gulp.task('make', () => {
        let argv = process.argv;
        if (argv[argv.length - 1] == 'make') {
            return;
        }
        let param = argv[argv.length - 1];
        if (param.indexOf('--all') >= 0) {
            console.log('-all'.green);
            let p = param.split(':');
            if (p.length == 1) {
                return;
            }
            p = p[p.length - 1];

            let mubiao_path = path.join(__dirname, '../src', p, '../');
            console.log('目标路径'+mubiao_path.green);

            try {
                fs.statSync(mubiao_path)
            }catch (err){
                fs.mkdirSync(mubiao_path)
            }

            fs.writeFile(path.join(__dirname, '../src', p + ".js"), fs.readFileSync(path.join(__dirname, './tpl/js.js')), {flag:"wx"},(err) => {
                if (err) {
                    console.log(p + ".js 已存在".red);
                    return ;
                }
                console.log(p + ".js 写入成功".green)
            });
            fs.writeFile(path.join(__dirname, '../src', p + ".json"), fs.readFileSync(path.join(__dirname, './tpl/json.json')),{flag:"wx"} ,(err) => {
                if (err) {
                    console.log(p + ".json 已存在".red);
                    return ;
                }
                console.log(p + ".json 写入成功".green)
            })

            fs.writeFile(path.join(__dirname, '../src', p + ".scss"), "",{flag:"wx"} ,(err) => {
                if (err) {
                    console.log(p + ".scss 已存在".red);
                    return ;
                }
                console.log(p + ".scss 写入成功".green)
            });

            fs.writeFile(path.join(__dirname, '../src', p + ".html"), "",{flag:"wx"},(err) => {
                if (err) {
                    console.log(p + ".html 已存在".red);
                    return ;
                }
                console.log(p + ".html 写入成功".green)
            })
        }
    })
}