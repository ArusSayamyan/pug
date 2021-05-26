let project_folder = "dist",
    source_folder  = "src",
    fs = require('fs');

let path = {
    build:{
        pug:   project_folder + "/",
        css:   project_folder + "/css/",
        js:    project_folder + "/js/",
        img:   project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src:{
        pug:   source_folder + "/pugFile/index.pug",
        css:   source_folder + "/scss/style.scss",
        js:    source_folder + "/js/main.js",
        img:   source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch:{
        pug:   source_folder + "/**/*.pug",
        css:   source_folder + "/scss/style.scss",
        js:    source_folder + "/js/**/*.js",
        img:   source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
    }, 
    clean: "./" + project_folder + "/"

}
    let { src, dest } = require('gulp'),
    gulp          = require('gulp'),
    browsersync   = require('browser-sync').create(),
    // htmlmin       = require('gulp-htmlmin'),
    // fileinclude   = require('gulp-file-include'),
    del           = require('del'),
    scss          = require('gulp-sass'),
    // autoprefixer  = require('gulp-autoprefixer'),
    // group_media   = require('gulp-group-css-media-queries'),
    // clean_css     = require('gulp-clean-css'),
    // rename        = require('gulp-rename'),
    // uglify        = require('gulp-uglify-es').default,
    imagemin      = require('gulp-imagemin'),
    // webp          = require('gulp-webp'),
    // webphtml      = require('gulp-webp-html'),
    // webpcss       = require('gulp-webpcss'),
    // svgSprite     = require('gulp-svg-sprite'),
    // ttf2woff      = require('gulp-ttf2woff'),
    // ttf2woff2     = require('gulp-ttf2woff2'),
    // fonter        = require('gulp-fonter');
 // favicons      = require('gulp-favicons'),
 // plumber       = require('gulp-plumber'),
    pug           = require('gulp-pug'),
    flatten = require("gulp-flatten");
 // sourcemaps    = require('gulp-sourcemaps');



function views() {
return src(path.src.pug)
.pipe (pug({
    pretty: true
}))
.pipe(gulp.dest(path.build.pug))
}


function sass() {
    return src(path.src.css)
      .pipe(scss().on('error', scss.logError))
      .pipe(gulp.dest(path.build.css));
  };

function imgmin() {
    return src(path.src.img)
    .pipe(imagemin())
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest(path.build.img));
}

function fonts(){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

 function server() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
    })
};

function watchFile(params) {
    gulp.watch([path.watch.pug], views)
    gulp.watch([path.watch.css], sass)
}

function clean(params){
    return del(path.clean);
}

let watch =gulp.series(clean,views,imgmin,sass,gulp.parallel(watchFile,server));




exports.views = views;
exports.sass = sass;
exports.imgmin = imgmin;
// exports.fonts = fonts;
exports.server = server;
exports.watch  = watch;
exports.default = watch;