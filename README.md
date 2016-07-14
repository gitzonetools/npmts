# npmts
Write npm modules with TypeScript without hassle.

## Status
[![build status](https://gitlab.com/pushrocks/npmts/badges/master/build.svg)](https://gitlab.com/pushrocks/npmts/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/npmts.svg)](https://david-dm.org/pushrocks/npmts)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/npmts/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/npmts/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/npmts/badges/code.svg)](https://www.bithound.io/github/pushrocks/npmts)
[![codecov.io](https://codecov.io/github/pushrocks/npmts/coverage.svg?branch=master)](https://codecov.io/github/pushrocks/npmts?branch=master)

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

1. Check config in ./npmts.json
1. Clean up from any previous builds (old js files)
1. Install typings
1. Transpile TypeScript with **inline sourcemaps** and **declaration files** 
1. Create EsDoc Documentation
1. Instrumentalize created JavaScript files with istanbul
1. Run Tests
1. Create Coverage report

#### npmts.json
the npmts.json is the main config file. You can use it to customize the behaviour of NPMTS.

```json
{
  "mode":"default",
  "ts":{
    "./customdir/*.ts":"./"
  },
  "tsOptions":{
    "declaration":false,
    "target":"ES6"
  },
  "cli":true
}
```

| key | default value | description |
| --- | --- | --- |
| `"codecov"` | `true` | if true, coverage data will be uploaded to codecov when running on travis |
| `"docs"` | `{"publish":"false"}` | `{"publish":true, destination:"github"}` lets you control what happens with your module documentation |
| `"mode"` | `"default"` | "default" will do some defualt stuff, "custom" only does what you specify |
| `"tsOptions"` | `{"target":"ES5", "declaration":"true"}` | specify options for tsc |
| `"typings"` | `["./ts/typings.json"]` | allows you to specify multiple locations for typings.json to install. This is needed for modules that do not yet bundle typings |
| `"cli"` | "false" | some modules are designed to be used from cli. If set to true NPMTS will create a cli.js that wires you dist files up for cli use. |

#### TypeScript
by default npmts looks for `./ts/*.ts` and `./test/test.ts` that will compile to
`./dist/*.js` and `./test/test.js`

Use commonjs module system for wiring up files.

#### Declaration files
**npmts** also creates an `./dist/index.d.ts` declaration file by default.
You can reference it in your package.json like this.

```json
"main": "dist/index.js",
"typings": ".dist/index.d.ts",
```

This is in line with the latest TypeScript best practices.
You can then import plugins via the TypeScript `import` Syntax
and tsc will pick up the declaration file automatically.

#### Typings for third party modules that do not bundle declaration files
NPMTS does no longer supports typings.json. Instead use the new TypeScript 2.x approach to typings using the @types/ npm scope.

#### Instrumentalize Code
npmts instrumentalizes (using istanbul) the created JavaScript code to create a coverage report.

#### Tests
When Typings have been installed, TypeScript + Declaration files have been transpiled and the resulting JS has been instrumentalized,
npmts looks for `.test/test.ts` which will be transpiled to test.js and run with mocha. 

Any errors will be shown with reference to their originating source in TypeScript
thanks to autogenerated source maps.

## Example Usage in modules:
* [gulp-browser](https://www.npmjs.com/package/gulp-typings)

> We will add more options over time.

## Tips and tricks:

* Use [npmts-g](https://www.npmjs.com/package/npmts-g) to use globally installed npmts and install npmts locally if no global npmts is available.
* Use [npmpage](https://www.npmjs.com/package/npmtspage) to create a webpage from coverage reports and EsDocs for the module
* Use [hosttoday/ht-docker-node:npmts](https://hub.docker.com/r/hosttoday/ht-docker-node/) for speedy CI builds

## About the authors:
[![Project Phase](https://mediaserve.lossless.digital/lossless.com/img/createdby_github.svg)](https://lossless.com/)

[![PayPal](https://img.shields.io/badge/Support%20us-PayPal-blue.svg)](https://paypal.me/lossless)
