import { notFound } from 'next/navigation';

import { getSortedPostsMeta } from '@libs/posts';

import { PostCard } from '@components/PostCard';
import { Pagination } from '@components/Pagination';

const PerPage = 10;

export default async function Home() {
  const posts = await getSortedPostsMeta();
  if (!posts) {
    notFound();
  }

  const paginatedPosts = posts.slice(0, PerPage);
  const totalPages = Math.ceil(posts.length / PerPage);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <ul>
        {paginatedPosts.map((post) => (
          <li key={post.slug} className="border-t border-muted first:border-0">
            <PostCard {...post} href={`/posts/${post.slug}`} />
          </li>
        ))}
        <div className="h-12" />
        <Pagination total={totalPages} current={1} />
      </ul>
    </section>
  );
}
