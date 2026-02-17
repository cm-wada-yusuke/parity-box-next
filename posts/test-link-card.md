---
title: リンクカードUIテスト記事
published_at: 2025-01-07
published: true
---

# リンクカードUIのテスト

この記事では、実装したリンクカード機能をテストします。

## 単独のリンク

以下のリンクは自動的にカードUIに変換されます：

https://docs.anthropic.com/en/docs/claude-code/mcp

上記のように、段落内で単独で記載されたURLは自動的にカードとして表示されます。

## 複数のリンク

複数のリンクも個別にカード化されます：

https://github.com/anthropics/claude-code

https://zenn.dev/sesere/articles/4c0b55102dcc84

## インラインリンク

一方、文章中に埋め込まれた[このようなリンク](https://example.com)や、https://example.com のように文章の一部として記載されたリンクはカード化されません。

## 様々なサイトのテスト

### GitHub

https://github.com/vercel/next.js

### YouTube

https://www.youtube.com/watch?v=dQw4w9WgXcQ

### Stack Overflow

https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags

## まとめ

リンクカード機能により、外部リンクがより見やすく、情報量豊かに表示されるようになりました。