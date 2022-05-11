const fs = require("fs");
const toHash = "QmaA4fWLT1k9yndjGQvnxYxAF394vSqLqwhaC8w1MkbvUv";

var jsonDir = "./build/json";
var destDir = "./build/replaced/";


async function start() {
  if (fs.existsSync(destDir)) {
    fs.rmdirSync(destDir, { recursive: true });
  }

  fs.mkdirSync(destDir);

  var files = fs.readdirSync(jsonDir);
  for (var inx in files) {
    var file = files[inx];
    var json = require(jsonDir + "/" + file);
    if (json.image) {
      json.compiler = undefined;
      json.date = undefined;
      json.dna = undefined;
      json.image = json.image.replace("NewUriToReplace", toHash);

      fs.writeFileSync(
        destDir + file,
        JSON.stringify(json, null, 2)
      );
    }
  }
}

start();