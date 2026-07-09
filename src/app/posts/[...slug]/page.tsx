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
    <div className="mx-auto max-w-4xl py-6 md:px-0">
      <nav className="p-4 lg:px-0">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-link hover:text-link-active"
        >
          ← Back
        </Link>
      </nav>
      <div className="h-4" />
      <article className="mx-auto max-w-4xl break-words px-6 py-10 lg:px-0">
        <header>
          {/* mono キッカー（DESIGN.md: article-header） */}
          <p className="font-mono text-xs tracking-widest text-link">
            ~/posts/{post.slug}.md
          </p>
          <div className="h-3" />
          <h1 className="font-display text-3xl font-bold leading-snug tracking-tight text-ink lg:text-4xl">
            {post.title}
          </h1>
          <div className="h-3" />
          <p className="font-mono text-sm text-muted">
            {post.publishedAt.format('YYYY-M-D')}
          </p>
          <div className="h-6" />
          <div className="border-b border-hairline" />
        </header>
        <div className="h-10" />
        {/* https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#element-modifiers */}
        <div
          className={twJoin(
            'post',
            'prose prose-neutral max-w-none', // ベースのタイポグラフィスタイル
            'text-body', // デフォルトのテキスト色
            // 見出しはゴシックの太字（DESIGN.md: wired-light）。区切りは罫線で
            'prose-headings:text-ink prose-headings:font-display prose-headings:font-semibold',
            'prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-16 prose-h2:border-b prose-h2:border-hairline prose-h2:pb-2 prose-h3:text-xl prose-h3:mt-12', // H2は罫線下線、H3はプレーン
            'prose-a:text-link hover:prose-a:text-link-active', // リンクの色
            'prose-code:before:content-none prose-code:after:content-none', // インラインコードの装飾バッククォートを除去（面差の表現は globals.css 側）
            'prose-ul:leading-snug', // リストの行間
            'prose-blockquote:text-muted prose-blockquote:border-hairline-strong', // 引用ブロック
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
