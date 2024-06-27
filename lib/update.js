module.exports = function update() {
  const fs = require('fs');
  const obj = require('../list.json');
  const videos = [];
  const podcasts = [];
  const books = [];
  const articles = [];
  const newsletters = [];
  const mentoring = [];
  const communities = [];
  const courses = [];

  let content = `# Engineering Manager Resources`;

  content = content + `\n Welcome to the Engineer Manager Resources repository! This curated list is designed for anyone in the engineering field who aspires to grow in leadership and enhance their "soft" skills. Whether you're a manager, an aspiring leader, or an individual contributor looking to improve your interpersonal skills, you'll find valuable resources here. \n \n`;

  content = content + `Follow [Ryan Burgess on Twitter](http://twitter.com/burgessdryan) \n \n`;

  content = content + `## What You’ll Find\n`;
  content = content + `This repository contains a comprehensive collection of articles, books, podcasts, and other resources that cover various aspects of engineering leadership, including:\n`;

  content = content + `\n * Communication: Tips and strategies for effective communication within your team and organization.`
  content = content + `\n * Team Building: Best practices for creating and nurturing a cohesive, high-performing team.`
  content = content + `\n * Mentorship: Guidance on mentoring others and finding mentors to support your own growth.`
  content = content + `\n * Conflict Resolution: Techniques for managing and resolving conflicts in a constructive manner.`
  content = content + `\n * Emotional Intelligence: Insights into understanding and managing your emotions and those of others.`
  content = content + `\n * Productivity: Methods to enhance personal and team productivity.`
  content = content + `\n * Career Development: Resources to help you advance your career and achieve your professional goals.`
  content = content + `\n * Diversity and Inclusion: Strategies for fostering an inclusive work environment that values diversity.`

  content = content + `## Why This Matters`;
  content = content + `Leadership and soft skills are crucial for creating a positive and productive work environment. These skills not only help in managing teams effectively but also in building strong relationships, fostering innovation, and driving success in any organization.\n`;
   // create lists of resources
   for (const resource of obj) {
     const title = resource.title;
     const url = resource.url;
     const cat = resource.cat;
     const reason = resource.reason;

     const categoryMap = {
       book: books,
       video: videos,
       podcast: podcasts,
       article: articles,
       newsletter: newsletters,
       mentoring: mentoring,
       community: communities,
       courses: courses,
     };

     categoryMap[cat].push({'title': title, 'url': url, 'reason': reason});
   }

   // create content of the list of links
  const outputLinks = (obj, title) => {
    content += `\n\n## ${title}`;
    const duplicates = [];
    for (const out of obj) {
      // avoid duplicates
      if (duplicates.indexOf(out.url) === -1) {
        duplicates.push(out.url);

        // provide a reason why the resource is helpful
        let reasonDetails = '';
        // if there isn't a reason provided in list.json keep reasonDetails blank
        if (out.reason !== undefined && out.reason !== '') {
          reasonDetails = ` - ${out.reason}`
        }
        // create the content that will be output to the Readme
        content += (
         `\n * [${out.title}](${out.url})${reasonDetails}`
       );
      }
    }
  }

  outputLinks(courses, 'Courses');
  outputLinks(mentoring, 'Mentoring');
  outputLinks(books, 'Books');
  outputLinks(videos, 'Videos');
  outputLinks(podcasts, 'Podcasts');
  outputLinks(articles, 'Articles');
  outputLinks(newsletters, 'Newsletters');
  outputLinks(communities, 'Communities');
  
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
};
