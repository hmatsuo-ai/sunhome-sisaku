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
- SQLite（ファイルベースの SQL データベース）

## ローカル開発

1. 依存関係のインストール

```bash
npm install
```

2. 環境変数を設定

`.env.example` をコピーして `.env` を作成します。

```bash
cp .env.example .env
```

`DATABASE_URL` は既定で `file:./dev.db`（`prisma` フォルダ直下に `dev.db` が作成されます）。

3. マイグレーション適用と Prisma Client 生成

```bash
npx prisma migrate deploy
npx prisma generate
```

4. 開発サーバ起動

```bash
npm run dev
```

## マイグレーション

初期マイグレーションは `prisma/migrations/20260508000000_init_sqlite/migration.sql` です。  
スキーマ変更後は `npx prisma migrate dev --name 変更内容` で新しいマイグレーションを作成してください。

## Vercel について

Vercel のサーバーレス環境では **SQLite ファイルの永続化ができない**ため、このまま本番デプロイすると DB が期待どおり動きません。  
本番でファイル SQL を使う場合は **Turso** などリモート SQLite、または **PostgreSQL** 等のマネージド DB に切り替えてください。

## Git / デプロイ（参考）

1. GitHub に push
2. ホスティング先でリポジトリを接続
3. 本番用の `DATABASE_URL` をホストの要件に合わせて設定
4. ビルド前後に `prisma migrate deploy` と `prisma generate` を実行するよう設定（プラットフォームにより異なります）
