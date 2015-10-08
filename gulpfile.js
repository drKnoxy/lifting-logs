// Plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('del');
var RevAll = require('gulp-rev-all');

var refresh = require('gulp-livereload');
var modRewrite = require('connect-modrewrite');

// config
var paths = {
    js: {
        libs: [
            'src/libs/**/*.js',
        ],
        local: [
            'src/app.js',
            'src/**/*.js'
        ]
    }
}

// Tasks
gulp.task('clean', function(){
    clean('build/**/*');
});

gulp.task('scripts', ['scripts-lib', 'scripts-local']);
gulp.task('scripts-lib', function(){
    return gulp.src( paths.js.libs )
    .pipe( concat('lib.js') )
    .pipe( gulp.dest('build/js/') )
    .pipe( refresh() );
});
gulp.task('scripts-local', function(){
    return gulp.src( paths.js.local )
    .pipe( concat('app.js') )
    .pipe( gulp.dest('build/js/') )
    .pipe( refresh() );
});

gulp.task('html', function(){
    return gulp.src(['src/**/*.html'])
    .pipe( gulp.dest('build/') )
    .pipe( refresh() );
});


gulp.task('styles', function(){
    return gulp.src('src/styles.scss')
    .pipe( sass() )
    .pipe( gulp.dest('build/css/') )
    .pipe( refresh() );
});


var host = {
    port: '3000',
    // lrPort: '35729'
};
gulp.task('livereload', function(){
    // init express server
    var path = require('path');
    var express = require('express');
    var app = express();
    var static_folder = path.join(__dirname, 'build');

    app.use(modRewrite([
      '!\\. /index.html [L]'
    ]))
    .use(express.static(static_folder));

    app.listen( host.port, function() {
        console.log('server started: http://localhost:'+host.port);
        return gulp;
    });
});

gulp.task('watch', function(){
    refresh.listen({basePath:'build'});
    gulp.start('livereload');

    gulp.watch( 'src/**/*.html', ['html'] );
    gulp.watch( 'src/**/*.scss', ['styles'] );
    gulp.watch( 'src/**/*.js',   ['scripts'] );
})

gulp.task('build', ['clean'], function(){
    gulp.start('scripts');
    gulp.start('styles');
    gulp.start('html');
})
gulp.task('default', ['build'], function(){
    gulp.start('watch');
});
