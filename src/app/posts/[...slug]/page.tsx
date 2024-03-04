import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

import { SharePostButton } from '@components/SharePostButton';
import { getPost, getSortedPostsMeta } from '@libs/posts';
import '@components/EmbedElements';

type PostProps = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  const posts = await getSortedPostsMeta();
  if (!posts) {
    notFound();
  }

  return posts.map((post) => ({ slug: post.slug.split('/') }));
}

export async function generateMetadata(
  { params }: PostProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `${post.title} - wadyu log`,
    openGraph: {
      title: `${post.title} - wadyu log`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`,
      // images: '/assets/osgsm-banner.png',
      type: 'website',
    },
    twitter: {
      title: `${post.title} - wadyu log`,
      card: 'summary',
    },
  };
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-6 px-4 mx-auto max-w-4xl">
      <nav className="py-4 text-sm text-muted-foreground">
        <Link
          href="/"
          className="-mx-1 rounded-md p-1 hover:text-misty-slate-600"
        >
          ← Back
        </Link>
      </nav>
      <div className="h-4" />
      <article
        className={twJoin(
          'mx-auto max-w-4xl break-words'
          // '[&_a]:text-link-foreground [&_a]:decoration-link-decoration hover:[&_a]:text-link-hover-foreground hover:[&_a]:decoration-link-hover-decoration',
          // '[&_p>img+*]:-mt-4 [&_p>img+*]:block [&_p>img+*]:text-sm [&_p>img+*]:opacity-90',
          // '[&_code]:border-misty-slate-200 [&_code]:bg-misty-slate-100 [&_code]:text-misty-slate-900',
          // 'dark:[&_code]:border-misty-slate-800 dark:[&_code]:bg-misty-slate-900 dark:[&_code]:text-misty-slate-400',
          // '[&_hr]:border-border',
          // '[&_ul>li]:marker:text-muted-foreground'
        )}
      >
        <header>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="h-2" />
          <p className="text-muted-foreground">
            {post.publishedAt.format('YYYY-M-D')}
          </p>
        </header>
        <div className="h-6" />
        {/* https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#element-modifiers */}
        <div
          className={twJoin(
            'post',
            'prose prose-zinc dark:prose-invert max-w-none',
            'text-foreground',
            'prose-headings:text-foreground prose-h2:text-3xl',
            'prose-a:text-foreground',
            'prose-ul:leading-snug',
            'prose-blockquote:text-muted-foreground',

            // 同じ指定を繰り返すしかなさそう
            '[$>aside.msg]:flex align-center'
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
      <div className="h-6" />
      <section>
        <SharePostButton title={post.title} slug={post.relativePath} />
      </section>
    </div>
  );
}
