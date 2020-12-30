var fs = require('fs');
var archiver = require('archiver');
var { version, name } = JSON.parse(fs.readFileSync("package.json").toString());
var time = new Date();
var toLength = a => a < 10 ? "0" + a : a;
var output = fs.createWriteStream(`dist-${name}-v${version}-${time.getFullYear()}${toLength(time.getMonth() + 1)}${toLength(time.getDate())}.zip`);
var archive = archiver('zip');

archive.on('error', function (err) {
    throw err;
});
archive.file('release notes.md', false);
archive.directory('dist/', false);

archive.pipe(output);
archive.finalize();
