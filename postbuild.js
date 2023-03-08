const fs = require('fs');
const { join } = require('path');
const cssFile = join (__dirname, './dist/angular-ui/style.css');
// css scope
fs.readFile(cssFile, function(err, data) {
    if(err) throw err;
    data = data.toString();
    data = data.replace(/^\.(.+)/gm, '.angular-ui .$1');
    fs.writeFile(cssFile, data, function(err) {
        err || console.log('Data replaced \n', data);
    });
});