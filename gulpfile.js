var gulp = require("gulp"),
    del = require("del"),
    tsc = require("gulp-typescript"),
    tsProject = tsc.createProject("tsconfig.json"),
    pl = require("gulp-load-plugins")({
        rename: {
            "gulp-if": 'gupif'
        }
    });

var dbg = false;
var wlax = {
    src: {
        libs: [
            'rxjs/**/*.js',
            'zone.js/dist/**/*.js',
            '@angular/**/*.js',
            '!./**/esm/',
            '!./**/esm/**/*',
            '!./**/testing/',
            '!./**/testing/**/*',
            '!./**/test*.js',
            '!rxjs/**/*.min.js',
            '!@angular/**/*.min.js'
        ],
        ts: 'src/**/*.ts',
        js: 'src/**/*.js',
        style: ['src/css/*', '!src/css/bootstrap.css'],
        img: 'src/images/**/*.*'
    },
    pub: {
        html: 'public/',
        lib: 'public/node_modules',
        js: 'public/',
        css: 'public/styles/',
        img: 'public/images/',
        fonts: 'public/fonts/',
        admin: 'public/adminlte'
    },
    tempad: [
        'public/adminlte/**/*.css',
        'public/adminlte/**/*.html'
    ],
    watch: { //
        ts: "src/**/*.ts",
        res: [
            "src/**/*.html",
            "src/**/*.css",
            "src/**/*.js"
        ]
    },
};

// Copy all required libraries into public directory.
gulp.task("libs", function() {
    return gulp.src(wlax.src.libs, { cwd: 'node_modules/**' }) /* Glob required here. */
        .pipe(pl.plumber())
        .pipe(pl.gupif(dbg, pl.filesize()))
        .pipe(pl.rigger())
        .pipe(pl.uglify())
        .pipe(pl.gupif(dbg, pl.filesize()))
        .pipe(gulp.dest(wlax.pub.lib))
        .pipe(pl.notify({ message: 'Libs collecting is done', "onLast": true }));
});

gulp.task('default', ['libs']);
// Watch for changes in TypeScript, HTML and CSS files.
/*gulp.task("watch", function() {
    gulp.watch([wlax.watch.ts], ["compile"]).on("change", function(e) {
        console.log("TypeScript file " + e.path + " has been changed. Compiling.");
    });
    gulp.watch([wlax.watch.res], ["res"]).on("change", function(e) {
        console.log("Resource file " + e.path + " has been changed. Updating.");
    });
});
//admin panel watch
gulp.task("watch", function () {
    gulp.watch([wlax.tempad]).on("change", function (e) {
        console.log("Resource file " + e.path + " has been changed. Updating.");
    });
}); */