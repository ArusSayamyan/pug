let project_folder = "dist",
  source_folder = "src",
  fs = require("fs");

let path = {
  build: {
    pug: project_folder + "/",
    css: project_folder + "/css/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    pug: source_folder + "/pugFile/index.pug",
    css: source_folder + "/scss/style.scss",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    pug: source_folder + "/**/*.pug",
    css: source_folder + "/scss/style.scss",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
};
let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  scss = require("gulp-sass"),
  imagemin = require("gulp-imagemin"),
  pug = require("gulp-pug"),
  flatten = require("gulp-flatten");

function views() {
  return src(path.src.pug)
  .pipe(pug())
  .pipe(gulp.dest(path.build.pug));
}

function sass() {
  return src(path.src.css)
    .pipe(scss().on("error", scss.logError))
    .pipe(gulp.dest(path.build.css));
}

function imgmin() {
  return src(path.src.img)
    .pipe(imagemin())
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest(path.build.img));
}

function server() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
  });
}

function watchFile() {
  gulp.watch([path.watch.pug], views);
  gulp.watch([path.watch.css], sass);
}

let watch = gulp.series(views, imgmin, sass, gulp.parallel(watchFile, server));

exports.views = views;
exports.sass = sass;
exports.imgmin = imgmin;
exports.server = server;
exports.watch = watch;
exports.default = watch;
