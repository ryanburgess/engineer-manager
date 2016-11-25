'use strict';
const fs = require('fs');
const obj = require('./list.json');
const videos = [];
const podcasts = [];
const books = [];
const articles = [];


let content = '# Engineering Manager Resources \n A list of engineering manager resource links.';

 // create lists of resources
 for (const resource of obj) {
   const title = resource.title;
   const url = resource.url;
   const cat = resource.cat;

   if(cat === 'book') {
     books.push({'title': title, 'url': url});
   }else if(cat === 'video') {
     videos.push({'title': title, 'url': url});
   }else if(cat === 'podcast') {
     podcasts.push({'title': title, 'url': url});
   }else if(cat === 'article') {
     articles.push({'title': title, 'url': url});
   }
 }

 // display list of books
 content += '\n## Books';
 for (const bookItem of books) {
   content += (
     `\n * [${bookItem.title}](${bookItem.url})`
   );
 }

 // display list of videos
 content += '\n\n## Videos';
 for (const videoItem of videos) {
   content += (
     `\n * [${videoItem.title}](${videoItem.url})`
   );
 }

 // display list of Podcasts
 content += '\n\n## Podcasts';
 for (const podcastItem of podcasts) {
   content += (
     `\n * [${podcastItem.title}](${podcastItem.url})`
   );
 }

 // display list of Articles
 content += '\n\n## Articles';
 for (const articleItem of articles) {
   content += (
     `\n * [${articleItem.title}](${articleItem.url})`
   );
 }

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
