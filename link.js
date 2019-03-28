'use strict';
const fs = require('fs');
const prompt = require('prompt');
const list = fs.readFileSync('./list.json');
const update = require('./lib/update');
const fullList = JSON.parse(list);
const categories = [];

// get list of categories
for (const cats of fullList) {
  const catName = cats.cat;

  if (categories.indexOf(catName) === -1) {
    categories.push(catName);
  }
}

// prompt schema
const schema = {
  properties: {
    title: {
      description: 'Link title',
      pattern: /([^\s]+)/g,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    url: {
      description: 'Link URL',
      pattern: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
      message: 'Must be a valid URL',
      required: true
    },
    reason: {
      description: `Why are you recommending this link?)`,
      pattern: /([^\s]+)/g,
      message: `You must provide a reason why this link is useful`,
      required: true
    },
    category: {
      description: `Category (${categories})`,
      pattern: /^(book|video|podcast|article|newsletter|mentoring)/,
      message: 'Must be of the valid categories',
      required: true
    }
  }
};

// start prompt
prompt.start();

// prompt questions
prompt.get(schema, function (err, result) {
   const obj = {'title': result.title.trim(), 'url': result.url.trim(), 'reason': result.reason.trim(), 'cat': result.category.trim()};
   fullList.push(obj);
   fs.writeFileSync('./list.json', JSON.stringify(fullList, null, 4) + '\n');
   console.log('New link added!');

   // update readme
   update();
});
