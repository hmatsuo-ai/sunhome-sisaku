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

1. [Vercel Dashboard](https://vercel.com/dashboard) で GitHub リポジトリ（例: `hmatsuo-ai/sunhome-sisaku`）を Import
2. **Root Directory** はリポジトリ直下（この Next アプリがルートの場合はそのまま）
3. [Neon](https://vercel.com/marketplace/neon) を Marketplace から **Connect** し、プロジェクトに紐づける  
   - 連携後、**`DATABASE_URL`**（プール）と **`DATABASE_URL_UNPOOLED`**（直結）が環境変数に入ることが多いです  
   - **Production** と **Preview** の両方に同じキーが付いているか確認してください（プレビューだけ欠けると PR デプロイで DB エラーになります）
4. デプロイの **Build Command** は既定の `npm run build` のままで構いません（中で `prisma migrate deploy` → `prisma generate` → `next build` が実行されます）
5. 初回デプロイ後、**Deployments** で最新が **Ready** であることを確認し、**Production の「Visit」** から開いてください

### 404（NOT_FOUND）になるとき

- **Project Settings → Build and Deployment の Framework Preset が `Other` のまま**だと、Next.js として正しく配信されず 404 になることがあります。**`Next.js`** にするか、リポジトリ直下の [`vercel.json`](vercel.json) の `"framework": "nextjs"` がデプロイに反映されているか確認してください。
- **`sunhome-sisaku-xxxx.vercel.app` のようなプレビュー専用 URL**は、古いデプロイが削除されると無効になることがあります。**ダッシュボードの Production の Visit URL** を使い直してください。
- まだ **Successful なデプロイが一度もない**場合も 404 になります。ビルドログでエラー（環境変数不足、`migrate deploy` 失敗など）を解消してください。

### CLI からデプロイする場合

```bash
npx vercel login
npx vercel --prod
```

## Git

GitHub に push すると、Vercel が連携済みなら自動でビルド・デプロイされます。
