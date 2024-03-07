---
title: "Google の 'Terraform を使用するためのベスト プラクティス' を読んで改善したい部分"
published_at: "2022-07-25"
excerpt: Google のリソースを作ることが多いので、このように公式からアナウンスしてくれるのは助かる
published: true
tags: ["terraform"]
---

https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=ja

##  命名規則を採用する

ここは改善できるポイント。ベストプラクティスを尊重したい。

> 推奨:

```hcl
resource "google_compute_instance" "web_server" {
  name = "web-server"
}
```

> 非推奨:

```hcl
resource "google_compute_instance" "web-server" {
  name = "web-server"
}
```

これ、Google Cloud のリソース名がだいたいハイフン区切りなものなので、それに従ったほうがいいのかな、ということで一部を `"google_compute_instance" "web-server"` のようにしてしまっていた。アンダースコアでいいのね。物理名としてのリソースはハイフンがよさげだけど、Terraformの変数的にはアンダースコアで統一したほうがよさそうだ。

## [すべてのリソースの出力を公開する](https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=ja#expose-outputs)

これは疑問、そうなのか。でも、`output`がないと、モジュールをどういう順番で組み立てればいいかわからないってことかな…？

## [環境ディレクトリに分割する](https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=ja#subdirectories)

これ、できてる！すげえ！同僚に感謝！


ほかはざっくりできてそう、また見ていく。