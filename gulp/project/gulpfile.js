// 引入gulp
let gulp = require('gulp');
// 引入less模块
let less = require('gulp-less');
// 引入一个concat文件合并模块
let concat = require('gulp-concat');

// 引入图片压缩插件
let imgMin = require('gulp-imagemin')

// 引入一个重命名模块
let rename = require('gulp-rename');

// 引入一个压缩css的模块
let minifyCss = require('gulp-minify-css')

//  引入一个压缩js的模块
let uglify = require('gulp-uglify');

let { series } = require('gulp');

gulp.task('copyIndex', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('copyImg', function() {
    // *.jpg   *.{jpg,png}  
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/img'))
})

gulp.task('copyfiles', function() {
    return gulp.src(['src/xml/*.xml', 'src/json/*.json', '!src/xml/data.xml'])
        .pipe(gulp.dest('dist/data'))
})

gulp.task('build', series('copyIndex', 'copyImg', 'copyfiles'), function() {
    console.log('成功编译');

})

gulp.task('automatic', function() {
    gulp.watch('src/index.html', series('copyIndex'));
    gulp.watch('src/images/**/*', series('copyImg'));
    gulp.watch(['src/xml/*.xml', 'src/json/*.json', '!src/xml/data.xml'], series('copyfiles'));
})

// 编译less文件
gulp.task('lessfile', function() {
    return gulp.src('src/css/*.less')
        .pipe(less())
        .pipe(concat('vendor.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
})

// 合并文件  减少http请求
gulp.task('js', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('dist/js'))
})

// 图片压缩
gulp.task('imgtask', function() {
    return gulp.src('src/images/**/*')
        .pipe(imgMin())
        .pipe(gulp.dest('dist/img'))
})