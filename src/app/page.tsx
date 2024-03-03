import { notFound } from 'next/navigation';

import { getSortedPostsMeta } from '@libs/posts';

// prism-themesを追加
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'

interface PostProps {
  params: {
    slug: string[];
  };
}

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

// export async function generateStaticParams(): Promise<PostProps['params'][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split('/'),
//   }));
// }

export default async function Home({
  params,
  searchParams,
}: {
  params: PostProps;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage =
    typeof searchParams.page !== 'string'
      ? 1
      : parseInt(searchParams.page) || 1;
  const perPage = 2; // 1ページあたりの記事数

  const posts = await getSortedPostsMeta();
  if (!posts) {
    notFound();
  }

  const paginatedPosts = posts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  // const totalPages = Math.ceil(posts.length / perPage);

  return (
    <div className="py-8 px-4 mx-auto max-w-4xl">
      {posts.map((post) => (
        <dl key={post.slug} className="flex-col">
          <dt className="text-xl font-bold">
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </dt>
          <dt className="text-sm text-muted-foreground">
            {post.publishedAt.format('YYYY-M-D')}
          </dt>
          <div className="h-12"></div>
        </dl>
      ))}
      {/* <Pagination totalPages={totalPages} currentPage={currentPage} /> */}
    </div>
  );
  //   <article className="prose dark:prose-invert">
  //     {post.image && (
  //       <div className="relative mb-12 h-[345px] w-full">
  //         <Image
  //           className="m-0 w-full rounded-lg object-cover"
  //           src={post.image}
  //           alt={post.title}
  //           fill
  //           priority
  //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //         />
  //       </div>
  //     )}

  //     <header>
  //       <h1 className="mb-2">{post.title}</h1>
  //       {post.description && (
  //         <p className="mb-6 mt-0 text-xl text-gray-700 dark:text-gray-200">
  //           {post.description}
  //         </p>
  //       )}
  //       <p className="space-x-1 text-xs text-gray-500">
  //         <span>{format(parseISO(post.date), 'MMMM dd, yyyy')}</span>
  //         <span>{` • `}</span>
  //         <span>{post.readingTime.text}</span>
  //         <span>{` • `}</span>
  //         <span>
  //           <Link
  //             href={`/categories/${encodeURIComponent(
  //               post.category.toLowerCase()
  //             )}`}
  //           >
  //             {post.category}
  //           </Link>
  //         </span>
  //       </p>
  //     </header>
  //     <hr className="my-6" />
  //     {/* <Mdx code={post.body.code} /> */}
  //     <div className="mt-12">
  //       <SharePostButton title={post.title} slug={post.slug} />
  //     </div>
  //   </article>
  // );
}
