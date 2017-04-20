"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const beautylog = require("beautylog");
exports.beautylog = beautylog;
let depcheck = require('depcheck');
exports.depcheck = depcheck;
const lodash = require("lodash");
exports.lodash = lodash;
const npmextra = require("npmextra");
exports.npmextra = npmextra;
const projectinfo = require("projectinfo");
exports.projectinfo = projectinfo;
const path = require("path");
exports.path = path;
const smartanalytics = require("smartanalytics");
exports.smartanalytics = smartanalytics;
const smartcli = require("smartcli");
exports.smartcli = smartcli;
const smartfile = require("smartfile");
exports.smartfile = smartfile;
const smartpath = require("smartpath");
exports.smartpath = smartpath;
const smartstream = require("smartstream");
exports.smartstream = smartstream;
const smartstring = require("smartstring");
exports.smartstring = smartstring;
const smartsystem = require("smartsystem");
exports.smartsystem = smartsystem;
const through2 = require("through2");
exports.through2 = through2;
exports.sourceMapSupport = require('source-map-support').install(); // display errors correctly during testing
