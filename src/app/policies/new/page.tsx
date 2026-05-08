"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PolicyForm } from "@/components/policies/PolicyForm";
import { useEffect, useState } from "react";
import type { Client, PolicyInput } from "@/components/policies/types";

export default function NewPolicyPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      const response = await fetch("/api/clients", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as Client[];
      setClients(data);
    };
    void loadClients();
  }, []);

  async function handleSubmit(payload: PolicyInput) {
    const response = await fetch("/api/policies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("施策の保存に失敗しました。");
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[1.375rem] font-semibold text-gray-900">新規施策の作成</h1>
          <Link
            href="/"
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
          >
            一覧へ戻る
          </Link>
        </div>
        <PolicyForm onSubmit={handleSubmit} clients={clients} />
      </div>
    </main>
  );
}
