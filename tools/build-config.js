// var appname = process.env.appname;
// if (!appname) throw new Error("项目名不存在")
// var fs = require("fs");
// var path = require("path");
// var srcpath = path.join(__dirname, "../src/assets/config/cf.services.config.json");
// var dstpath = path.join(__dirname, "../dist/assets/config/");
// var data = fs.readFileSync(srcpath);
// data = String(data)
//   .replace(/http\:\/\/[\w\.]+\/\{([^\}]+?)\:\d+\}@/ig, `/${appname}ser`)
//   .replace(/http\:\/\/[\w\.]+\/\{([^\}]+)\}@(?:\/?\w+ser)/ig, `/${appname}ser`)
//   .replace(/http\:\/\/[\w\.]+\/\{([^\}]+)\}@\/?/ig, `/`)
//   .replace(/\/\{\/\/192\.168\.\d+\.\d+\/\}@\/?/ig, "/")
//   .replace(/http\:\/\/192\.168\.\d+\.\d+/ig, "");
// fs.writeFileSync(path.join(dstpath, "cf.services.config.json"), data);
// fs.writeFileSync(path.join(dstpath, /pw/.test(appname) ? "pw.services.config.json" : "cs.services.config.json"), data.replace(/\/CSAPI\//ig, '/PWSCMAPI/'));
