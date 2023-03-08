const fs = require('fs');
const { join } = require('path');
const { execSync } = require("child_process");

const root = join(__dirname, './package.json');
const lib = join(__dirname, './projects/angular-ui/package.json');
// css scope

// get version
const rowData = fs.readFileSync(root);
const version = JSON.parse(rowData).version;

const syncVersion = (file, version) => {
  console.log(`version`, version)
  const data = JSON.parse(fs.readFileSync(file));
  data.version = version;
  fs.writeFileSync(file, JSON.stringify(data, null, 4));
}

syncVersion(lib, version);

// // commit and push
const envolkSync = (command) => {
  execSync(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`${command}: ${stdout}`);
  });
}

envolkSync("git add .");
envolkSync(`git commit -m "npm release"`);
envolkSync(`git tag v${version} -a -m "auto tagging v${version} by npm"`);
