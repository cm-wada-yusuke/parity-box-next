import { MyappMeta, PostMeta } from '@libs/types';
import { twMerge } from 'tailwind-merge';

type Props = MyappMeta;

export function MyappCard(props: Props) {
  return (
    <a
      href={`/myapps/${props.appName}`}
      className={twMerge(
        'block flex-col',
        'bg-card hover:bg-hover',
        'px-4 py-10'
      )}
    >
      <div className="h-4"></div>
      <p className="text-lg font-semibold">{props.title}</p>
      <div className="h-2"> </div>
      <p className="text-sm text-muted-foreground">{props.date}</p>
    </a>
  );
}
