const fs = require('fs');

const templateFile = './example-template.json';
const cfn = fs.readFileSync(templateFile);

const cfnReadable = JSON.parse(cfn);
const resources = cfnReadable.Resources;
const keys = Object.keys(resources);

let obj = {};

for (resource in resources) {
  const type = resources[resource]['Type'].split('::')[2];

  if (obj.hasOwnProperty(type)) {
    obj[type].push(resource);
  } else {
    obj[type] = [resource];
  }
}

fs.writeFileSync('./report.txt', '');
const print = data => {
  fs.appendFileSync('./report.txt', `${data}\n`);
  console.log(data);
};

for (item in obj) {
  print(`${item}: ${obj[item].length}`);
  obj[item].forEach(i => {
    print(`\t${i}`);
  });
}
