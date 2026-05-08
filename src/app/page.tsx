"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PolicyDetail } from "@/components/policies/PolicyDetail";
import { PolicyList } from "@/components/policies/PolicyList";
import type { Policy } from "@/components/policies/types";

export default function Home() {
  const router = useRouter();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showListOnMobile, setShowListOnMobile] = useState(true);

  useEffect(() => {
    const loadPolicies = async () => {
      const response = await fetch("/api/policies", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as Policy[];
      setPolicies(data);
      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    };

    void loadPolicies();
  }, []);

  const selected = useMemo(
    () => policies.find((policy) => policy.id === selectedId) ?? null,
    [policies, selectedId],
  );

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4">
        <h1 className="text-[1.375rem] font-semibold tracking-tight text-gray-900">
          施策管理Webアプリ
        </h1>
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
