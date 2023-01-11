var gm = require("gm");

var { workerData, parentPort }  = require('worker_threads');
gm(workerData.source)
.resize(100, 100)
.write(workerData.destination,function (error) {
  if (error) throw Error(error);
  else
  parentPort.postMessage({resized:true});
});