import { Metadata, ResolvingMetadata } from 'next';
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

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `${post.title} - wadyu log`,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    ),
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

  console.log({ env: process.env.NODE_ENV });
  if (process.env.NODE_ENV === 'production' && !post.published) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <nav className="py-4 text-sm text-muted-foreground">
        <Link href="/">← Back</Link>
      </nav>
      <div className="h-4" />
      <article className={twJoin('mx-auto max-w-4xl break-words')}>
        <header>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="h-2" />
          <p className="text-muted-foreground">
            {post.publishedAt.format('YYYY-M-D')}
          </p>
        </header>
        <div className="h-10"/>
        {/* https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#element-modifiers */}
        <div
          className={twJoin(
            'post',
            'prose prose-zinc dark:prose-invert max-w-none',
            'text-foreground',
            'prose-headings:text-foreground prose-h1:text-2xl prose-h2:text-2xl',
            'prose-a:text-foreground',
            'prose-ul:leading-snug',
            'prose-blockquote:text-muted-foreground'
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
      <div className="h-6" />
      <section>
        <SharePostButton title={post.title} slug={post.slug} />
      </section>
    </div>
  );
}
