'use strict';
const fs = require('fs');
const obj = require('./list.json');
const videos = [];
const podcasts = [];
const books = [];
const articles = [];
const newsletters = [];
const mentoring = [];

let content = '# Engineering Manager Resources \n A list of engineering manager resource links.';

 // create lists of resources
 for (const resource of obj) {
   const title = resource.title;
   const url = resource.url;
   const cat = resource.cat;

   const categoryMap = {
     book: books,
     video: videos,
     podcast: podcasts,
     article: articles,
     newsletter: newsletters,
     mentoring: mentoring,
   };

   categoryMap[cat].push({'title': title, 'url': url});
 }

 // create content of the list of links
const ouputLinks = (obj, title) => {
  content += `\n\n## ${title}`;
  const duplicates = [];
  for (const out of obj) {
    // avoid duplicates
    if (duplicates.indexOf(out.url) === -1) {
      duplicates.push(out.url);
      content += (
       `\n * [${out.title}](${out.url})`
     );
    }
  }
}

ouputLinks(mentoring, 'Mentoring');
ouputLinks(books, 'Books');
ouputLinks(videos, 'Videos');
ouputLinks(podcasts, 'Podcasts');
ouputLinks(articles, 'Articles');
ouputLinks(newsletters, 'Newsletters');

// create contributing instructions
content += ('\n\n## Contributing \n' +
'1. Fork it\n' +
'2. Run `npm install`\n' +
'3. Add your resource to `list.json`\n' +
'4. Run `node index` to update `README.md` with your changes\n' +
'5. Create your feature branch (`git checkout -b my-new-feature`)\n' +
'6. Commit your changes (`git commit -am "Add some feature"`)\n' +
'7. Push to the branch (`git push origin my-new-feature`)\n' +
'8. Create new Pull Request\n');


// create README file
 fs.writeFile('./README.md', content, function (err) {
     if (err) throw err;
     console.log('Updated resource list');
 });
