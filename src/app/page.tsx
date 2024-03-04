import { notFound } from 'next/navigation';

import { getSortedPostsMeta } from '@libs/posts';

import { ArticleCard } from '@components/ArticleCard';
import { Pagination } from '@components/Pagenation';

const PerPage = 10;

export default async function Home() {
  const posts = await getSortedPostsMeta();
  if (!posts) {
    notFound();
  }

  const paginatedPosts = posts.slice(0, PerPage);
  const hasNext = posts.length > PerPage;
  const totalPages = Math.ceil(posts.length / PerPage);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <ul>
        {paginatedPosts.map((post) => (
          <li key={post.slug}>
            <ArticleCard {...post} href={`/posts/${post.slug}`} />
          </li>
        ))}
      </ul>
      <div className="h-12" />
      <Pagination total={totalPages} current={1} />
    </section>
  );
}
