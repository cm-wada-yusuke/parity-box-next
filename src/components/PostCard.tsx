import { PostMeta } from '@libs/types';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type Props = PostMeta & {
  href: string;
};

export function PostCard(props: Props) {
  return (
    <a
      href={`/posts/${props.slug}`}
      className={twMerge(
        'block flex-col',
        'bg-card hover:bg-hover',
        'px-4 py-10'
      )}
    >
      <div className="h-4"></div>
      <p className="text-lg font-semibold">{props.title}</p>
      <div className="h-2"> </div>
      <p className="text-sm text-muted-foreground">
        {props.publishedAt.format('YYYY-M-D')}
      </p>
    </a>
  );
}
