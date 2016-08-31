# npmts
Write npm modules with TypeScript without hassle. TypeScript ready. Fully ES6.

## Availabililty
[![npm](https://img.shields.io/badge/npm-npmjs.com-blue.svg)](https://www.npmjs.com/package/npmts)
[![git](https://img.shields.io/badge/git-gitlab.com-blue.svg)](https://gitlab.com/pushrocks/npmts)
[![git](https://img.shields.io/badge/git%20mirror-github.com-blue.svg)](https://github.com/pushrocks/npmts)
[![docs](https://img.shields.io/badge/docs-gitlab.io-blue.svg)](https://pushrocks.gitlab.io/npmts/docs)

## Status for master
[![build status](https://gitlab.com/pushrocks/npmts/badges/master/build.svg)](https://gitlab.com/pushrocks/npmts/commits/master)
[![coverage report](https://gitlab.com/pushrocks/npmts/badges/master/coverage.svg)](https://gitlab.com/pushrocks/npmts/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/npmts.svg)](https://david-dm.org/pushrocks/npmts)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/npmts/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/npmts/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/npmts/badges/code.svg)](https://www.bithound.io/github/pushrocks/npmts)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)

## What is NPMTS?
NPMTS is your friend when it comes to write, test, publish and document NPM modules written in TypeScript.
By default NPMTS will **bundle declaration files**. As a result npm module **code completion in editors like Visual Studio Code** works.

There is a docker image available that includes npmts to make CI a breeze:  
[hosttoday/ht-docker-node:npmts on Dockerhub](https://hub.docker.com/r/hosttoday/ht-docker-node/)

### Install
First install npmts globally, then install the npmts-g locally.

> **npmts-g* checks if the global version of npmts suffices the modules requirements.
If not it installs npmts locally in the right version during npm install. 

```sh
npm install npmts -g # installs npmts globally
npm install npmts-g --save-dev # installs npmts-g checking tool as devDependency
```

Then add it to your package.json's script section to trigger a build:

```json
"scripts": {
    "test": "(npmts)"
}
```

### Default task execution order

1. **Config:** Check config in ./npmextra.json (Check out [npmextra](https://www.npmjs.com/package/npmextra))
1. **Clean:** Clean up from any previous builds (old js files)
1. **Check:** Check project for typings declaration in package.json, unused dependencies and missing dependencies
1. **Transpile:** Transpile TypeScript with **inline sourcemaps** and **declaration files** to ES target
1. **Documentation:** Create TypeDoc Documentation from TypeScript files
1. **Test:** Babelify ES6 to ES5 on the fly, instrumentalize ES5 JavaScript with istanbul and run tests with Mocha.

### npmextra.json
the npmts section in npmextra.json can be used to configure npmts.

**Default**
>Note: When you are using `"mode":"default"` it'll cause npmts to override any other settings you may have made except for tsOptions (ES target etc.)
with default behaviour.

```json
{
  "npmts":{
    "mode":"default"
  }
}
```

**Custom settings**
```json
{
  "mode":"custom",
  "docs":false,
  "test":true,
  "npmts":{
    "ts":{
      "./customdir/*.ts":"./"
    },
    "tsOptions":{
      "declaration":false,
      "target":"ES6"
    },
    "cli":true
  }
}
```

| key | default value | description |
| --- | --- | --- |
| `"mode"` | `"default"` | "default" will do default stuff and override , "custom" only does what you specify |
| `"docs"` | `true` | create docs for your module |
| `"test"` | `true` | test your module |
| `"ts"` | `{"./ts/*.ts":"./","./test/test.ts":"./test/"}` | allows you to define multiple ts portions |
| `"tsOptions"` | `{"target":"ES5", "declaration":"true"}` | specify options for tsc |
| `"cli"` | "false" | some modules are designed to be used from cli. If set to true NPMTS will create a cli.js that wires you dist files up for cli use. |

### TypeScript
by default npmts looks for `./ts/*.ts` and `./test/test.ts` that will compile to
`./dist/*.js` and `./test/test.js`

Use commonjs module system for wiring up files.

### Declaration files
**npmts** also creates declaration files like `./dist/index.d.ts` by default.
You can reference it in your package.json like this.

```json
"main": "dist/index.js",
"typings": ".dist/index.d.ts",
```

This is in line with the latest TypeScript best practices.
You can then import plugins via the TypeScript `import` Syntax
and tsc will pick up the declaration file automatically.

### TypeDoc
By default TypeDoc will create docs for your module in `./pages/api/` directory.
> Note: Use [npmpage](https://www.npmjs.com/package/npmpage) to build a website for the module.
It also allows you to integrate api docs with a gitbook located in `./docs/` 

## Some notes:
#### Typings for third party modules that do not bundle declaration files
NPMTS no longer supports typings.json. Instead use the new TypeScript 2.x approach to typings using the @types/ npm scope.

#### Instrumentalize Code
npmts instrumentalizes (using istanbul) the created JavaScript code to create a coverage report.

#### Tests
Any errors will be shown with reference to their originating source in TypeScript
thanks to autogenerated source maps.

## Example Usage in modules:
* [gulp-browser](https://www.npmjs.com/package/gulp-browser)

> We will add more options over time.

## Tips and tricks:

* Use [npmts-g](https://www.npmjs.com/package/npmts-g) to use globally installed npmts and install npmts locally if no global npmts is available.
* Use [npmpage](https://www.npmjs.com/package/npmpage) to create a webpage from coverage reports and TypeDoc for the module
* Use [hosttoday/ht-docker-node:npmts](https://hub.docker.com/r/hosttoday/ht-docker-node/) for speedy CI builds
* Use [npmdocker](https://www.npmjs.com/package/npmdocker) for running tests consistently with docker.

## Future Scope:
* automatically manage badges in README
* manage tslint to enforce code best practices
* tear down any differences between local and CI environments by using brand new npmdocker

## About the authors:
[![Project Phase](https://mediaserve.lossless.digital/lossless.com/img/createdby_github.svg)](https://lossless.com/)

[![PayPal](https://img.shields.io/badge/Support%20us-PayPal-blue.svg)](https://paypal.me/lossless)