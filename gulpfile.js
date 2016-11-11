var gulp = require("gulp"),
    del = require("del"),
    tsc = require("gulp-typescript"),
    tsProject = tsc.createProject("tsconfig.json"),
    pl = require("gulp-load-plugins")({
        rename: {
            "gulp-if": 'gupif'
        }
    });

var prod = false;
var path = {
    src: {
        // libs: ['rxjs/**/*.js','zone.js/dist/**/*.js','@angular/**/*.js','!./**/esm/',
        //     '!./**/esm/**/*','!./**/testing/','!./**/testing/**/*',
        //     '!./**/test*.js','!rxjs/**/*.min.js','!@angular/**/*.min.js'
        // ],
        assets: 'dev/assets/**/*.*',
        bootstrap: 'dev/styles/boo/_bootstrap.scss',
        styles: ['dev/styles/**/*.scss', '!styles/boo/**/*.*']
    },
    pub: {
        html: 'public/',
        css: 'public/css/'
    },
    watch: { //
        res: [
            "dev/assets/**/*.html",
            "dev/styles/**/*.scss"
        ]
    },
};
// 
// Remove build directory.
// 
gulp.task("clean", function() {
    return del(path.pub.html).then(function(paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
// 
// Styles  compile.
// 
gulp.task("css", function() {
    return gulp.src(path.src.style)
        .pipe(pl.plumber())
        .pipe(pl.sass().on('error', sass.logError))
        .pipe(pl.gupif(prod, pl.autoprefixer()))
        .pipe(pl.gupif(prod, cssnano()))
        .pipe(gulp.dest(path.pub.css))
        .pipe(pl.notify({ message: 'Styles collecting is done', "onLast": true }));
});
gulp.task("css:bo", function() {
    return gulp.src(path.src.bootstrap)
        .pipe(pl.plumber())
        .pipe(pl.sass().on('error', sass.logError))
        .pipe(pl.gupif(prod, pl.filesize()))
        .pipe(pl.uncss({ html: path.watch.res[0] })) //[path.watch.res[0] 'src/index.html', 'src/templates/*.html']
        .pipe(pl.gupif(prod, pl.autoprefixer()))
        .pipe(pl.gupif(prod, cssnano()))
        .pipe(pl.rename({ suffix: '.min' }))
        .pipe(pl.gupif(prod, pl.filesize()))
        .pipe(gulp.dest(path.pub.css));
    //.on('error', console.log);
});
// Copy all required libraries into public directory.
gulp.task("assets", function() {
    return gulp.src(path.src.assets) /* Glob required here. */
        .pipe(pl.plumber())
        .pipe(pl.gupif(prod, pl.filesize()))
        .pipe(gulp.dest(path.pub.html))
        .pipe(pl.notify({ message: 'Loading is done', "onLast": true }));
});

// gulp.task('default', ['libs']);
// Watch for changes in TypeScript, HTML and CSS files.
/*gulp.task("watch", function() {
    gulp.watch([path.watch.ts], ["compile"]).on("change", function(e) {
        console.log("TypeScript file " + e.path + " has been changed. Compiling.");
    });
    gulp.watch([path.watch.res], ["res"]).on("change", function(e) {
        console.log("Resource file " + e.path + " has been changed. Updating.");
    });
});
//admin panel watch
gulp.task("watch", function () {
    gulp.watch([path.tempad]).on("change", function (e) {
        console.log("Resource file " + e.path + " has been changed. Updating.");
    });
}); */