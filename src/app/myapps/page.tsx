import { MyappCard } from '@components/MyappCard';
import { getMyappsMeta } from '@libs/myapps';

export default async function MyappsPage() {
  const myapps = getMyappsMeta();
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <ul>
        {myapps.map((myapp) => (
          <li
            key={myapp.appName}
            className="border-t border-muted first:border-0"
          >
            <MyappCard {...myapp} />
          </li>
        ))}
        <div className="h-12" />
      </ul>
    </section>
  );
}
