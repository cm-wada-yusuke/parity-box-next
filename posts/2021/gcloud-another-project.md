---
title: "gcloudコマンドで別のプロジェクトも操作できるようにする。"
emoji: "🌤"
published_at: "2021-06-26"
published: true
tag: ["googlecloud"]
---

AWS だと息を吐くようにできるのに…少しずつ調べながらやるしかないですね。

https://qiita.com/sonots/items/906798c408132e26b41c

これを参考にさせていただく。

```sh
gcloud auth activate-service-account --key-file $GOOGLE_CLOUD_KEYFILE_JSON
```

その後

```sh
gcloud auth list
```

で追加したものが表示されればOK。


## configurations で切り替えるのがよさそう

いろいろ調べた結果。まず前提として、以下のような対応関係になっているはず。

* Google Cloud コマンドラインインターフェースを呼び出すときに使われるIAM：ユーザーアカウントもサービスアカウントも設定次第で利用可能
* Google Cloud SDK を呼び出すときに使われるIAM：サービスアカウント

ということでユーザーは次のように切り替えるのが無難そう。

```bash
## ユーザーアカウントを切り替える
gcloud config configurations activate parity-box
gcloud config configurations list

NAME                  IS_ACTIVE  ACCOUNT              PROJECT               COMPUTE_DEFAULT_ZONE  COMPUTE_DEFAULT_REGION
parity-box            True      waddy@xxx.com         parity-box            asia-northeast1-a     asia-northeast1

## 初めて利用する場合は以下のようにしてログインする
gcloud auth login

## 意図したプロジェクト名が取得できればOK
gcloud config get-value project
```

サービスアカウントは、ユーザーにログインした状態で以下のようにする。

```bash
gcloud auth application-default login
```

これでデフォルトで利用するサービスアカウントがローカルにセットアップされた。SDKを利用したプログラムが利用できるはず。
