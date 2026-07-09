import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type Props = {
  total: number;
  current: number;
};

const buttonClass = twMerge(
  'px-4 py-3',
  'w-1/3',
  'font-mono text-xs uppercase tracking-widest',
  'text-body hover:text-link',
  'border border-hairline hover:border-link',
  'text-center',
  'transition-colors duration-150'
);

export function Pagination(props: Props) {
  const hasPrev = props.current > 1;
  const hasNext = props.current < props.total;
  return (
    <div className="flex justify-between">
      {hasPrev ? (
        <Link href={`/posts/p/${props.current - 1}`} className={buttonClass}>
          {'<< Prev'}
        </Link>
      ) : (
        <div></div>
      )}
      {hasNext ? (
        <Link href={`/posts/p/${props.current + 1}`} className={buttonClass}>
          {'Next >>'}
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
