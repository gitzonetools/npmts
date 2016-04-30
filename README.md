# npmts
Write npm modules with TypeScript without hassle.

## Status
[![Build Status](https://travis-ci.org/pushrocks/npmts.svg?branch=master)](https://travis-ci.org/pushrocks/npmts)
[![Dependency Status](https://david-dm.org/pushrocks/npmts.svg)](https://david-dm.org/pushrocks/npmts)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/npmts/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/npmts/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/npmts/badges/code.svg)](https://www.bithound.io/github/pushrocks/npmts)
[![codecov.io](https://codecov.io/github/pushrocks/npmts/coverage.svg?branch=master)](https://codecov.io/github/pushrocks/npmts?branch=master)

## What is NPMTS?
NPMTS is your friend when it comes to write, test, publish and document NPM modules written in TypeScript.

### Install
First install npmts as dev dependency:

```sh
npm install npmts --save-dev
```

Then use it in package.json's script section to trigger a build:

```json
"scripts": {
    "test": "npmts"
}
```

### Default behaviour

**Execution order of tasks**

1. Check config in ./npmts.json
1. Clean up from any previous builds (old js files)
1. Install typings
1. Transpile TypeScript with inline sourcemaps
1. Create Declaration Files
1. Create JsDoc Documentation
1. Instrumentalize created JavaScript files with istanbul
1. Run Tests
1. Create Coverage report
1. Upload Coverage reports to codecov.io (Tests must pass, codecov.io must be activated, by default only triggers on travis)
1. Upload JsDoc Documentation to gh-pages branch on GitHub. (Tests must pass, requires GitHub Token)

#### npmts.json
the npmts.json is the main config file. You can use it to customize the behaviour of NPMTS.

```json
{
  "mode":"default",
  "ts":{
    "./customdir/*.ts":"./"
  },
  "tsconfig":true,
  "typings":[
    "./ts/typings.json",
    "./subts1/typings.json",
    "./subts2/typings.json",
    "./customdir/typings.json"
  ],
  "codecov":true,
  "docs": {
    "publish":true
  },
  "cli":true
}
```

| key | description |
| --- | --- |
| mode | "default" will do some defualt stuff, "custom" only does what you specify |
| codecov | if true, coverage data will be uploaded to codecov when running on travis |
| docs | `{"publish":true}` lets you control what happens with your module documentation |
|  |  |
|  |  |

#### Typings
**npmts** looks for `./ts/typings.json` by default and installs any defined typings to `.ts/typings/`.

> Note: You can reference the typings files in any of your TypeScript code with a  
`/// <reference path="/some/path/main.d.ts">`  
or use a tsconfig.json file. 

#### TypeScript
by default npmts looks for `./ts/*.ts` and `./test/test.ts` that will compile to
`./dist/*.js` and `./test/test.js`

Use commonjs module system for wiring up files.

#### Declaration files
**npmts** also creates an `index.d.ts` declaration file by default.
You can reference it in your package.json like this:

```json
"main": "index.js",
"typings": "./index.d.ts",
```

You can then import plugins via the TypeScript `import` Syntax
and tsc will pick up the declaration file automatically.

#### Instrumentalize Code
npmts instrumentalizes (using istanbul) the created JavaScript code to create a coverage report.

#### Tests
When Typings have been installed, TypeScript + Declaration files have been transpiled and the resulting JS has been instrumentalized,
npmts looks for `.test/test.ts` which will be transpiled to test.js and run with mocha. 

Any errors will be shown with reference to their originating source in TypeScript
thanks to autogenerated source maps.


### Custom behaviour
Custom behaviour can be achieved through the npmts.json config file at the root of your package.
The file must be named **npmts.json**

```json
{
  "mode":"custom",
  "ts":{
    "./customdir/custom.ts":"./customcompiled.js"
  },
  "typings":[
    "./customdir"
  ]
}
```

* **mode** can be "default" or "custom"
* **ts** You can list as many TypeScript files as you like. The key represents the source TypeScript file, the value the output file.
* **typings** is an array of all direcories that have a typings.json present. Uses the new typings tool from npm.

> We will add more options over time.

### About the authors:
[![Project Phase](https://mediaserve.lossless.digital/lossless.com/img/createdby_github.svg)](https://lossless.com/)

[![PayPal](https://img.shields.io/badge/Support%20us-PayPal-blue.svg)](https://paypal.me/lossless)