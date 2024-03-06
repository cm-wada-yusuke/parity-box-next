import fs, { Dirent } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostDetail, PostMeta } from '@libs/types';
import dayjs from 'dayjs';
import markdownToHtml from 'zenn-markdown-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsMeta(): Promise<PostMeta[]> {
  const dirents: Dirent[] = await fs.promises.readdir(postsDirectory, {
    encoding: 'utf-8',
    withFileTypes: true,
    recursive: true,
  });

  const files = dirents.filter((dirent) => dirent.isFile());

  // Get the data from each file
  const allPostsData = files
    .filter((f) => f.name.endsWith('.md'))
    .map((file) => {
      // Remove ".md" from file name to get id
      const fullPath = path.join(file.path, file.name);
      const relativePath = path.relative(postsDirectory, fullPath);
      const slug = relativePath.replace(/\.md$/, ''); // id = 'pre-rendering', 'ssg-ssr'

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
        published: matterResult.data.published,
      };
    });

  // Sort posts by date and return
  return allPostsData
    .filter((p) => p.published || process.env.NODE_ENV === 'development')
    .sort((a, b) => {
      if (a.publishedAt < b.publishedAt) {
        return 1;
      } else {
        return -1;
      }
    });
}

export async function getPost(slugs: string[]): Promise<PostDetail> {
  const fullPath = path.join(postsDirectory, `${slugs.join('/')}.md`);
  const relativePath = path.relative(postsDirectory, fullPath);
  const slug = relativePath.replace(/\.md$/, '');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // Use remark to convert markdown into HTML string
  const html = await markdownToHtml(matterResult.content);

  return {
    html,
    relativePath,
    slug,
    publishedAt: dayjs(matterResult.data.published_at),
    title: matterResult.data.title,
    published: matterResult.data.published,
  };
}
