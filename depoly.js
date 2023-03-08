
const FtpDeploy = require('ftp-deploy');
const path = require('path');

const ftpDeploy = new FtpDeploy();

const config = {
  user: 'showcase',
  // Password optional, prompted if none given
  password: '70538068',
  host: 'npm.omnistorpoc.com',
  port: 21,
  localRoot: path.join(__dirname, '/dist/showcase'),
  remoteRoot: '/dist/',
  include: ['*', '**/*'],      // this would upload everything except dot files
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
      // 'dist/**/*.map',
      // 'node_modules/**',
      // 'node_modules/**/.*',
      // '.git/**',
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: true,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err));