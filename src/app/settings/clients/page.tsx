"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Client } from "@/components/policies/types";

export default function ClientSettingsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const response = await fetch("/api/clients", { cache: "no-store" });
      if (!response.ok || cancelled) return;
      const data = (await response.json()) as Client[];
      if (!cancelled) setClients(data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!response.ok) {
        return;
      }
      setName("");
      const reload = await fetch("/api/clients", { cache: "no-store" });
      if (reload.ok) {
        const data = (await reload.json()) as Client[];
        setClients(data);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[1.375rem] font-semibold text-gray-900">
            クライアント設定
          </h1>
          <Link
            href="/"
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
          >
            一覧へ戻る
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="クライアント名を入力"
            className="flex-1 rounded-lg border border-gray-200 bg-[var(--surface)] px-3 py-2.5 text-gray-900 outline-none transition-shadow focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            {submitting ? "追加中..." : "追加"}
          </button>
        </form>

        <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <span className="font-medium text-gray-900">{client.name}</span>
              <span className="text-xs text-gray-500">
                {new Date(client.createdAt).toLocaleDateString("ja-JP")}
              </span>
            </li>
          ))}
          {clients.length === 0 && (
            <li className="px-4 py-8 text-sm text-gray-500">
              クライアントが未登録です。
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
