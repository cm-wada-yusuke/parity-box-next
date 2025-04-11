import { notFound } from 'next/navigation';
import { getPost } from '@libs/posts';
import { PostContent } from '@components/PostContent';

interface Props {
  params: {
    slug: string[];
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">{post.title}</h1>
      <PostContent content={post.html} />
    </article>
  );
} 