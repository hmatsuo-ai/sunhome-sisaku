# 施策管理Webアプリ

施策を一覧・詳細で管理し、コメントで経緯を残せる Web アプリです。  
**仕様の全文は [docs/仕様書.md](docs/仕様書.md) にまとめています。**

## クイックスタート

```bash
npm install
cp .env.example .env
# .env に DATABASE_URL / DATABASE_URL_UNPOOLED（Neon 等）を設定
npx prisma migrate deploy
npx prisma generate
npm run dev
```

## 技術スタック

Next.js（App Router）/ TypeScript / Tailwind CSS / Prisma / PostgreSQL（Neon 想定）

## 環境変数

| 変数 | 用途 |
|------|------|
| `DATABASE_URL` | アプリ実行時（プール） |
| `DATABASE_URL_UNPOOLED` | `prisma migrate` 用（直結） |

## Vercel デプロイ

1. GitHub リポジトリを Import
2. Neon を Marketplace から Connect（上記環境変数）
3. **Framework Preset:** `Next.js`
4. デプロイ後、Production の Visit URL で確認

**404 やビルド失敗時:** [docs/仕様書.md §6.3](docs/仕様書.md) および下記トラブルシュートを参照。

### よくある問題

- Framework が `Other` / `Node.js` のまま → **`Next.js`** に変更（[`vercel.json`](vercel.json) も `nextjs`）
- プレビュー URL が古い → ダッシュボードの **最新デプロイの Visit** を使用
- `sunhome-sisaku-hmatsuo-2158s-projects.vercel.app` が 401 → Deployment Protection（要ログイン）

```bash
npx vercel login
npx vercel --prod
```

## マイグレーション

- 施策初期: `prisma/migrations/20260508130000_init_postgres/`
- コメント: `prisma/migrations/20260508140000_add_comments/`

## ライセンス

（未設定の場合はリポジトリ管理者に従う）
