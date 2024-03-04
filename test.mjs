import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


const postsDirectory = path.join(process.cwd(), 'posts'); // process.cwd() returns the absolute path of the current working directory

console.log(postsDirectory);

/**
 * List all files in a directory recursively in a synchronous fashion.
 *
 * @param {String} dir
 * @returns {IterableIterator<String>}
 */
function* walkSync(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
      yield* walkSync(pathToFile);
    } else {
      yield pathToFile;
    }
  }
}

const walk = walkSync(postsDirectory);

console.log(walk.next().value);

// // Get file names under /posts
// const fileNames = fs.readdirSync(postsDirectory); // [ 'pre-rendering.md', 'ssg-ssr.md' ]

// console.log(fileNames);

// // Get the data from each file
// const allPostsData = fileNames.map((filename) => {
//   // Remove ".md" from file name to get id
//   const id = filename.replace(/\.md$/, ''); // id = 'pre-rendering', 'ssg-ssr'

//   // Read markdown file as string
//   const fullPath = path.join(postsDirectory, filename);
//   // /Users/ef/Desktop/nextjs-blog/posts/pre-rendering.md
//   const fileContents = fs.readFileSync(fullPath, 'utf8'); // .md string content

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents);

//   // Combine the data with the id
//   return {
//     id,
//     date: matterResult.data.date,
//     title: matterResult.data.title,
//   };
// });

// // Sort posts by date and return
// allPostsData.sort((a, b) => {
//   if (a.date < b.date) {
//     return 1;
//   } else {
//     return -1;
//   }
// });

// console.log(allPostsData);
