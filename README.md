# 施策管理Webアプリ

施策を一覧・詳細で管理するための Web アプリです。  
PC / スマホ / タブレットでの利用を想定したレスポンシブ UI です。

## 主な機能

- 左ペインに施策名一覧を表示（ステータスを色で判別）
- 施策を選択すると詳細を表示（モバイルでは一覧を非表示）
- 新規作成フォームで全項目を登録
- 編集画面で既存施策を更新
- `updatedAt`（最終更新日）を自動更新

## 技術スタック

- Next.js (App Router / TypeScript)
- Tailwind CSS
- Prisma
- Vercel Postgres

## ローカル開発

1. 依存関係のインストール

```bash
npm install
```

2. 環境変数を設定

`.env.example` をコピーして `.env` を作成し、`DATABASE_URL` を設定します。

```bash
cp .env.example .env
```

3. Prisma Client 生成

```bash
npx prisma generate
```

4. 開発サーバ起動

```bash
npm run dev
```

## マイグレーション

初期 SQL は `prisma/migrations/0001_init/migration.sql` にあります。  
Vercel Postgres 接続後、必要に応じて以下を実行してください。

```bash
npx prisma migrate deploy
```

## Git / Vercel デプロイ

1. GitHub に push
2. Vercel でリポジトリを import
3. Vercel Project Settings > Environment Variables に `DATABASE_URL` を設定
4. デプロイ後、作成/更新/表示ができることを確認
