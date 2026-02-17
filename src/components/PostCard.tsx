import { PostMeta } from '@libs/types';
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
        'text-foreground hover:text-foreground',
        'bg-background hover:bg-hover',
        'border-l-2 border-muted hover:border-accent',
        'px-8 pt-4 pb-6',
        'transition-colors duration-150'
      )}
    >
      <div className="h-4"></div>
      <p className="text-lg font-semibold">{props.title}</p>
      <div className="h-2"> </div>
      <p className="text-sm text-accent-muted">
        {props.publishedAt.format('YYYY-M-D')}
      </p>
    </a>
  );
}
