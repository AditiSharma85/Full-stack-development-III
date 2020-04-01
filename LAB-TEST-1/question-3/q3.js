const os = require('os');
var info = require('./systemInfo/systeminfo');
//set module properties
info.cpuArchitecture=os.arch();
info.hostName=os.hostname();
info.osName=os.platform();
info.userName=os.userInfo().username;
info.homeDirectory=os.homedir();

//call module methods
info.systemInfo();
info.userInfo();