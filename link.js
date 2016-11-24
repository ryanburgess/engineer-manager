const fs = require('fs');
const prompt = require('prompt');
const list = fs.readFileSync('./list.json');
const fullList = JSON.parse(list);

// start prompt
prompt.start();

// prompt questions
prompt.get(['title', 'url', 'category'], function (err, result) {
   const obj = {'title': result.title, 'url': result.url, 'cat': result.category}
   fullList.push(obj);
   const newJSON = JSON.stringify(fullList);
   fs.writeFileSync('./list.json', JSON.stringify(fullList, null, 4));
   console.log('New link added!');
});
