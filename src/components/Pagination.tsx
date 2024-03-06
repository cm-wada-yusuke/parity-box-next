import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type Props = {
  total: number;
  current: number;
};

export function Pagination(props: Props) {
  const hasPrev = props.current > 1;
  const hasNext = props.current < props.total;
  return (
    <div className="flex justify-between">
      {hasPrev ? (
        <Link
          href={`/posts/p/${props.current - 1}`}
          className={twMerge(
            'px-4 py-2',
            'w-1/3',
            'hover:bg-hover',
            'border-2 border-card-foreground',
            'rounded-sm',
            'text-center'
          )}
        >
          {'<< Prev'}
        </Link>
      ) : (
        <div></div>
      )}
      {hasNext ? (
        <Link
          href={`/posts/p/${props.current + 1}`}
          className={twMerge(
            'px-4 py-2',
            'w-1/3',
            'hover:bg-hover',
            'border-2 border-card-foreground',
            'rounded-sm',
            'text-center'
          )}
        >
          {'Next >>'}
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
