# 施策管理Webアプリ

施策を一覧・詳細で管理するための Web アプリです。  
PC / スマホ / タブレットでの利用を想定したレスポンシブ UI です。

## 主な機能

- 左ペインに施策名一覧を表示（ステータス色で判別）
- 施策を選択すると詳細を表示（モバイルでは一覧を非表示）
- 新規作成フォームで全項目を登録
- 編集画面で既存施策を更新
- `updatedAt`（最終更新日）を自動更新

## 技術スタック

- Next.js (App Router / TypeScript)
- Tailwind CSS
- Prisma
- PostgreSQL（[Neon](https://neon.tech) + Vercel Marketplace 連携想定）

## 環境変数（最低限）

| 名前 | 用途 |
|------|------|
| `DATABASE_URL` | プール接続（アプリ実行時） |
| `DATABASE_URL_UNPOOLED` | 直結（`prisma migrate` 用） |

Vercel で Neon を Connect すると、上記がプロジェクトに注入されることが多いです。  
ローカルでは `.env.example` を `.env` にコピーし、Neon ダッシュボードの接続文字列を貼り付けてください。

## ローカル開発

```bash
npm install
cp .env.example .env
# .env に Neon の DATABASE_URL / DATABASE_URL_UNPOOLED を設定
npx prisma migrate deploy
npx prisma generate
npm run dev
```

## マイグレーション

初期マイグレーションは `prisma/migrations/20260508130000_init_postgres/migration.sql` です。

## Vercel デプロイ

1. リポジトリを Vercel に接続
2. Neon を Marketplace から Connect し、`DATABASE_URL` と `DATABASE_URL_UNPOOLED` を設定
3. `npm run build` 内で `prisma migrate deploy` が実行されます（初回デプロイでテーブルが作成されます）

## Git

GitHub: リポジトリに push 後、Vercel が自動ビルドします。
