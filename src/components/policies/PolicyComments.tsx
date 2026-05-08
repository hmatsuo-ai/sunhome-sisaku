"use client";

import { useCallback, useEffect, useState } from "react";

export type PolicyComment = {
  id: number;
  policyId: number;
  body: string;
  authorName: string | null;
  createdAt: string;
};

type PolicyCommentsProps = {
  policyId: number;
};

export function PolicyComments({ policyId }: PolicyCommentsProps) {
  const [comments, setComments] = useState<PolicyComment[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch(`/api/policies/${policyId}/comments`, {
      cache: "no-store",
    });
    if (!res.ok) return;
    const data = (await res.json()) as PolicyComment[];
    setComments(data);
  }, [policyId]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await load();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/policies/${policyId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: trimmed,
          authorName: authorName.trim() || null,
        }),
      });
      if (!res.ok) return;
      setBody("");
      await load();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 border-t border-stone-300/60 pt-6">
      <h2 className="text-sm font-semibold text-stone-800">コメント</h2>

      {loading ? (
        <p className="mt-3 text-sm text-stone-500">読み込み中…</p>
      ) : comments.length === 0 ? (
        <p className="mt-3 text-sm text-stone-600">まだコメントはありません。</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {comments.map((c) => (
            <li
              key={c.id}
              className="rounded-lg border border-stone-300/60 bg-stone-100/80 px-3 py-2.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-stone-500">
                <span className="font-medium text-stone-700">
                  {c.authorName ?? "（名前なし）"}
                </span>
                <time dateTime={c.createdAt}>
                  {new Date(c.createdAt).toLocaleString("ja-JP")}
                </time>
              </div>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-stone-800">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-stone-600">
            お名前（任意）
          </span>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full rounded-md border border-stone-300 bg-stone-50/80 px-3 py-2 text-sm text-stone-900 outline-none ring-stone-500/40 focus:ring-2"
            placeholder="例: 山田"
            maxLength={120}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-stone-600">
            コメント
          </span>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-stone-300 bg-stone-50/80 px-3 py-2 text-sm text-stone-900 outline-none ring-stone-500/40 focus:ring-2"
            placeholder="進捗・質問・メモなど"
          />
        </label>
        <button
          type="submit"
          disabled={submitting || !body.trim()}
          className="rounded-md bg-stone-700 px-3 py-1.5 text-sm font-medium text-stone-50 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {submitting ? "送信中…" : "コメントを追加"}
        </button>
      </form>
    </div>
  );
}
