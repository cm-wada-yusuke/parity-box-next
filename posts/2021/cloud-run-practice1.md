---
title: "Cloud Run のプラクティス: リビジョンIDはコミットIDとビルドIDを含めるとよい"
published_at: "2022-09-12"
type: "tech"
excerpt: いくつか集まったら記事にします
published: true
tags: ["googlecloud"]
---

Cloud Run を運用していて、「これは設定しといてよかったな」や、「こうしといたほうがよかったので改善した」というポイントがありました。そのひとつ、「リビジョンIDはコミットIDとビルドIDを含めるとよい」について。

## リビジョンIDとは

まずリビジョンIDはなにかというと、デプロイのたびに付与する名前です。

![](/images/cloud-run-practice1/2022-09-12-21-43-48.png)

デプロイコマンド的には以下の部分。`--revision-suffix`です。

```sh
gcloud beta run deploy backend \
--quiet \
--platform=managed \
--project=$PROJECT_ID \
--region=$_REGION \
--image=$_ARTIFACT_REPOSITORY_IMAGE_NAME:$SHORT_SHA \
--service-account=$_SERVICE_ACCOUNT \
--add-cloudsql-instances=$_CLOUDSQL_INSTANCE_FULL_NAME \
--revision-suffix=$SHORT_SHA # コレ
```

デプロイすると、`${service-name}-${revision-suffix}`というIDになります。

```text
- Cloud Run のサービス名: backend
- revision-suffix: $SHORT_SHA

↓

backend-c17f902
```


## どのようなIDがよいか

で、このID、要件としてはデプロイあたり固有であればなんでもよいことになっています。あとからみたときに追跡できやすいものが「よい」と考え、情報を付与します。

## 前提: Cloud Build でデプロイするとよい

IDにいろいろな付加情報を入れるとして、もとになる情報が揃っていないことには成立しません。Cloud Build は開発者が意識しなくても利用できる変数があり、それらをリビジョンIDに適用できます。

https://cloud.google.com/build/docs/configuring-builds/substitute-variable-values?hl=ja

## コミットIDは含めたほうがよい

Cloud Build で利用できる変数のひとつに、Git のコミットIDがあります。お察しのとおり、トリガーがGitHubアプリトリガーの場合に利用できます（または手動で設定）。**リビジョンがどのコミットIDに対応するものかがわかる**ようになります。たとえばデプロイに失敗している、エラー率が上がっている、などのレポートが上がったとき、リビジョンIDからコミットIDがわかれば、履歴をたどって原因を特定しやすくなるでしょう。

## Cloud Build のビルドIDは含めたほうがよい

これはあとから同僚に指摘をもらってなるほどと思いました。Cloud Runのデプロイは素晴らしいですが、完璧ではありません。アプリは問題なくても、デプロイやリビジョンの作成、トラフィックの移行に失敗する場合があります。ひとつ例をあげると、デプロイしたにもかかわらずリビジョンが作成されず、ステータスが`Pending`のまま動かない、ということがありました。こうなるとこのリビジョンの復活は望めないので、新しく同じアプリをデプロイするのがよいです。このとき、コミットIDだけだと「同じリビジョンIDの場合にデプロイが失敗する」という制約にひっかかってしまいます。Cloud Build を利用しているという前提ならば、`$BUILD_ID`が利用できます。ビルドIDを含めるメリットは以下２点です。

1. ビルドごとに固有のリビジョンIDとなるようにして、問題が起きたとき、制約にひっかからず同じアプリをデプロイできる
2. あとから技術サポートへ事象を報告するときに、どのビルドで問題が発生したか特定しやすい

## cloudbuild.yml の例

ここまでを反映した Cloud Build の `cloudbuild.yml`は以下のようになります。

```yml:cloudbuild.yml
steps:
  - id: new-revision-backend
    name: gcr.io/google.com/cloudsdktool/cloud-sdk:alpine
    entrypoint: gcloud
    args:
      - run
      - deploy
      - backend
      - --quiet
      - --project=$PROJECT_ID
      - --region=${_REGION}
      - --revision-suffix=${SHORT_SHA}-${_SHORT_BUILD_ID}
timeout: 2000s
substitutions:
  _REGION: asia-northeast1
  _SHORT_BUILD_ID: ${BUILD_ID:0:8} # ビルドIDはUUIDで長いので8桁だけ切り取り
```
