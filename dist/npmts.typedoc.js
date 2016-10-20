"use strict";
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const npmts_promisechain_1 = require("./npmts.promisechain");
const q = require("q");
const npmts_check_1 = require("./npmts.check");
let genTypeDoc = function (configArg) {
    let done = q.defer();
    npmts_promisechain_1.npmtsOra.text('now generating ' + 'TypeDoc documentation'.yellow);
    plugins.beautylog.log('TypeDoc Output:');
    let localSmartstream = new plugins.smartstream.Smartstream([
        plugins.gulp.src(plugins.path.join(paths.tsDir, '**/*.ts')),
        plugins.gulpTypedoc({
            // TypeScript options (see typescript docs) 
            module: 'commonjs',
            target: 'es6',
            includeDeclarations: true,
            // Output options (see typedoc docs) 
            out: paths.pagesApiDir,
            json: plugins.path.join(paths.pagesApiDir, 'file.json'),
            // TypeDoc options (see typedoc docs) 
            name: npmts_check_1.projectInfo.name,
            readme: plugins.path.join(paths.cwd, 'README.md'),
            // theme: "default",
            version: true
        })
    ]);
    localSmartstream.run().then(() => {
        done.resolve(configArg);
    }, (err) => {
        console.log(err);
        done.resolve(configArg);
    });
    return done.promise;
};
exports.run = function (configArg) {
    let done = q.defer();
    if (configArg.docs) {
        genTypeDoc(configArg)
            .then(() => {
            done.resolve(configArg);
        });
    }
    else {
        done.resolve(configArg);
    }
    ;
    return done.promise;
};
