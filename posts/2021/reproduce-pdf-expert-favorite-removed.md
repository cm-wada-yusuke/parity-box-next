---
title: "Report on the issue of disappearing PDF Expert favorites"
published_at: "2021-09-25"
excerpt: 問い合わせの詳細再現手順をブログで書くという荒技
published: true
tags: ["ipad"]
---

I've encountered an issue with PDF Export favorites disappearing on iPadOS15. Once they are gone, I don't think there is a workaround to bring them back.

I like iPadOS widget, so I use my favorites to show up in it. This has been the same since iPadOS14. I recently upgraded to iPadOS15. The home screen was reset and I placed the favorites widget again. At this point, my favorites are still there. In addition, all of my favorites are files that I synced from Google Drive.

![](/images/reproduce-pdf-expert-favorite-removed/2021-09-25-19-07-08.png)

I did a few operations. I don't remember exactly what I did during this time. I think I touched some of the following applications

- Twitter
- DAZN
- Safari Browser
- Slack

I think I also launched multiple windows of apps to try out the new features of the iPad OS. Here it is.

![](/images/reproduce-pdf-expert-favorite-removed/2021-09-25-19-20-16.png)

After that, I left for a couple of hours, I guess. I left the room. I didn't touch the iPad during this time. After that, I unlocked it and opened the home screen. Then, all my favorite widgets are empty.

This is the end of my inquiry. Here is a new event that occurred when I was trying to reproduce it.

The favorites in the widget do not match the favorites in the app. I deleted all my favorites once to reproduce it. In the app, the favorites are empty.

![](/images/reproduce-pdf-expert-favorite-removed/2021-09-25-19-20-42.png)

On the other hand, this is the widget favorites.

![](/images/reproduce-pdf-expert-favorite-removed/2021-09-25-19-08-38.png)

In the application the favorite is empty, but in the widget it is supposed to exist. I have not touched it from this state.I'm sorry to mix up the two reports, but here are the two:

1. after a certain period of time (about 2 hours), all favorites disappear in both my widget and the app.
2. even if I delete a favorite in the app, it remains in the widget

I hope this helps in some way.

---

iPadOS15にて、PDF Export のお気に入りが消滅するという事象に遭遇しました。消滅してしまった後は、復活のためのワークアラウンドが存在しないと思います。

僕は iPadOS のウィジェットがお気に入りなので、それに表示させるためにお気に入りを活用しています。これは iPadOS14 からずっと変わりません。先日、iPadOS15にアップグレードしました。ホーム画面がリセットされたので改めてお気に入りウィジェットを配置しました。この時点ではお気に入りはまだ存在したままです。なお、お気に入りのファイルは全て、Google Drive から同期したファイルです。

いくつか操作を行いました。この間の操作は正確には覚えていません。以下のようなアプリケーションを触ったと思います。

- Twitter
- DAZN
- Safari Browser
- Slack

また、iPadOSの新機能を試す目的で、アプリの複数ウィンドウ立ち上げもやったと思います。これです。

その後、2,3時間くらいでしょうか。離席しました。この間、iPadは触っていません。その後、ロックを解除してホーム画面を開きます。すると、お気に入りのウィジェットが全て空になっています。

ここまでが問い合わせの内容です。ここからは、再現を試みているときに発生した新しい事象です。

ウィジェットのお気に入りとアプリのお気に入りが一致していません。再現のために一度お気に入りを全て削除しました。アプリではお気に入りには空です。

一方、これがウィジェットのお気に入り。

アプリケーションではお気に入りが空ですが、ウィジェットでは存在することになっています。この状態から触っていません。


レポートが二つ混ざってしまいすいませんが、以下二つです。

1. 一定時間経過するとウィジェット・アプリともにお気に入りが全て消える消える
2. アプリでお気に入りを消しても、ウィジェットで残り続ける

何かの助けになれば幸いです。