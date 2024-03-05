import { PostMeta } from '@libs/types';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type Props = PostMeta & {
  href: string;
};

export function ArticleCard(props: Props) {
  return (
    <Link
      key={props.slug}
      href={`/posts/${props.slug}`}
      className={twMerge(
        'block flex-col',
        'mt-8 px-4 py-6',
        'border-2 rounded-sm border-card-foreground'
      )}
    >
      <p className="flex text-lg font-semibold">{props.title}</p>
      <p className="flex text-sm text-muted-foreground">
        {props.publishedAt.format('YYYY-M-D')}
      </p>
    </Link>
  );
}
