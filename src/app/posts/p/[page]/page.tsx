import { notFound, redirect } from 'next/navigation';

import { getSortedPostsMeta } from '@libs/posts';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Pagination } from '@components/Pagenation';
import { ArticleCard } from '@components/ArticleCard';

const PerPage = 10;

interface Props {
  params: {
    page: string;
  };
}

export async function generateStaticParams(): Promise<Props['params'][]> {
  const posts = await getSortedPostsMeta();
  if (!posts) {
    notFound();
  }

  const totalPages = Math.ceil(posts.length / PerPage);
  console.log({ totalPages });

  new Array(totalPages).forEach((_, i) =>
    console.log({ page: (i + 1).toString() })
  );
  return [...Array(totalPages)].map((_, i) => ({ page: (i + 1).toString() }));
}

export default async function PaginationPage({ params }: Props) {
  if (params.page === '1') {
    redirect('/');
  }

  if (!params.page) {
    return notFound();
  }

  const posts = await getSortedPostsMeta();
  if (!posts) {
    notFound();
  }

  const currentPage = Number(params.page || '2');

  const paginatedPosts = posts.slice(
    (currentPage - 1) * PerPage,
    currentPage * PerPage
  );
  const totalPages = Math.ceil(posts.length / PerPage);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <ul>
        {paginatedPosts.map((post) => (
          <li key={post.slug}>
            <ArticleCard {...post} href={`/posts/${post.slug}`} />
          </li>
        ))}
        <div className="h-12" />
        <Pagination total={totalPages} current={currentPage} />
      </ul>
    </section>
  );
}
