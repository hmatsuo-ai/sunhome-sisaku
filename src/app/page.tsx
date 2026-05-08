"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PolicyDetail } from "@/components/policies/PolicyDetail";
import { PolicyList } from "@/components/policies/PolicyList";
import type { Client, Policy } from "@/components/policies/types";

export default function Home() {
  const router = useRouter();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showListOnMobile, setShowListOnMobile] = useState(true);

  useEffect(() => {
    const loadPolicies = async () => {
      const query =
        selectedClientId === null ? "" : `?clientId=${selectedClientId}`;
      const response = await fetch(`/api/policies${query}`, { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as Policy[];
      setPolicies(data);
      if (data.length > 0) {
        setSelectedId(data[0].id);
      } else {
        setSelectedId(null);
      }
    };

    void loadPolicies();
  }, [selectedClientId]);

  useEffect(() => {
    const loadClients = async () => {
      const response = await fetch("/api/clients", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as Client[];
      setClients(data);
    };
    void loadClients();
  }, []);

  const selected = useMemo(
    () => policies.find((policy) => policy.id === selectedId) ?? null,
    [policies, selectedId],
  );

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <h1 className="text-[1.375rem] font-semibold tracking-tight text-gray-900">
            施策管理Webアプリ
          </h1>
          <div className="flex items-center gap-2">
            <select
              value={selectedClientId === null ? "" : String(selectedClientId)}
              onChange={(e) =>
                setSelectedClientId(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              className="rounded-lg border border-gray-200 bg-[var(--surface)] px-3 py-2 text-sm text-gray-900 outline-none transition-shadow focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            >
              <option value="">すべてのクライアント</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <Link
              href="/settings/clients"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
            >
              設定
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col md:h-[calc(100vh-73px)] md:flex-row">
        <div className={`${showListOnMobile ? "block" : "hidden"} md:block`}>
          <PolicyList
            policies={policies}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setShowListOnMobile(false);
            }}
            onCreate={() => {
              router.push("/policies/new");
            }}
          />
        </div>

        <div className={`${showListOnMobile ? "hidden" : "block"} flex-1 md:block`}>
          <PolicyDetail policy={selected} onBackToList={() => setShowListOnMobile(true)} />
          {!selected && (
            <div className="px-8 py-4">
              <Link
                href="/policies/new"
                className="inline-flex rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--accent-hover)] active:opacity-90"
              >
                新規施策を作成
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
