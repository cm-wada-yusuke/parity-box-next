---
title: "ZennスタイルのMarkdownをプレビューするVSCodeをひっそりと公開した"
published_at: "2022-10-21"
type: "tech"
excerpt: 個人利用のおすそわけです
thumbNailUrl: /images/00-thumb-nail/vscode.png
published: false
tags: ["vscode"]
---

普段、技術系の記事は Zenn で書いていて、そちらは zenn-cli のできが良く活用しています。で、このブログでも [zenn-editor](https://github.com/zenn-dev/zenn-editor) の [ご自身のサイトで使う場合](https://github.com/zenn-dev/zenn-editor#%E3%81%94%E8%87%AA%E8%BA%AB%E3%81%AEweb%E3%82%B5%E3%82%A4%E3%83%88%E3%81%A7%E4%BD%BF%E3%81%86%E5%A0%B4%E5%90%88) にしたがっていて、少しの設定でそれなりの見た目になるので重宝しています。

## 課題: 手元の編集でプレビューできない（やりにくい）

サイトに表示するときはいいのですが、課題は編集中でした。自分で導入したものだと、なかなかプレビューがしにくいのです。個人サイトだと…

- ディレクトリ構成が zenn-cli の想定と一致していない
- 本は書かない
- 画像のパスが想定と違っていたりする
- トピックやタイトル文字数のバリデーョンは必要ない

じゃあ、VS Code にデフォルトで入っているMarkdownエディタはというと、Zennの記法に対応していないものが多くて微妙なんですよね。あまりにもデプロイした時との差分が大きいというか。

## そこで: 個人で拡張機能を作ってみることに

ということで、サクッと表示しているMarkdown **だけ** をプレビューしてくれる拡張が欲しくなりました。あとできれば iPad（VS Code for Web）からも使いたい。

ZennはMarkdownを変換するロジックを公開しているので、それを使ってCloudFunctionsのNode.jsで変換してもらう用にします。

https://github.com/zenn-dev/zenn-editor/tree/canary/packages/zenn-markdown-html

変換処理そのものは Cloud Functions を使みというやや敗北感が漂う対応ではあるものの、やりたいことはできたのでしばらくこれで運用してみます。iPadでもgithub.devでこんな感じでプレビューできてます。便利。

![](/images/22/B94FE5EE-2E5C-44C1-BF53-BD24428F3E45.png)

拡張機能は公開しているので、お！と思った方は使ってみてください。

https://github.com/cm-wada-yusuke/vscode-extension-zn-style-markdown-preview

`zenn-style-markdown-preview`という拡張名で公開しています。