#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const should = require("should");

function generateScript() {
    return new Promise((resolve, reject) => {
        const packages = [
            "@mayahq/node-red-util",
            "@mayahq/node-red-runtime",
            "@mayahq/node-red-registry",
            "@mayahq/node-red-nodes",
            "@mayahq/node-red-editor-client",
            "@mayahq/node-red-editor-api",
            "@mayahq/node-red"
        ];
        const rootPackage = require(path.join(__dirname,"..","package.json"));
        const version = rootPackage.version;

        const tagArg = /-/.test(version) ? "--tag next" : ""

        const lines = [];

        packages.forEach(name => {
            lines.push(`npm publish ${name}-${version}.tgz ${tagArg}\n`);
        })
        resolve(lines.join(""))
    });
}

if (require.main === module) {
    generateScript().then(output => {
        console.log(output);
    });
} else {
    module.exports = generateScript;
}
