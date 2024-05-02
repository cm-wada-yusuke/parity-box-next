---
title: "iOS Safari で勝手にフォントサイズが大きくレンダリングされてしまうことがある問題の対応"
published_at: "2021-07-19"
published: true
tags: ["css"]
---

このブログを構築しているときに遭遇した。iOS（iPhone）でレンダリングしているときだけ一部の文字サイズが大きくなる（CSSで指定しているにもかかわらず）。具体的には図のような感じ。

![](https://storage.googleapis.com/zenn-user-upload/b35621620ef72e89cd778480.png)


で、調べてみると同じような問題のStackOverflowが。

https://stackoverflow.com/questions/3226001/some-font-sizes-rendered-larger-on-safari-iphone

> Safari automatically scales text if it thinks the text will render too small. You can get around this with the CSS property -webkit-text-size-adjust.

勝手に判断してでかくレンダリングすることがあると！！困ります！！

## 対処


グローバルCSSで `html` に `-webkit-text-size-adjust: 100%;` を指定すればOK！

```css:packages/front-next/styles/global.css(Next.js)
html{
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
```

![](https://storage.googleapis.com/zenn-user-upload/c44e96e0ddac76fd0d6d53a4.png)

これで同じサイズになった。