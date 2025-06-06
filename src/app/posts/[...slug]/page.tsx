import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

import '@components/EmbedElements';
import { SharePostButton } from '@components/SharePostButton';
import { getPost, getSortedPostsMeta } from '@libs/posts';

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
    <div className="mx-auto max-w-4xl md:px-0 py-6">
      <nav className="px-4 lg:px-0 py-4 text-sm text-muted-foreground">
        <Link href="/">← Back</Link>
      </nav>
      <div className="h-4" />
      <article
        className={twJoin(
          'mx-auto max-w-4xl break-words',
          'bg-card py-16 lg:px-12 px-6 lg:rounded-md rounded-none' // 背景色をカード色に、パディングと角丸を追加
        )}
      >
        <header>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="h-2" />
          <p className="text-muted-foreground">
            {post.publishedAt.format('YYYY-M-D')}
          </p>
        </header>
        <div className="h-10" />
        {/* https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#element-modifiers */}
        <div
          className={twJoin(
            'post',
            'prose prose-zinc dark:prose-invert max-w-none', // ベースのタイポグラフィスタイル
            'text-foreground', // デフォルトのテキスト色
            // 見出しを目立たせるために、フォントウェイトとサイズを調整
            'prose-headings:text-foreground prose-headings:font-semibold', // 見出しの色と太さ
            'prose-h1:text-3xl prose-h2:text-3xl prose-h2:mt-16 prose-h3:text-2xl prose-h3:mt-12', // H1, H2, H3のサイズと上部マージンを調整
            'prose-a:text-foreground', // リンクの色
            'prose-ul:leading-snug', // リストの行間
            'prose-blockquote:text-muted-foreground', // 引用ブロックの色
            'prose-img:mx-auto' // 画像を中央寄せにするためのクラスを追加
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
      <div className="h-6" />
      <section className="px-4 lg:px-0">
        <SharePostButton title={post.title} slug={post.slug} />
      </section>
    </div>
  );
}
