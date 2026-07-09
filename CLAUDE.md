# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

個人ブログ「waddyu log」（https://waddyu.dev/）。Next.js 14 App Router の静的サイトで、`next.config.mjs` の `output: 'export'` により `pnpm build` で `out/` に完全静的な HTML を出力します。サーバーサイド機能（API Routes、ISR 等）は使えません。

- パッケージマネージャ: pnpm
- Node.js: 22.x（package.json の engines）

## コマンド

```bash
pnpm dev          # 開発サーバ起動（http://localhost:3000）
pnpm build        # 静的エクスポート（out/ に出力）
pnpm lint         # ESLint（next lint）
pnpm lint:fix
pnpm format       # Prettier チェック（src/**/*.{ts,tsx,css}）
pnpm format:fix
```

テストフレームワークは導入されていません（ルートの `test.mjs` は posts 読み込みの検証用スクラッチスクリプト）。

## アーキテクチャ

### コンテンツ（記事）

- 記事は `posts/<年>/<slug>.md` の Markdown ファイル。ビルド時に `src/libs/posts.ts` が `posts/` を再帰的に読み込み、gray-matter で frontmatter を解析します。
- frontmatter: `title`, `published_at`（日付）, `published`（boolean）, `tags`
- `published: false` の記事は本番ビルドから除外されますが、開発サーバでは表示されます（下書きプレビューの仕組み）。
- Markdown → HTML 変換は `zenn-markdown-html`（Zenn 記法対応）。mermaid ブロックは `customEmbed` で `<div class="mermaid">` に変換し、`src/app/layout.tsx` で CDN から読み込む mermaid スクリプトがクライアント側で描画します。

### ルーティング

- `/` — 最新記事一覧（1ページ目）
- `/posts/[...slug]` — 記事詳細。slug は `posts/` からの相対パス（例: `posts/2025/cube` → `posts/2025/cube.md`）
- `/posts/p/[page]` — ページネーション（10件/ページ）。`/posts/p/1` は `/` にリダイレクト
- `/myapps` — 自作アプリ一覧（データは `src/libs/myapps.ts`）。個別アプリは `src/app/myapps/<name>/page.tsx`

すべて `generateStaticParams` による SSG です。

### パスエイリアス

tsconfig の `"@*": ["./src/*"]` により `@libs/...`、`@components/...` で import します。

### スタイル

- Tailwind CSS + `@tailwindcss/typography`（記事本文は prose クラス）
- コードハイライトは `prism-themes`（vsc-dark-plus テーマを layout.tsx で import）
- サイトの環境別 URL は `.env.development` / `.env.production` の `NEXT_PUBLIC_SITE_URL`

### DESIGN.md

ルートの `DESIGN.md` はデザイントークン仕様（カラー・タイポグラフィ等）です。**UI を書く前に必ずルートの `DESIGN.md` を読み、そこで定義されたトークンに従ってください。**
