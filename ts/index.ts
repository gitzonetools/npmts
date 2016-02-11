/// <reference path="./typings/main.d.ts" />
/// <reference path="./npmts.plugins.ts" />
/// <reference path="./npmts.cli.ts" />
/// <reference path="./npmts.paths.ts" />
/// <reference path="./npmts.configfile.ts" />
/// <reference path="./npmts.options.ts" />
/// <reference path="./npmts.compile.ts" />
/// <reference path="./npmts.tests.ts" />
/// <reference path="./npmts.promisechain.ts" />
console.log("**** starting NPMTS ****");
var plugins = NpmtsPlugins.init();
plugins.beautylog.figletSync("NPMTS");
var paths = NpmtsPaths.init();
var promisechain = NpmtsPromisechain.init();
