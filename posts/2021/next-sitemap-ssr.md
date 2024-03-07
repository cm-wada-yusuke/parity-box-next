---
title: "next-sitemap を使って sitemap.xml をサーバーサイドレンダリングで生成する"
published_at: "2021-08-23"
excerpt: "SSRする記事はあまり見かけなかったので試しました"
published: true
tags: ["javascript"]
---

next-sitemap という便利な npm パッケージがあります。

https://github.com/iamvishnusankar/next-sitemap

このパッケージを使って動的にsitemap.xmlを作ったのでその記録を残します。[公式README](https://blog.parity-box.com/server-sitemap.xml)の手順に従えば良いのですが、ざっくり以下です。

* ビルド時に `robots.txt` が生成されるようにする（SSG, SSR共通）
* `server-sitemap.xml` をレンダリングするページをひとつ作成する

静的サイトで `sitemap.xml` を生成する例はいくつか見つかったのですが、動的に生成するサンプルが少なく感じたので記録を残します。


## ビルド時に `robots.txt` が生成されるようにする（SSG, SSR共通）

`postbuild` で生成するようです。以下の記述を加えればOKです。

```diff json:package.json
{
  "version": "0.1.0",
  "license": "UNLICENSED",
  "private": true,
  "scripts": {
    "dev": "next dev -p ${PORT:-3000}",
    "build": "next build",
+    "postbuild": "next-sitemap",
    "start": "next start -p ${PORT:-3000}"
  },
  ...
}
```

これで `next build` を実行すると自動で `/robots.txt` が生成されます。

## `pages/server-sitemap.xml/index.tsx` ファイルを作成する

`server-sitemap.xml`という名前にして大丈夫なのかな？と思いましたが `robots.txt` で明示的に指定するので問題なさそうです。

`pages/server-sitemap.xml/index.tsx`は以下のようにしました。

```tsx:pages/server-sitemap.xml/index.tsx
import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import { ISitemapField } from 'next-sitemap/dist/@types/interface';
import { getAllPostsNavCollectionUseCase } from '@app/usecases/posts/get-posts-usecase';
import { generatePublicUrl, getHome } from '@app/libs/site';

export const getServerSideProps: GetServerSideProps = async ctx => {

  // ① サイトごとの独自部分
  const allPosts = await getAllPostsNavCollectionUseCase();

  const postsFields: ISitemapField[] = allPosts.map(nav => ({
    loc: generatePublicUrl(nav.href),
    lastmod: new Date(nav.publishDate).toISOString(),
  }));

  const root: ISitemapField = {
    loc: getHome(), // Absolute url
    lastmod: new Date().toISOString(),
  };

  // ② sitemap 生成部分（パッケージ利用）
  return getServerSideSitemap(ctx, [root, ...postsFields]);
};

// Default export to prevent next.js errors
// eslint-disable-next-line
export default () => {};
```

①で、サイトのメタ情報など、必要なものを取得します。絶対URLと最終更新日時に相当するデータが取得できれば大丈夫です。このブログの場合は全記事のインデックスに相当するJSONを保存しているので、それを取得しています。`getAllPostsNavCollectionUseCase`がそれです。

②で、next-sitemap を使ってサイトマップを作成しています。必要なデータ配列だけ揃えれば、具体的なXMLの生成はやってくれるような動きですね。ありがたいです。生成されるXMLは以下のようなものになります。

```xml:/server-sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>https://blog.parity-box.com</loc><lastmod>2021-08-24T01:09:42.540Z</lastmod></url>
<url><loc>https://blog.parity-box.com/posts/articles/2021/next-sitemap-ssr</loc><lastmod>2021-08-23T00:00:00.000Z</lastmod></url>
<url><loc>https://blog.parity-box.com/posts/diary/2021/06/26</loc><lastmod>2021-06-26T00:00:00.000Z</lastmod></url>
...
</urlset>
```

## `robots.txt` を生成する

robots.txt はnext-sitemapが自動で生成してくれますが、どのような内容を出力するかについて、設定ファイルで大まかに制御できます。`next-sitemap.js`を以下のようにしました。

```js:next-sitemap.js
// next-sitemap.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_HOME,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.NEXT_PUBLIC_SITE_HOME + '/server-sitemap.xml',
    ],
  },
};

```

`robotsTxtOptions.additionalSitemaps` で動的に生成するサイトマップを指定しています。これでクロール対象に `server-siteamp.xml` で挙げたURLが含まれるようになります。この設定でビルドしてみましょう。`next build`で生成される`robots.txt`は以下のようになります。

```text:/robots.txt
## *
User-agent: *
Allow: /

## Host
Host: https://blog.parity-box.com

## Sitemaps
Sitemap: https://blog.parity-box.com/sitemap.xml
Sitemap: https://blog.parity-box.com/server-sitemap.xml
```

`next-sitemap.js`の設定が反映され、`server-sitemap.xml`が含まれていることがわかります。

## おわりに

next-sitemap で動的にサイトマップとrobots.txtを生成しました。参考になれば幸いです。