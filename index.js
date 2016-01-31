#!/usr/bin/env node

/// <reference path="./index.ts" />
var NpmtsPlugins;
(function (NpmtsPlugins) {
    NpmtsPlugins.init = function () {
        var plugins = {
            beautylog: require("beautylog"),
            fs: require("fs-extra"),
            gulp: require("gulp"),
            g: {
                insert: require("gulp-insert"),
                sequence: require("gulp-sequence"),
                typescript: require("gulp-typescript")
            },
            mergeStream: require("merge2"),
            mocha: require("mocha"),
            path: require("path"),
            q: require("q"),
            smartcli: require("smartcli"),
            typings: require("typings")
        };
        return plugins;
    };
})(NpmtsPlugins || (NpmtsPlugins = {}));
/// <reference path="./index.ts" /> 
/// <reference path="./index.ts" />
var NpmtsPaths;
(function (NpmtsPaths) {
    NpmtsPaths.init = function () {
        var paths = {};
        paths.cwd = plugins.smartcli.get.cwd().path;
        paths.tsDir = plugins.path.join(paths.cwd, "ts/");
        paths.indexTS = plugins.path.join(paths.cwd, "ts/index.ts");
        paths.testTS = plugins.path.join(paths.cwd, "ts/test.ts");
        paths.testDir = plugins.path.join(paths.cwd, "test/");
        return paths;
    };
})(NpmtsPaths || (NpmtsPaths = {}));
/// <reference path="./index.ts" />
var NpmtsOptions;
(function (NpmtsOptions) {
    NpmtsOptions.run = function () {
        var done = plugins.q.defer();
        done.resolve(); //TODO: check for options
        return done.promise;
    };
})(NpmtsOptions || (NpmtsOptions = {}));
/// <reference path="./index.ts" />
var NpmtsTypings;
(function (NpmtsTypings) {
    NpmtsTypings.run = function () {
        var done = plugins.q.defer();
        plugins.beautylog.log("now installing typings");
        plugins.typings.install({ production: false, cwd: paths.tsDir })
            .then(function () {
            done.resolve();
        });
        return done.promise;
    };
})(NpmtsTypings || (NpmtsTypings = {}));
/// <reference path="./index.ts" /> 
/// <reference path="./index.ts" />
var NpmtsDefault;
(function (NpmtsDefault) {
    NpmtsDefault.run = function () {
        var done = plugins.q.defer();
        plugins.gulp.task("defaultIndexTS", function () {
            plugins.beautylog.log("now compiling" + " ts/index.ts".blue);
            var tsResult = plugins.gulp.src(paths.indexTS)
                .pipe(plugins.g.typescript({
                out: "index.js",
                declaration: true
            }));
            return plugins.mergeStream([
                tsResult.dts.pipe(plugins.gulp.dest(paths.cwd)),
                tsResult.js
                    .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
                    .pipe(plugins.gulp.dest(paths.cwd))
            ]);
        });
        plugins.gulp.task("defaultTestTS", function () {
            plugins.beautylog.log("now compiling" + " ts/test.ts".blue);
            plugins.gulp.src(paths.testTS)
                .pipe(plugins.g.typescript({
                out: "test.js"
            }))
                .pipe(plugins.gulp.dest(paths.testDir));
        });
        plugins.gulp.task("defaultCleanup", function (cb) {
            plugins.beautylog.success("TypeScript for this module compiled successfully.");
            done.resolve();
            cb();
        });
        plugins.gulp.task("default", function (cb) {
            plugins.g.sequence("defaultIndexTS", "defaultTestTS", "defaultCleanup", cb);
        });
        plugins.gulp.start.apply(plugins.gulp, ['default']);
        return done.promise;
    };
})(NpmtsDefault || (NpmtsDefault = {}));
/// <reference path="./index.ts" />
var NpmtsTests;
(function (NpmtsTests) {
    NpmtsTests.run = function () {
        var done = plugins.q.defer();
        plugins.fs.ensureDirSync(paths.testDir); //make sure that mocha has a directory to look for tests
        plugins.beautylog.info("Now running mocha tests");
        var mocha = new plugins.mocha(); // Instantiate a Mocha instance.
        mocha.addFile(plugins.path.join(paths.testDir, "test.js"));
        // Run the tests.
        mocha.run(function (failures) {
            process.on('exit', function () {
                process.exit(failures);
            });
        });
        return done.promise;
    };
})(NpmtsTests || (NpmtsTests = {}));
/// <reference path="./index.ts" />
var NpmtsPromisechain;
(function (NpmtsPromisechain) {
    NpmtsPromisechain.init = function () {
        var promisechain;
        NpmtsOptions.run()
            .then(NpmtsTypings.run)
            .then(NpmtsDefault.run)
            .then(NpmtsTests.run);
        return promisechain;
    };
})(NpmtsPromisechain || (NpmtsPromisechain = {}));
/// <reference path="./typings/main.d.ts" />
/// <reference path="./npmts.plugins.ts" />
/// <reference path="./npmts.cli.ts" />
/// <reference path="./npmts.paths.ts" />
/// <reference path="./npmts.options.ts" />
/// <reference path="./npmts.typings.ts" />
/// <reference path="./npmts.custom.ts" />
/// <reference path="./npmts.default.ts" />
/// <reference path="./npmts.tests.ts" />
/// <reference path="./npmts.promisechain.ts" />
console.log("**** starting NPMTS ****");
var plugins = NpmtsPlugins.init();
var paths = NpmtsPaths.init();
var promisechain = NpmtsPromisechain.init();
