var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
let co = require("co");
let q = require('./modules/q');
let fs = require("fs");
let path = require("path");
let glob = require("glob");

require('./modules/make')(gulp);

gulp.task("app", () => {
    co(function*() {
        let appJson = yield q(fs, 'readFile')(path.join(__dirname, "./src/app.json"), 'utf8');
        let appObj = JSON.parse(appJson);
        appObj.pages=["pages/index"];
        let pages = glob.sync("./src/pages/**/*.html")
        pages.forEach((item, index) => {
            let page = item.replace('./src/', '');
            page=page.replace('.html','');
            if(page!=appObj.pages[0]){
                appObj.pages.push(page);
            }

        })
        var data=JSON.stringify(appObj,'',4);
        fs.writeFile(path.join(__dirname, "./src/app.json"),data,function () {})
    });
});

gulp.task('wxml', () => {
    return gulp.src('./src/**/*.html')
        .pipe(rename({
            extname: ".wxml"
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('wxss', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(rename({
            extname: '.wxss'
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('copy:images', () => {
    return gulp.src('./src/images/**/*', {
        base: "./src"
    })
        .pipe(gulp.dest("./build"))
});

gulp.task('copy:js', () => {
    return gulp.src("./src/**/*.+(json|js)")
        .pipe(gulp.dest("./build"))
});

gulp.task("default", ['wxss', 'wxml', 'copy:js', 'copy:images','app'], () => {
    let w=gulp.watch("./src/**/*.*",['wxss', 'wxml', 'copy:js', 'copy:images','app'])
    w.on("change",(event)=>{
        console.log(event);
    })
});