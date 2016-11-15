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
        ts: 'dev/**/*.ts',
        assets: 'dev/assets/**/*.*',
        bootstrap: 'dev/styles/boo/bootstrap.scss',
        styles: ['dev/styles/**/*.scss', '!dev/styles/boo/**/*.*']
    },
    pub: {
        root: 'public/',
        css: 'public/css/'
    },
    watch: { //
        res: "dev/assets/**/*.html",
        boo: "dev/styles/boo/**/*.scss",
        stl: "dev/styles/**/*.scss"
    },
};
// 
// Remove build directory.
// 
gulp.task("clean", function() {
    return del(path.pub.root).then(function(paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
// 
//  Compile TypeScript sources in public directory.
// 
gulp.task("TS", function() {
    var tsResult = gulp.src(path.src.ts)
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(pl.uglify())
        .pipe(gulp.dest(path.pub.root))
        .pipe(pl.notify({
            message: 'Compiling file complete',
            title: function(file) {
                if (file.isNull()) { return "Folder:"; }
                return "File: <%= file.relative %>";
            },
            "onLast": true
        }));
});
// 
// Styles compile and copy to build directory.
// 
gulp.task("css", function() {
    return gulp.src(path.src.styles)
        .pipe(pl.plumber({
            errorHandler: pl.notify.onError(function(err) {
                return { title: 'Css', message: err.message };
            })
        }))
        .pipe(pl.gupif(!prod, pl.newer(path.pub.css)))
        .pipe(pl.sass().on('error', pl.sass.logError))
        .pipe(pl.gupif(prod, pl.autoprefixer()))
        .pipe(pl.gupif(prod, pl.cssnano()))
        .pipe(gulp.dest(path.pub.css))
        .pipe(pl.notify({ message: 'Styles collecting is done', "onLast": true }));
});
//Compile and build bootstrap.min.css into directory
gulp.task("css:boo", function() {
    return gulp.src(path.src.bootstrap)
        .pipe(pl.plumber({
            errorHandler: pl.notify.onError(function(err) {
                return { title: 'Bootstrap', message: err.message };
            })
        }))
        .pipe(pl.gupif(!prod, pl.newer(path.pub.css)))
        .pipe(pl.sass({ outputStyle: 'compressed' }).on('error', pl.sass.logError))
        .pipe(pl.gupif(prod, pl.filesize()))
        .pipe(pl.uncss({ html: ['dev/assets/**/*.html'] })) //[path.watch.res[0]]
        .pipe(pl.gupif(prod, pl.autoprefixer()))
        .pipe(pl.gupif(prod, pl.cssnano()))
        .pipe(pl.rename({ suffix: '.min' }))
        .pipe(pl.gupif(prod, pl.filesize()))
        .pipe(gulp.dest(path.pub.css))
});
// 
// Copy all required files into public directory.
// 
gulp.task("assets", function() {
    return gulp.src(path.src.assets) /* Glob required here. */
        .pipe(pl.plumber({
            errorHandler: pl.notify.onError(function(err) {
                return { title: 'Assets', message: err.message };
            })
        }))
        .pipe(pl.gupif(!prod, pl.newer(path.pub.root)))
        .pipe(pl.gupif(prod, pl.filesize()))
        .pipe(gulp.dest(path.pub.root))
        .pipe(pl.notify({ message: 'Loading is done', "onLast": true }));
});
// 
// build project
// 
gulp.task('build', ['clean'], function() {
    prod = true;
    gulp.start('TS');
    gulp.start('css');
    gulp.start('css:boo');
    gulp.start('assets');
    console.log("Building start.");
});


// Watch for changes in TypeScript, HTML and CSS files.
gulp.task("watch", function() {
    prod = !true;
    gulp.watch([path.watch.stl], ["css"]).on("change", function(e) {
        console.log("CSS file " + e.path + " has been changed.");
    });
    gulp.watch([path.watch.boo], ["css:boo"]).on("change", function(e) {
        console.log("Bootstrap" + e.path + " has been changed.");
    });
    gulp.watch([path.watch.res], ["assets"]).on("change", function(e) {
        console.log("Resource file " + e.path + " has been changed. Updating.");
    });
});
gulp.task('default', ['watch']);