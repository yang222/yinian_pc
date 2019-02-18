var gulp = require('gulp');
var watch = require('gulp-watch');
var connect=require('gulp-connect');
var rev = require('gulp-rev-append')
var sass = require('gulp-sass')


gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(connect.reload());
    gulp.src('./**/*.html')
        .pipe(connect.reload());
});
gulp.task('css', function() {
    gulp.src('./src/css/*.css')
        .pipe(gulp.dest('dist/src/css'))
        .pipe(connect.reload());
});

gulp.task('scss', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/src/js'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
	return gulp.src('./src/sass/*.scss')   //这是需要转化的sass文件
		.pipe(sass())
		.pipe(gulp.dest('./src/css')) //这是转化后css的文件
})



gulp.task('buildRev', function () {
    gulp.src('index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist'))
})


gulp.task('ant_html', function(){
    gulp.src('index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
    gulp.src('./view/**/*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/view'))
        .pipe(connect.reload())
})

gulp.task('ant_connect', function() {
    connect.server({
        livereload: true,
        ip:'192.168.0.104',
        host:'192.168.0.104',
        port: 8888
    })
})

gulp.task('ant_watch',function(){
    gulp.watch('*.html',['html'])
    gulp.watch('./src/js/*.js', ['js'])
    gulp.watch('./src/css/*.css', ['css'])
    gulp.watch('./src/sass/*.scss', ['scss','sass'])
})



gulp.task('default',async function() {
    // 将你的默认的任务代码放在这
    await console.log("gulp开始运行了")
    gulp.start(['buildRev','ant_watch','ant_connect','ant_html','sass'])
  });