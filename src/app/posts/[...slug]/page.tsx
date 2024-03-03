import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

import { SharePostButton } from '@components/SharePostButton';
import { getPost, getSortedPostsMeta } from '@libs/posts';

type PostProps = {
  params: {
    slug: string[];
  };
};

// async function getPostFromParams(params: PostProps['params']) {
//   const slug = params?.slug?.join('/');
//   const post = allPosts.find((post) => post.slugAsParams === slug);

//   if (!post) {
//     null;
//   }

//   return post;
// }

// export async function generateMetadata({
//   params,
// }: PostProps): Promise<Metadata> {
//   const post = await getPostFromParams(params);

//   if (!post) {
//     return {};
//   }

//   return {
//     title: post.title,
//     description: post.description,
//   };
// }

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  const posts = await getSortedPostsMeta();
  if (!posts) {
    notFound();
  }

  return posts.map((post) => ({ slug: post.slug.split('/') }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article
      className={twJoin(
        'py-12 px-4 mx-auto max-w-4xl break-words'
        // '[&_a]:text-link-foreground [&_a]:decoration-link-decoration hover:[&_a]:text-link-hover-foreground hover:[&_a]:decoration-link-hover-decoration',
        // '[&_p>img+*]:-mt-4 [&_p>img+*]:block [&_p>img+*]:text-sm [&_p>img+*]:opacity-90',
        // '[&_code]:border-misty-slate-200 [&_code]:bg-misty-slate-100 [&_code]:text-misty-slate-900',
        // 'dark:[&_code]:border-misty-slate-800 dark:[&_code]:bg-misty-slate-900 dark:[&_code]:text-misty-slate-400',
        // '[&_hr]:border-border',
        // '[&_ul>li]:marker:text-muted-foreground'
      )}
    >
      <header>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="h-2" />
        <p className="text-muted-foreground">
          {post.publishedAt.format('YYYY-M-D')}
        </p>
      </header>
      <div className="h-12" />
      {/* https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#element-modifiers */}
      <div
        className={twJoin(
          'prose prose-zinc dark:prose-invert max-w-none',
          'text-foreground',
          'prose-headings:text-foreground',
          'prose-a:text-foreground',
          'prose-ul:leading-snug',
          'prose-blockquote:text-muted-foreground'
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <div className="mt-12">
        <SharePostButton title={post.title} slug={post.relativePath} />
      </div>
    </article>
  );
}
