import { MyappMeta } from '@libs/types';
import { twMerge } from 'tailwind-merge';

type Props = MyappMeta;

export function MyappCard(props: Props) {
  return (
    <a
      href={`/myapps/${props.appName}`}
      className={twMerge('group block flex-col', 'px-2 py-6')}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {props.date}
      </p>
      <div className="h-2"> </div>
      <p
        className={twMerge(
          'font-display text-xl font-semibold text-ink',
          'transition-colors duration-150 group-hover:text-link'
        )}
      >
        {props.title}
      </p>
    </a>
  );
}
