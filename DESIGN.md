---
version: alpha
name: wired-light-analysis
description: WIRED's tech-magazine broadsheet for a personal blog — paper-white density, heavy gothic (sans) display headlines, monospace kickers (dates, file paths, nav labels), and WIRED's signature ink-blue links. Zero border-radius throughout — the page reads as printed broadsheet. Code blocks stay dark (prism), a deliberate contrast against the white paper.
colors:
  paper: "#f7f7f5"
  paper-raised: "#ededea"
  ink: "#3a3a3e"
  body: "#505054"
  body-strong: "#454549"
  muted: "#8a8a87"
  muted-soft: "#a6a6a2"
  hairline: "#e2e2df"
  hairline-strong: "#c4c4c0"
  link: "#4059cf"
  link-active: "#32479f"
  on-link: "#ffffff"
  success: "#338a4e"
  warning: "#b3891a"
  error: "#c44536"

typography:
  display-xl:
    fontFamily: "Noto Sans JP, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.5px
  display-lg:
    fontFamily: "Noto Sans JP, Inter, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: -0.3px
  display-md:
    fontFamily: "Noto Sans JP, Inter, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-md:
    fontFamily: "Noto Sans JP, Inter, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, Noto Sans JP, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, Noto Sans JP, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0
  kicker:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 2px
    textTransform: uppercase
  mono-meta:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0

rounded:
  none: 0px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px

components:
  masthead:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    note: "サイトタイトルの直下に thick-thin ダブルルール（2px ink + 1px hairline）を敷く。ブロードシートのマストヘッド。見出しはゴシック太字。"
  story-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    note: "記事一覧の1行。上辺に 1px hairline ルール。キッカー（mono 日付）→ ゴシック太字見出しの順。hover で見出しが {colors.link} に変わる。"
  kicker-label:
    textColor: "{colors.muted}"
    typography: "{typography.kicker}"
    note: "日付・カテゴリ・ナビラベル。強調したいキッカー（記事パスなど）は {colors.link}。"
  article-header:
    textColor: "{colors.ink}"
    note: "mono キッカー（~/posts/….md、link色）→ display-xl 見出し（ゴシック 700） → mono 日付 → 1px hairline ルール。カードで囲まない。紙面に直接置く。"
  text-link:
    textColor: "{colors.link}"
    note: "本文リンク。hover で {colors.link-active}（濃くなる）。WIRED の署名 ink-blue。"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body}"
    typography: "{typography.kicker}"
    rounded: "{rounded.none}"
    note: "1px hairline 枠、角丸なし。hover で文字と枠が {colors.link} に変わる。ページネーション等。"
  code-block:
    backgroundColor: "prism ダークテーマの面（#1e1e1e 系）"
    typography: "{typography.code}"
    rounded: "{rounded.none}"
    note: "コードブロックはダーク面のまま。白い紙面に対する意図的なコントラスト。"
  callout:
    backgroundColor: "warning/error を paper に 10% 程度混ぜた面"
    rounded: "{rounded.none}"
    note: "記事内の注意ボックス。シンボルは {colors.warning} / {colors.error}。"
  footer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-meta}"
    note: "上辺に 1px hairline ルール。mono の小さな奥付。リンクは {colors.link}。"
---

## Overview

WIRED のテック雑誌ブロードシートをそのまま紙面白で組んだ個人ブログ向けシステム。紙面は `{colors.paper}`（#f7f7f5 — 沈めた紙白。クリーム系には寄せない）、テキストは `{colors.ink}` / `{colors.body}` のソフトなダークグレー。コントラストは意図的に控えめ（本文でおよそ 7〜8:1、WCAG AA は維持）にして、長文でも目が疲れない紙面にする。密度は罫線（hairline rule）で作る: 記事一覧は 1px ルールで区切られた行、記事ヘッダはルールで本文と仕切る。**角丸はゼロ**。影も使わない。深さは `{colors.paper-raised}` との面差と、ダークなコードブロックの対比だけで表現する。

## Key Characteristics

- **紙面白が基本線**。ダークテーマは存在しない。`{colors.paper}` が唯一の紙面。クリーム/アイボリー（Claude 系）には寄せない、ニュートラルな紙白。
- **ソフトコントラスト**: 純白 × 純黒を避け、文字はダークグレー階調。読み物のための落ち着いた紙面を優先する（AA は維持）。
- **重いゴシック見出し**: Noto Sans JP の 600/700。和文のセリフ（明朝）は採用しない。太さとトラッキングで誌面の声を作る。
- **モノスペースのキッカー**: 日付、`~/posts/….md` パス、ナビラベル、奥付を JetBrains Mono + uppercase + 2px トラッキングで組む。この「ターミナル × 雑誌」の混合がこのサイトの署名要素。
- **ink-blue リンク**: `{colors.link}`（#4059cf）。WIRED の署名インクブルー。hover は濃くなる（{colors.link-active}）。リンク以外の用途に青を使わない。
- **thick-thin ダブルルール**: マストヘッド直下の 2px + 1px の二重罫。新聞の題字まわりの意匠。
- **角丸ゼロ・影ゼロ**: ボタン、コードブロック、注意ボックス、入力欄すべて直角。
- **ダークコードブロック**: prism のダークテーマを白紙面にそのまま置く。誌面における写真面のような役割。

## Typography

| Token | 用途 |
|---|---|
| `{typography.display-xl}` | 記事詳細の見出し（Noto Sans JP 700） |
| `{typography.display-lg}` | マストヘッド（サイトタイトル） |
| `{typography.title-md}` | 記事一覧の見出し（ゴシック 600） |
| `{typography.body-md}` | 本文（Inter + Noto Sans JP、行間 1.8） |
| `{typography.kicker}` | 日付・ラベル・ナビ（mono / uppercase / 2px tracking） |
| `{typography.mono-meta}` | 記事パス・奥付（mono、大文字化しない） |
| `{typography.code}` | コードブロック |

原則: 見出しはゴシックの太字（600/700）、メタ情報はモノスペース、本文は通常ウェイトのサンズ。声の分担はウェイトとフォントの役割で作り、見出しにモノスペースを使わない。

## Do's and Don'ts

### Do
- 区切りはすべて実線の罫（`{colors.hairline}`）で。装飾的な文字の繰り返し（`─` など）は使わない。
- 日付・パス・ナビラベルは必ず mono キッカーで組む。
- リンク色 `{colors.link}` はリンクにだけ使う（キッカーの強調は例外的に可）。
- コードブロックはダーク面のまま。白紙面への対比として機能させる。

### Don't
- 角丸・ドロップシャドウを導入しない。
- 紙面色を増やさない。`{colors.paper}` と `{colors.paper-raised}` の2面だけ。
- 紙面をクリーム/アイボリーに寄せない（Claude 系の名残）。コーラル/テラコッタ系のアクセントを復活させない。
- 見出しを weight 400 にしない。和文見出しに明朝（セリフ）を使わない。
- 青を面（背景）として使わない。青は線と文字だけ。
