// matter is a library that let's you parse the metadata in each markdown file.
// the lib folder does not have an assigned name like the pages folder, so you can name it anything. It's usually convention to use lib or utils

import fs, { Dirent } from 'fs';
import path from 'path';

// Import 'gray-matter', library for parsing the metadata in each markdown file
import matter from 'gray-matter';
import { PostMeta } from '@libs/types';
import dayjs from 'dayjs';

// --------------------------------
// GET THE PATH OF THE POSTS FOLDER
const postsDirectory = path.join(process.cwd(), 'posts'); // process.cwd() returns the absolute path of the current working directory

// -------------------------------------------------
// GET THE DATA OF ALL POSTS IN SORTED ORDER BY DATE
/*
  Returns an array that looks like this:
  [
    {
      id: 'ssg-ssr',
      title: 'When to Use Static Generation v.s. Server-side Rendering',
      date: '2020-01-01'
    },
    {
      id: 'pre-rendering',
      title: 'Two Forms of Pre-rendering',
      date: '2020-01-02'
    }
  ]
*/

export async function getSortedPostsMeta(): Promise<PostMeta[]> {
  // Get file names under /posts
  const dirents: Dirent[] = await fs.promises.readdir(postsDirectory, {
    encoding: 'utf-8',
    withFileTypes: true,
    recursive: true,
  }); // [ 'pre-rendering.md', 'ssg-ssr.md' ]


  const files = dirents.filter((dirent) => dirent.isFile());

  // Get the data from each file
  const allPostsData = files.map((file) => {
    // Remove ".md" from file name to get id
    const fullPath = path.join(file.path, file.name);
    const relativePath = path.relative(postsDirectory, fullPath);
    const slug = file.name.replace(/\.md$/, ''); // id = 'pre-rendering', 'ssg-ssr'

    // Read markdown file as string
    const fileContents = fs.readFileSync(fullPath, 'utf8'); // .md string content

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      relativePath,
      publishedAt: dayjs(matterResult.data.published_at),
      title: matterResult.data.title,
    };
  });

  // Sort posts by date and return
  return allPostsData.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    } else {
      return -1;
    }
  });
}

// ------------------------------------------------
// GET THE IDs OF ALL POSTS FOR THE DYNAMIC ROUTING
/*
  Returns an array that looks like this:
  [
    {
      params: {
        id: 'ssg-ssr'
      }
    },
    {
      params: {
        id: 'pre-rendering'
      }
    }
  ]
  */

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// The returned array must have the params key otherwise `getStaticPaths` will fail

// --------------------------------
// GET THE DATA OF A SINGLE POST FROM THE ID
// export async function getPostData(id: string) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents);

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content);
//   const contentHtml = processedContent.toString();

//   // Combine the data with the id
//   return {
//     id,
//     contentHtml,
//     ...(matterResult.data as { date: string; title: string }),
//   };
// }

// console.log(getSortedPostsGrayMatter());
